# EspressoTrack ☕

A full-stack web application for coffee enthusiasts to track and rate their espresso shots.

## Features

- 🔐 User authentication with secure password hashing
- 📊 Track espresso shots with detailed brewing parameters
- ⭐ Rate your shots with basic and advanced feedback options
- 🎯 Record grinder settings, grind amounts, and extraction times
- 📈 Analyze appearance, aroma, taste, body, and aftertaste
- ⚙️ Customize equipment settings and preferences

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with session-based auth
- **UI**: shadcn/ui + Tailwind CSS
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js 20 or higher
- PostgreSQL database (we recommend [Neon](https://neon.tech) for easy setup)

### Installation

1. Clone the repository and navigate to the project:
```bash
cd EspressoTrack
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your database connection string and session secret:
```env
DATABASE_URL=postgresql://username:password@host/database
SESSION_SECRET=your-random-secret-key-here
```

4. Push the database schema:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

## Database Setup with Neon

1. Sign up for a free account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string from the dashboard
4. Add it to your `.env` file as `DATABASE_URL`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes

## Project Structure

```
EspressoTrack/
├── client/          # React frontend
│   └── src/
│       ├── components/  # UI components
│       ├── hooks/       # Custom React hooks
│       ├── lib/         # Utilities
│       └── pages/       # Page components
├── server/          # Express backend
│   ├── auth.ts      # Authentication logic
│   ├── db.ts        # Database connection
│   ├── routes.ts    # API routes
│   └── storage.ts   # Data access layer
└── shared/          # Shared types and schemas
    └── schema.ts    # Database schema
```

## License

MIT
