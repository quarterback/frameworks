import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'roster.db'));

export function initDatabase() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Profiles table
  db.exec(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      organization TEXT NOT NULL,
      location TEXT NOT NULL,
      bio TEXT NOT NULL,
      photo_url TEXT,
      availability TEXT DEFAULT 'mentorship',
      website TEXT,
      github TEXT,
      linkedin TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // Expertise table
  db.exec(`
    CREATE TABLE IF NOT EXISTS expertise (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      profile_id INTEGER NOT NULL,
      skill TEXT NOT NULL,
      FOREIGN KEY (profile_id) REFERENCES profiles(id)
    )
  `);

  // Introduction Requests table
  db.exec(`
    CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      from_user_id INTEGER NOT NULL,
      to_user_id INTEGER NOT NULL,
      credits_sent INTEGER NOT NULL,
      message TEXT,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (from_user_id) REFERENCES users(id),
      FOREIGN KEY (to_user_id) REFERENCES users(id)
    )
  `);

  // Connections table
  db.exec(`
    CREATE TABLE IF NOT EXISTS connections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_a_id INTEGER NOT NULL,
      user_b_id INTEGER NOT NULL,
      user_a_credits INTEGER NOT NULL,
      user_b_credits INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_a_id) REFERENCES users(id),
      FOREIGN KEY (user_b_id) REFERENCES users(id)
    )
  `);

  // Messages table
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      connection_id INTEGER NOT NULL,
      sender_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (connection_id) REFERENCES connections(id),
      FOREIGN KEY (sender_id) REFERENCES users(id)
    )
  `);

  // Credits tracking table (local fallback)
  db.exec(`
    CREATE TABLE IF NOT EXISTS credits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      credits_remaining INTEGER DEFAULT 10,
      credits_total INTEGER DEFAULT 10,
      refresh_date TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  console.log('Database initialized');
}

export default db;
