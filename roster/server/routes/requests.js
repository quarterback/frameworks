import { Router } from 'express';
import db from '../db.js';
import { authenticate } from '../middleware/auth.js';
import { useCredits, reportInteraction, getReputation } from '../services/brokerage.js';

const router = Router();

// Helper to get profile
function getProfile(userId) {
  const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(userId);
  if (!profile) return null;

  const expertise = db.prepare('SELECT skill FROM expertise WHERE profile_id = ?').all(profile.id);

  return {
    id: profile.id,
    userId: profile.user_id,
    name: profile.name,
    title: profile.title,
    organization: profile.organization,
    location: profile.location,
    bio: profile.bio,
    photoUrl: profile.photo_url,
    availability: profile.availability,
    expertise: expertise.map((e) => e.skill),
  };
}

// Send introduction request
router.post('/send', authenticate, async (req, res) => {
  const { toUserId, credits, message } = req.body;
  const fromUserId = req.user.id;

  if (!toUserId || !credits || credits < 1 || credits > 5) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    // Check if request already exists
    const existingRequest = db
      .prepare('SELECT * FROM requests WHERE from_user_id = ? AND to_user_id = ? AND status = ?')
      .get(fromUserId, toUserId, 'pending');

    if (existingRequest) {
      return res.status(400).json({ error: 'Request already sent' });
    }

    // Check if already connected
    const existingConnection = db
      .prepare('SELECT * FROM connections WHERE (user_a_id = ? AND user_b_id = ?) OR (user_a_id = ? AND user_b_id = ?)')
      .get(fromUserId, toUserId, toUserId, fromUserId);

    if (existingConnection) {
      return res.status(400).json({ error: 'Already connected' });
    }

    // Use credits
    const creditResult = await useCredits(fromUserId, toUserId, credits);
    if (!creditResult.success) {
      return res.status(400).json({ error: creditResult.error || 'Not enough credits' });
    }

    // Create request
    db.prepare(`
      INSERT INTO requests (from_user_id, to_user_id, credits_sent, message, status)
      VALUES (?, ?, ?, ?, 'pending')
    `).run(fromUserId, toUserId, credits, message || null);

    // Check if the other person also sent a request (bilateral exchange)
    const reverseRequest = db
      .prepare('SELECT * FROM requests WHERE from_user_id = ? AND to_user_id = ? AND status = ?')
      .get(toUserId, fromUserId, 'pending');

    let isConnected = false;
    let connectionId = null;

    if (reverseRequest) {
      // Create connection
      const connectionResult = db.prepare(`
        INSERT INTO connections (user_a_id, user_b_id, user_a_credits, user_b_credits)
        VALUES (?, ?, ?, ?)
      `).run(fromUserId, toUserId, credits, reverseRequest.credits_sent);

      connectionId = connectionResult.lastInsertRowid;
      isConnected = true;

      // Update both requests to accepted
      db.prepare("UPDATE requests SET status = 'accepted' WHERE id = ?").run(reverseRequest.id);
      db.prepare("UPDATE requests SET status = 'accepted' WHERE from_user_id = ? AND to_user_id = ?").run(fromUserId, toUserId);

      // Report positive interaction
      await reportInteraction(fromUserId, toUserId, 'Bilateral introduction exchange');
      await reportInteraction(toUserId, fromUserId, 'Bilateral introduction exchange');
    }

    res.json({
      success: true,
      creditsRemaining: creditResult.creditsRemaining,
      isConnected,
      connectionId,
    });
  } catch (error) {
    console.error('Send request error:', error);
    res.status(500).json({ error: 'Failed to send request' });
  }
});

// Accept request
router.post('/accept', authenticate, async (req, res) => {
  const { requestId, credits } = req.body;
  const userId = req.user.id;

  if (!requestId || !credits || credits < 1 || credits > 5) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    const request = db.prepare('SELECT * FROM requests WHERE id = ? AND to_user_id = ? AND status = ?').get(requestId, userId, 'pending');

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    // Use credits
    const creditResult = await useCredits(userId, request.from_user_id, credits);
    if (!creditResult.success) {
      return res.status(400).json({ error: creditResult.error || 'Not enough credits' });
    }

    // Create connection
    const connectionResult = db.prepare(`
      INSERT INTO connections (user_a_id, user_b_id, user_a_credits, user_b_credits)
      VALUES (?, ?, ?, ?)
    `).run(request.from_user_id, userId, request.credits_sent, credits);

    // Update request status
    db.prepare("UPDATE requests SET status = 'accepted' WHERE id = ?").run(requestId);

    // Report positive interaction
    await reportInteraction(userId, request.from_user_id, 'Introduction accepted');
    await reportInteraction(request.from_user_id, userId, 'Introduction accepted');

    res.json({
      success: true,
      connectionId: connectionResult.lastInsertRowid,
    });
  } catch (error) {
    console.error('Accept request error:', error);
    res.status(500).json({ error: 'Failed to accept request' });
  }
});

// Decline request
router.post('/decline', authenticate, (req, res) => {
  const { requestId } = req.body;
  const userId = req.user.id;

  try {
    const request = db.prepare('SELECT * FROM requests WHERE id = ? AND to_user_id = ? AND status = ?').get(requestId, userId, 'pending');

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    db.prepare("UPDATE requests SET status = 'declined' WHERE id = ?").run(requestId);

    res.json({ success: true });
  } catch (error) {
    console.error('Decline request error:', error);
    res.status(500).json({ error: 'Failed to decline request' });
  }
});

// Get sent requests
router.get('/sent', authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const requests = db.prepare(`
      SELECT r.*,
        (SELECT credits_sent FROM requests WHERE from_user_id = r.to_user_id AND to_user_id = r.from_user_id AND status != 'declined') as their_credits
      FROM requests r
      WHERE r.from_user_id = ?
      ORDER BY r.created_at DESC
    `).all(userId);

    const requestsWithProfiles = await Promise.all(
      requests.map(async (r) => {
        const toProfile = getProfile(r.to_user_id);
        if (toProfile) {
          toProfile.reputation = await getReputation(r.to_user_id);
        }

        return {
          id: r.id,
          fromUserId: r.from_user_id,
          toUserId: r.to_user_id,
          creditsSent: r.credits_sent,
          message: r.message,
          status: r.status,
          createdAt: r.created_at,
          toProfile,
          theirCredits: r.their_credits,
        };
      })
    );

    res.json({ requests: requestsWithProfiles });
  } catch (error) {
    console.error('Get sent requests error:', error);
    res.status(500).json({ error: 'Failed to get requests' });
  }
});

// Get received requests
router.get('/received', authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const requests = db.prepare(`
      SELECT * FROM requests
      WHERE to_user_id = ?
      ORDER BY created_at DESC
    `).all(userId);

    const requestsWithProfiles = await Promise.all(
      requests.map(async (r) => {
        const fromProfile = getProfile(r.from_user_id);
        if (fromProfile) {
          fromProfile.reputation = await getReputation(r.from_user_id);
        }

        return {
          id: r.id,
          fromUserId: r.from_user_id,
          toUserId: r.to_user_id,
          creditsSent: r.credits_sent,
          message: r.message,
          status: r.status,
          createdAt: r.created_at,
          fromProfile,
        };
      })
    );

    res.json({ requests: requestsWithProfiles });
  } catch (error) {
    console.error('Get received requests error:', error);
    res.status(500).json({ error: 'Failed to get requests' });
  }
});

export default router;
