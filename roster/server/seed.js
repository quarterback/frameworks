import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'roster.db'));

// Initialize tables
function initTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

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

  db.exec(`
    CREATE TABLE IF NOT EXISTS expertise (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      profile_id INTEGER NOT NULL,
      skill TEXT NOT NULL,
      FOREIGN KEY (profile_id) REFERENCES profiles(id)
    )
  `);

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
}

// Mock professionals data
const mockProfessionals = [
  {
    email: 'sarah@example.com',
    name: 'Sarah Chen',
    title: 'Design Director',
    organization: 'Stripe',
    location: 'San Francisco, CA',
    bio: 'Building payment infrastructure for the internet. 10+ years in product design, passionate about systems thinking and mentorship. I love helping designers transition into leadership roles.',
    expertise: ['Service Design', 'Design Systems', 'Fintech'],
    availability: 'mentorship',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  },
  {
    email: 'alex@example.com',
    name: 'Alex Kumar',
    title: 'Staff Engineer',
    organization: 'GitHub',
    location: 'Remote',
    bio: 'Open source infrastructure and developer tools. Love working on distributed systems and helping engineers level up. Contributing to OSS for 8+ years.',
    expertise: ['Engineering', 'DevOps', 'Backend'],
    availability: 'collaboration',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    email: 'jordan@example.com',
    name: 'Jordan Taylor',
    title: 'Design Lead',
    organization: '18F',
    location: 'Washington, DC',
    bio: 'Civic tech and service design. Making government services work for everyone. Passionate about accessibility and inclusive design practices.',
    expertise: ['Civic Tech', 'Service Design', 'Accessibility'],
    availability: 'mentorship',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
  {
    email: 'morgan@example.com',
    name: 'Morgan Smith',
    title: 'Senior Product Manager',
    organization: 'Figma',
    location: 'New York, NY',
    bio: 'Product strategy for creative tools. Previously at Adobe and IDEO. I help PMs develop customer empathy and build products people love.',
    expertise: ['Product Management', 'Strategy', 'Research'],
    availability: 'office-hours',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
  {
    email: 'taylor@example.com',
    name: 'Taylor Nguyen',
    title: 'Principal Researcher',
    organization: 'Microsoft Research',
    location: 'Seattle, WA',
    bio: 'Human-computer interaction researcher focused on AI and accessibility. Published 30+ papers on inclusive technology design.',
    expertise: ['Research', 'Accessibility', 'Machine Learning'],
    availability: 'collaboration',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
  },
  {
    email: 'casey@example.com',
    name: 'Casey Rodriguez',
    title: 'Head of Data Science',
    organization: 'Spotify',
    location: 'Stockholm, Sweden',
    bio: 'Leading personalization and recommendations. 12 years in ML/AI, passionate about ethical AI and building diverse teams.',
    expertise: ['Data Science', 'Machine Learning', 'Strategy'],
    availability: 'mentorship',
    photoUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400',
  },
  {
    email: 'jamie@example.com',
    name: 'Jamie Park',
    title: 'VP of Engineering',
    organization: 'Notion',
    location: 'San Francisco, CA',
    bio: 'Scaling engineering teams and building collaborative tools. Former startup founder, now focused on mentoring engineering leaders.',
    expertise: ['Engineering', 'Strategy', 'Operations'],
    availability: 'mentorship',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
  },
  {
    email: 'riley@example.com',
    name: 'Riley Johnson',
    title: 'Design Systems Lead',
    organization: 'Airbnb',
    location: 'San Francisco, CA',
    bio: 'Building and scaling design systems. Previously at Google Material Design. Focused on creating consistency and efficiency across products.',
    expertise: ['Design Systems', 'Product Design', 'Frontend'],
    availability: 'collaboration',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
  },
  {
    email: 'avery@example.com',
    name: 'Avery Williams',
    title: 'Policy Director',
    organization: 'Center for Democracy & Technology',
    location: 'Washington, DC',
    bio: 'Tech policy and digital rights advocate. Working on privacy, AI governance, and platform accountability issues.',
    expertise: ['Policy', 'Strategy', 'Civic Tech'],
    availability: 'collaboration',
    photoUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
  },
  {
    email: 'quinn@example.com',
    name: 'Quinn Martinez',
    title: 'Senior iOS Engineer',
    organization: 'Apple',
    location: 'Cupertino, CA',
    bio: 'Mobile development and SwiftUI expert. Building beautiful, accessible apps. Open source contributor and conference speaker.',
    expertise: ['Mobile Development', 'Engineering', 'Accessibility'],
    availability: 'office-hours',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
  },
  {
    email: 'drew@example.com',
    name: 'Drew Anderson',
    title: 'Head of Product Design',
    organization: 'Linear',
    location: 'Remote',
    bio: 'Designing tools for software teams. Previously design lead at Abstract and InVision. Focused on craft and attention to detail.',
    expertise: ['Product Design', 'Design Systems', 'Strategy'],
    availability: 'mentorship',
    photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
  },
  {
    email: 'sam@example.com',
    name: 'Sam Thompson',
    title: 'Engineering Manager',
    organization: 'Netflix',
    location: 'Los Gatos, CA',
    bio: 'Leading platform teams building video streaming infrastructure. Passionate about engineering culture and continuous delivery.',
    expertise: ['Engineering', 'DevOps', 'Strategy'],
    availability: 'collaboration',
    photoUrl: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=400',
  },
  {
    email: 'blake@example.com',
    name: 'Blake Lee',
    title: 'UX Research Director',
    organization: 'Meta',
    location: 'Menlo Park, CA',
    bio: 'Building research practices that drive product decisions. 15 years in UX research, specializing in mixed methods and research ops.',
    expertise: ['Research', 'Strategy', 'Product Management'],
    availability: 'mentorship',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
  },
  {
    email: 'reese@example.com',
    name: 'Reese Garcia',
    title: 'Startup Founder',
    organization: 'Stealth Startup',
    location: 'Austin, TX',
    bio: 'Serial entrepreneur building in climate tech. Previously founded two successful startups. Angel investor and advisor.',
    expertise: ['Strategy', 'Operations', 'Fintech'],
    availability: 'office-hours',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
  },
  {
    email: 'charlie@example.com',
    name: 'Charlie Brown',
    title: 'Frontend Architect',
    organization: 'Vercel',
    location: 'Remote',
    bio: 'Building the future of web development. Core contributor to Next.js. Passionate about performance and developer experience.',
    expertise: ['Frontend', 'Engineering', 'DevOps'],
    availability: 'collaboration',
    photoUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=400',
  },
  {
    email: 'frankie@example.com',
    name: 'Frankie Davis',
    title: 'Healthcare Design Lead',
    organization: 'One Medical',
    location: 'San Francisco, CA',
    bio: 'Designing healthcare experiences that put patients first. Background in service design and behavioral science.',
    expertise: ['Healthcare', 'Service Design', 'Research'],
    availability: 'mentorship',
    photoUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
  },
  {
    email: 'skyler@example.com',
    name: 'Skyler Wright',
    title: 'ML Platform Lead',
    organization: 'OpenAI',
    location: 'San Francisco, CA',
    bio: 'Building ML infrastructure at scale. Previously at Google Brain. Focused on making AI more accessible and reliable.',
    expertise: ['Machine Learning', 'Engineering', 'Data Science'],
    availability: 'collaboration',
    photoUrl: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=400',
  },
  {
    email: 'pat@example.com',
    name: 'Pat Sullivan',
    title: 'Executive Director',
    organization: 'Code for America',
    location: 'Oakland, CA',
    bio: 'Leading civic tech initiatives to improve government services. 20 years in nonprofit technology and public service.',
    expertise: ['Civic Tech', 'Policy', 'Operations'],
    availability: 'office-hours',
    photoUrl: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400',
  },
  {
    email: 'robin@example.com',
    name: 'Robin Mitchell',
    title: 'Brand Design Director',
    organization: 'Shopify',
    location: 'Toronto, Canada',
    bio: 'Building brand systems that scale. Background in graphic design and typography. Mentor to emerging designers.',
    expertise: ['Product Design', 'Strategy', 'Marketing'],
    availability: 'mentorship',
    photoUrl: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400',
  },
  {
    email: 'jesse@example.com',
    name: 'Jesse Kim',
    title: 'Security Engineer',
    organization: 'Cloudflare',
    location: 'Remote',
    bio: 'Protecting the internet at scale. Bug bounty hunter and security researcher. Speaker at DEF CON and Black Hat.',
    expertise: ['Engineering', 'DevOps', 'Backend'],
    availability: 'collaboration',
    photoUrl: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400',
  },
  {
    email: 'kerry@example.com',
    name: 'Kerry O\'Brien',
    title: 'Content Strategy Lead',
    organization: 'Slack',
    location: 'Denver, CO',
    bio: 'Words matter. Building content systems that help teams communicate better. Background in journalism and UX writing.',
    expertise: ['Strategy', 'Product Design', 'Research'],
    availability: 'mentorship',
    photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
  },
  {
    email: 'emery@example.com',
    name: 'Emery Jackson',
    title: 'Accessibility Lead',
    organization: 'Microsoft',
    location: 'Redmond, WA',
    bio: 'Making technology accessible to everyone. Leading inclusive design initiatives. Advocate for disability rights in tech.',
    expertise: ['Accessibility', 'Product Design', 'Research'],
    availability: 'mentorship',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
  },
  {
    email: 'finley@example.com',
    name: 'Finley Cooper',
    title: 'Growth PM',
    organization: 'Duolingo',
    location: 'Pittsburgh, PA',
    bio: 'Data-driven product growth. Specializing in retention and engagement. Former data scientist turned PM.',
    expertise: ['Product Management', 'Data Science', 'Strategy'],
    availability: 'collaboration',
    photoUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400',
  },
  {
    email: 'hayden@example.com',
    name: 'Hayden Moore',
    title: 'Developer Advocate',
    organization: 'Stripe',
    location: 'Remote',
    bio: 'Helping developers build better payment experiences. Open source enthusiast. Conference speaker and workshop facilitator.',
    expertise: ['Engineering', 'Fintech', 'Marketing'],
    availability: 'office-hours',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
  },
  {
    email: 'logan@example.com',
    name: 'Logan Price',
    title: 'Infrastructure Lead',
    organization: 'Datadog',
    location: 'New York, NY',
    bio: 'Building observability at scale. SRE background with focus on reliability and performance. Kubernetes contributor.',
    expertise: ['DevOps', 'Engineering', 'Backend'],
    availability: 'collaboration',
    photoUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400',
  },
  {
    email: 'addison@example.com',
    name: 'Addison Rivera',
    title: 'Product Design Manager',
    organization: 'Square',
    location: 'San Francisco, CA',
    bio: 'Building fintech products for small businesses. Growing and mentoring design teams. Previously at PayPal.',
    expertise: ['Product Design', 'Fintech', 'Strategy'],
    availability: 'mentorship',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
  },
  {
    email: 'peyton@example.com',
    name: 'Peyton Reed',
    title: 'AI Ethics Researcher',
    organization: 'Stanford HAI',
    location: 'Palo Alto, CA',
    bio: 'Researching fairness and accountability in AI systems. Publishing on responsible AI development. Policy advisor.',
    expertise: ['Machine Learning', 'Policy', 'Research'],
    availability: 'collaboration',
    photoUrl: 'https://images.unsplash.com/photo-1557296387-5358ad7997bb?w=400',
  },
  {
    email: 'cameron@example.com',
    name: 'Cameron Hughes',
    title: 'Mobile Design Lead',
    organization: 'Uber',
    location: 'San Francisco, CA',
    bio: 'Designing mobile experiences for millions. Focused on design for complex systems and real-world constraints.',
    expertise: ['Product Design', 'Mobile Development', 'Service Design'],
    availability: 'mentorship',
    photoUrl: 'https://images.unsplash.com/photo-1542178243-bc20204b769f?w=400',
  },
  {
    email: 'dakota@example.com',
    name: 'Dakota Chen',
    title: 'Backend Engineer',
    organization: 'Discord',
    location: 'Remote',
    bio: 'Building real-time communication infrastructure. Rust enthusiast. Open source maintainer and community builder.',
    expertise: ['Backend', 'Engineering', 'DevOps'],
    availability: 'collaboration',
    photoUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400',
  },
  {
    email: 'elliot@example.com',
    name: 'Elliot Foster',
    title: 'Head of Operations',
    organization: 'Airtable',
    location: 'San Francisco, CA',
    bio: 'Scaling operations for high-growth startups. Background in consulting and business strategy. Mentor for ops leaders.',
    expertise: ['Operations', 'Strategy', 'Product Management'],
    availability: 'office-hours',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
  },
];

// Seed function
function seed() {
  console.log('Starting database seed...');

  // Clear existing data
  db.exec('DELETE FROM messages');
  db.exec('DELETE FROM connections');
  db.exec('DELETE FROM requests');
  db.exec('DELETE FROM expertise');
  db.exec('DELETE FROM credits');
  db.exec('DELETE FROM profiles');
  db.exec('DELETE FROM users');

  // Reset auto-increment
  db.exec("DELETE FROM sqlite_sequence WHERE name IN ('users', 'profiles', 'expertise', 'requests', 'connections', 'messages', 'credits')");

  const insertUser = db.prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)');
  const insertProfile = db.prepare(`
    INSERT INTO profiles (user_id, name, title, organization, location, bio, photo_url, availability)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertExpertise = db.prepare('INSERT INTO expertise (profile_id, skill) VALUES (?, ?)');
  const insertCredits = db.prepare('INSERT INTO credits (user_id, credits_remaining, credits_total, refresh_date) VALUES (?, ?, ?, ?)');

  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  nextMonth.setDate(1);
  const refreshDate = nextMonth.toISOString();

  // Insert professionals
  for (const professional of mockProfessionals) {
    // Create user (password: demo123)
    const userResult = insertUser.run(professional.email, 'demo123', professional.name);
    const userId = userResult.lastInsertRowid;

    // Create profile
    const profileResult = insertProfile.run(
      userId,
      professional.name,
      professional.title,
      professional.organization,
      professional.location,
      professional.bio,
      professional.photoUrl || null,
      professional.availability
    );
    const profileId = profileResult.lastInsertRowid;

    // Insert expertise
    for (const skill of professional.expertise) {
      insertExpertise.run(profileId, skill);
    }

    // Initialize credits
    insertCredits.run(userId, 10, 10, refreshDate);
  }

  console.log(`Seeded ${mockProfessionals.length} professionals`);

  // Create some sample requests and connections for demo
  const insertRequest = db.prepare(`
    INSERT INTO requests (from_user_id, to_user_id, credits_sent, message, status, created_at)
    VALUES (?, ?, ?, ?, ?, datetime('now', ?))
  `);
  const insertConnection = db.prepare(`
    INSERT INTO connections (user_a_id, user_b_id, user_a_credits, user_b_credits, created_at)
    VALUES (?, ?, ?, ?, datetime('now', ?))
  `);
  const insertMessage = db.prepare(`
    INSERT INTO messages (connection_id, sender_id, content, created_at)
    VALUES (?, ?, ?, datetime('now', ?))
  `);

  // Sample requests (received by user 1 - Sarah)
  insertRequest.run(2, 1, 3, 'Hi Sarah! I would love to learn more about design systems at Stripe.', 'pending', '-2 days');
  insertRequest.run(4, 1, 5, 'Would you consider mentoring me on transitioning to design leadership?', 'pending', '-5 days');
  insertRequest.run(7, 1, 2, 'Love to chat about systems thinking!', 'pending', '-1 day');

  // Sample connection between user 1 and user 3
  const conn1 = insertConnection.run(1, 3, 3, 2, '-10 days');
  insertMessage.run(conn1.lastInsertRowid, 1, 'Hi Jordan! Thanks for connecting. I\'d love to hear more about your work at 18F.', '-10 days');
  insertMessage.run(conn1.lastInsertRowid, 3, 'Thanks Sarah! Happy to chat. Our civic tech work has some interesting parallels to fintech design.', '-9 days');
  insertMessage.run(conn1.lastInsertRowid, 1, 'That makes sense! Would love to schedule a call sometime.', '-8 days');

  // Sample connection between user 1 and user 6
  const conn2 = insertConnection.run(1, 6, 4, 3, '-15 days');
  insertMessage.run(conn2.lastInsertRowid, 6, 'Hey Sarah! I\'ve been following Stripe\'s design work. Really impressive stuff.', '-15 days');
  insertMessage.run(conn2.lastInsertRowid, 1, 'Thanks Casey! Your work on personalization at Spotify is fascinating.', '-14 days');

  console.log('Created sample requests and connections');
  console.log('Database seeding complete!');
  console.log('\nDemo login: any email from the professionals list with password "demo123"');
  console.log('Example: sarah@example.com / demo123');
}

// Run
initTables();
seed();

db.close();
