import db from '../db.js';

// Simple token-based auth (for demo purposes)
// In production, use JWT with proper signing

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Token format: base64(userId:email)
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [userId, email] = decoded.split(':');

    const user = db.prepare('SELECT id, email, name FROM users WHERE id = ? AND email = ?').get(userId, email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
