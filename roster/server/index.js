import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

import { initDatabase } from './db.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import professionalRoutes from './routes/professionals.js';
import creditsRoutes from './routes/credits.js';
import requestRoutes from './routes/requests.js';
import connectionRoutes from './routes/connections.js';
import messageRoutes from './routes/messages.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initDatabase();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/credits', creditsRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/messages', messageRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../client/dist/index.html'));
  });
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
