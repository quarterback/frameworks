import { Router } from 'express';
import db from '../db.js';
import { authenticate } from '../middleware/auth.js';
import { getReputation } from '../services/brokerage.js';

const router = Router();

// Get all professionals
router.get('/', authenticate, async (req, res) => {
  const { expertise, availability } = req.query;
  const currentUserId = req.user.id;

  try {
    let query = `
      SELECT p.*, u.email
      FROM profiles p
      JOIN users u ON p.user_id = u.id
      WHERE p.user_id != ?
    `;
    const params = [currentUserId];

    if (availability) {
      query += ' AND p.availability = ?';
      params.push(availability);
    }

    let profiles = db.prepare(query).all(...params);

    // Filter by expertise if provided
    if (expertise) {
      const profileIds = profiles.map((p) => p.id);
      if (profileIds.length > 0) {
        const expertiseProfiles = db
          .prepare(`SELECT DISTINCT profile_id FROM expertise WHERE profile_id IN (${profileIds.map(() => '?').join(',')}) AND skill = ?`)
          .all(...profileIds, expertise);

        const matchingIds = new Set(expertiseProfiles.map((e) => e.profile_id));
        profiles = profiles.filter((p) => matchingIds.has(p.id));
      }
    }

    // Get expertise and reputation for each profile
    const professionals = await Promise.all(
      profiles.map(async (profile) => {
        const expertise = db.prepare('SELECT skill FROM expertise WHERE profile_id = ?').all(profile.id);
        const reputation = await getReputation(profile.user_id);

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
          reputation,
        };
      })
    );

    res.json({ professionals });
  } catch (error) {
    console.error('Get professionals error:', error);
    res.status(500).json({ error: 'Failed to get professionals' });
  }
});

export default router;
