import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { getSpaState } from '../services/brokerage.js';

const router = Router();

// Get credits status
router.get('/status', authenticate, async (req, res) => {
  try {
    const state = await getSpaState(req.user.id);
    res.json(state);
  } catch (error) {
    console.error('Get credits error:', error);
    res.status(500).json({ error: 'Failed to get credits status' });
  }
});

export default router;
