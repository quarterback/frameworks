import { Router } from 'express';
import db from '../db.js';
import { authenticate } from '../middleware/auth.js';
import { registerIdentity, getReputation } from '../services/brokerage.js';

const router = Router();

// Get profile helper
function getProfileWithExpertise(profile) {
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
    website: profile.website,
    github: profile.github,
    linkedin: profile.linkedin,
    expertise: expertise.map((e) => e.skill),
    createdAt: profile.created_at,
  };
}

// Create profile
router.post('/create', authenticate, async (req, res) => {
  const { name, title, organization, location, bio, photoUrl, availability, website, github, linkedin, expertise } = req.body;
  const userId = req.user.id;

  if (!name || !title || !organization || !location || !bio || !expertise || expertise.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if profile already exists
    const existing = db.prepare('SELECT id FROM profiles WHERE user_id = ?').get(userId);
    if (existing) {
      return res.status(400).json({ error: 'Profile already exists' });
    }

    // Create profile
    const result = db.prepare(`
      INSERT INTO profiles (user_id, name, title, organization, location, bio, photo_url, availability, website, github, linkedin)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(userId, name, title, organization, location, bio, photoUrl || null, availability || 'mentorship', website || null, github || null, linkedin || null);

    const profileId = result.lastInsertRowid;

    // Insert expertise
    const insertExpertise = db.prepare('INSERT INTO expertise (profile_id, skill) VALUES (?, ?)');
    for (const skill of expertise) {
      insertExpertise.run(profileId, skill);
    }

    // Update user name
    db.prepare('UPDATE users SET name = ? WHERE id = ?').run(name, userId);

    // Register with brokerage
    await registerIdentity(userId, req.user.email);

    const profile = db.prepare('SELECT * FROM profiles WHERE id = ?').get(profileId);
    res.json({ profile: getProfileWithExpertise(profile) });
  } catch (error) {
    console.error('Create profile error:', error);
    res.status(500).json({ error: 'Failed to create profile' });
  }
});

// Update profile
router.put('/update', authenticate, async (req, res) => {
  const { name, title, organization, location, bio, photoUrl, availability, website, github, linkedin, expertise } = req.body;
  const userId = req.user.id;

  try {
    const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(userId);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Update profile
    db.prepare(`
      UPDATE profiles
      SET name = ?, title = ?, organization = ?, location = ?, bio = ?, photo_url = ?, availability = ?, website = ?, github = ?, linkedin = ?
      WHERE user_id = ?
    `).run(
      name || profile.name,
      title || profile.title,
      organization || profile.organization,
      location || profile.location,
      bio || profile.bio,
      photoUrl !== undefined ? photoUrl : profile.photo_url,
      availability || profile.availability,
      website !== undefined ? website : profile.website,
      github !== undefined ? github : profile.github,
      linkedin !== undefined ? linkedin : profile.linkedin,
      userId
    );

    // Update expertise if provided
    if (expertise && expertise.length > 0) {
      db.prepare('DELETE FROM expertise WHERE profile_id = ?').run(profile.id);
      const insertExpertise = db.prepare('INSERT INTO expertise (profile_id, skill) VALUES (?, ?)');
      for (const skill of expertise) {
        insertExpertise.run(profile.id, skill);
      }
    }

    // Update user name
    if (name) {
      db.prepare('UPDATE users SET name = ? WHERE id = ?').run(name, userId);
    }

    const updatedProfile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(userId);
    res.json({ profile: getProfileWithExpertise(updatedProfile) });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get own profile
router.get('/me', authenticate, async (req, res) => {
  try {
    const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(req.user.id);

    if (!profile) {
      return res.json({ profile: null });
    }

    const profileData = getProfileWithExpertise(profile);
    profileData.reputation = await getReputation(req.user.id);

    res.json({ profile: profileData });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Get profile by user ID
router.get('/:userId', authenticate, async (req, res) => {
  try {
    const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(req.params.userId);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const profileData = getProfileWithExpertise(profile);
    profileData.reputation = await getReputation(req.params.userId);

    res.json({ profile: profileData });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

export default router;
