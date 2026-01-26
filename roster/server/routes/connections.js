import { Router } from 'express';
import db from '../db.js';
import { authenticate } from '../middleware/auth.js';
import { useCredits, getReputation } from '../services/brokerage.js';

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

// Get all connections
router.get('/', authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const connections = db.prepare(`
      SELECT * FROM connections
      WHERE user_a_id = ? OR user_b_id = ?
      ORDER BY created_at DESC
    `).all(userId, userId);

    const connectionsWithDetails = await Promise.all(
      connections.map(async (c) => {
        const otherUserId = c.user_a_id === userId ? c.user_b_id : c.user_a_id;
        const otherProfile = getProfile(otherUserId);
        if (otherProfile) {
          otherProfile.reputation = await getReputation(otherUserId);
        }

        const lastMessage = db
          .prepare('SELECT * FROM messages WHERE connection_id = ? ORDER BY created_at DESC LIMIT 1')
          .get(c.id);

        const myCredits = c.user_a_id === userId ? c.user_a_credits : c.user_b_credits;
        const theirCredits = c.user_a_id === userId ? c.user_b_credits : c.user_a_credits;

        return {
          id: c.id,
          userAId: c.user_a_id,
          userBId: c.user_b_id,
          userACredits: c.user_a_credits,
          userBCredits: c.user_b_credits,
          createdAt: c.created_at,
          otherProfile,
          lastMessage: lastMessage
            ? {
                id: lastMessage.id,
                connectionId: lastMessage.connection_id,
                senderId: lastMessage.sender_id,
                content: lastMessage.content,
                createdAt: lastMessage.created_at,
              }
            : null,
          myCredits,
          theirCredits,
        };
      })
    );

    res.json({ connections: connectionsWithDetails });
  } catch (error) {
    console.error('Get connections error:', error);
    res.status(500).json({ error: 'Failed to get connections' });
  }
});

// Get single connection with messages
router.get('/:connectionId', authenticate, async (req, res) => {
  const userId = req.user.id;
  const { connectionId } = req.params;

  try {
    const connection = db
      .prepare('SELECT * FROM connections WHERE id = ? AND (user_a_id = ? OR user_b_id = ?)')
      .get(connectionId, userId, userId);

    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }

    const otherUserId = connection.user_a_id === userId ? connection.user_b_id : connection.user_a_id;
    const otherProfile = getProfile(otherUserId);
    if (otherProfile) {
      otherProfile.reputation = await getReputation(otherUserId);
    }

    const messages = db
      .prepare('SELECT * FROM messages WHERE connection_id = ? ORDER BY created_at ASC')
      .all(connectionId);

    const myCredits = connection.user_a_id === userId ? connection.user_a_credits : connection.user_b_credits;
    const theirCredits = connection.user_a_id === userId ? connection.user_b_credits : connection.user_a_credits;

    res.json({
      connection: {
        id: connection.id,
        userAId: connection.user_a_id,
        userBId: connection.user_b_id,
        userACredits: connection.user_a_credits,
        userBCredits: connection.user_b_credits,
        createdAt: connection.created_at,
        otherProfile,
        myCredits,
        theirCredits,
      },
      messages: messages.map((m) => ({
        id: m.id,
        connectionId: m.connection_id,
        senderId: m.sender_id,
        content: m.content,
        createdAt: m.created_at,
      })),
    });
  } catch (error) {
    console.error('Get connection error:', error);
    res.status(500).json({ error: 'Failed to get connection' });
  }
});

// Add more credits to connection
router.post('/add-credits', authenticate, async (req, res) => {
  const { connectionId, credits } = req.body;
  const userId = req.user.id;

  if (!connectionId || !credits || credits < 1 || credits > 5) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    const connection = db
      .prepare('SELECT * FROM connections WHERE id = ? AND (user_a_id = ? OR user_b_id = ?)')
      .get(connectionId, userId, userId);

    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }

    const otherUserId = connection.user_a_id === userId ? connection.user_b_id : connection.user_a_id;

    // Use credits
    const creditResult = await useCredits(userId, otherUserId, credits);
    if (!creditResult.success) {
      return res.status(400).json({ error: creditResult.error || 'Not enough credits' });
    }

    // Update connection credits
    if (connection.user_a_id === userId) {
      db.prepare('UPDATE connections SET user_a_credits = user_a_credits + ? WHERE id = ?').run(credits, connectionId);
    } else {
      db.prepare('UPDATE connections SET user_b_credits = user_b_credits + ? WHERE id = ?').run(credits, connectionId);
    }

    res.json({
      success: true,
      creditsRemaining: creditResult.creditsRemaining,
    });
  } catch (error) {
    console.error('Add credits error:', error);
    res.status(500).json({ error: 'Failed to add credits' });
  }
});

export default router;
