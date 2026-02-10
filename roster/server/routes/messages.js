import { Router } from 'express';
import db from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Send message
router.post('/send', authenticate, (req, res) => {
  const { connectionId, content } = req.body;
  const userId = req.user.id;

  if (!connectionId || !content || !content.trim()) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    // Verify user is part of connection
    const connection = db
      .prepare('SELECT * FROM connections WHERE id = ? AND (user_a_id = ? OR user_b_id = ?)')
      .get(connectionId, userId, userId);

    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }

    // Create message
    const result = db.prepare(`
      INSERT INTO messages (connection_id, sender_id, content)
      VALUES (?, ?, ?)
    `).run(connectionId, userId, content.trim());

    const message = db.prepare('SELECT * FROM messages WHERE id = ?').get(result.lastInsertRowid);

    res.json({
      message: {
        id: message.id,
        connectionId: message.connection_id,
        senderId: message.sender_id,
        content: message.content,
        createdAt: message.created_at,
      },
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;
