# Roster - Professional Networking with Introduction Credits

A minimalist professional networking web app that uses Strategic Profile Allocation (SPA) mechanics - users have finite "introduction credits" per month to make intentional professional connections.

## Design Philosophy

Inspired by [read.cv](https://read.cv), Roster emphasizes:
- Clean, minimalist interface
- Lots of white space
- Professional typography
- Focus on content over decoration

## Tech Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** SQLite (via better-sqlite3)
- **External API:** Brokerage integration for SPA operations

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Install dependencies:
```bash
cd roster
npm run setup
```

2. Seed the database with mock data:
```bash
cd server
npm run seed
```

3. Start the development server:
```bash
cd ..
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### Demo Login

Use any of the seeded professional emails with password `demo123`:
- sarah@example.com
- alex@example.com
- jordan@example.com
- (see seed.js for full list)

## Core Features

### Introduction Credits (SPA)

- **10 credits per month** - Users get a limited number of introduction credits
- **1-5 credits per request** - Allocate credits based on intent level
- **Bilateral exchange** - Both parties must send credits to connect
- **Signal strength** - More credits = stronger interest signal

Credit allocation meanings:
- 1 credit: Quick question
- 2 credits: Would love to connect
- 3 credits: Interested in collaborating
- 4 credits: Seeking guidance
- 5 credits: Would you mentor me?

### Key Pages

- **Browse** - Discover professionals filtered by expertise and availability
- **Profile View** - Detailed profiles with introduction request modal
- **Requests** - Manage sent and received introduction requests
- **Connections** - Active conversations with connected professionals
- **My Profile** - View and edit your professional profile

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Sign in
- `GET /api/auth/me` - Get current user

### Profile
- `POST /api/profile/create` - Create profile
- `PUT /api/profile/update` - Update profile
- `GET /api/profile/me` - Get own profile
- `GET /api/profile/:userId` - Get profile by user ID

### Professionals
- `GET /api/professionals` - Browse professionals (with filters)

### Credits
- `GET /api/credits/status` - Get credit balance and refresh date

### Requests
- `POST /api/requests/send` - Send introduction request
- `POST /api/requests/accept` - Accept request (creates connection)
- `POST /api/requests/decline` - Decline request
- `GET /api/requests/sent` - Get sent requests
- `GET /api/requests/received` - Get received requests

### Connections
- `GET /api/connections` - Get all connections
- `GET /api/connections/:id` - Get connection with messages
- `POST /api/connections/add-credits` - Send more credits

### Messages
- `POST /api/messages/send` - Send message in connection

## Brokerage Integration

The app integrates with an external brokerage API for SPA operations:

```
BROKERAGE_API_URL=https://drydown.replit.app
BROKERAGE_API_KEY=<your_key>
```

If the brokerage is unavailable, the app falls back to local credit tracking.

## Project Structure

```
roster/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React context (auth)
│   │   ├── pages/         # Page components
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # API utilities
│   └── public/
├── server/                 # Express backend
│   ├── routes/            # API route handlers
│   ├── middleware/        # Auth middleware
│   ├── services/          # Brokerage service
│   ├── db.js              # Database setup
│   ├── seed.js            # Mock data seeding
│   └── index.js           # Server entry
└── package.json           # Root package (runs both)
```

## License

MIT
