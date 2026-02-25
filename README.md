# EspressoTrack

Your personal espresso brewing companion. Track shots, dial in grinder settings, and perfect your espresso over time.

**Live at [espressotrack.com](https://espressotrack.com)**

## What It Does

EspressoTrack lets you create brewing profiles for different coffee beans and track the parameters that matter: grinder setting, dose, grind dial, and extraction quality. Over time, you build a personal library of dialed-in recipes you can reference whenever you switch beans.

**Key features:**
- Create and manage espresso brewing profiles by brand and product
- Track grinder settings, grind amount, and dial position per bean
- Rate shots on a 5-star scale
- Optional advanced tasting feedback (appearance, aroma, taste, body, aftertaste, extraction time)
- Search and filter your profile library
- Built-in blog with brewing tips

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, TypeScript, Tailwind CSS, Radix UI (shadcn/ui) |
| State | TanStack React Query, React Hook Form + Zod |
| Routing | Wouter |
| Animations | Framer Motion |
| Backend | Express 4, Passport.js (session auth) |
| Database | PostgreSQL (Neon serverless) via Drizzle ORM |
| Build | Vite (client), esbuild (server) |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) PostgreSQL database (or any PostgreSQL instance)

### Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/phaupaul/EspressoTrack.git
   cd EspressoTrack
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:
   ```
   DATABASE_URL=your_postgresql_connection_string
   SESSION_SECRET=your_random_secret_here
   ```

4. Push the database schema:
   ```bash
   npm run db:push
   ```

5. Start the dev server:
   ```bash
   npm run dev
   ```

   The app runs at `http://localhost:3000`.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/       # Custom React hooks (auth, toast)
│   │   ├── lib/         # Query client, utilities
│   │   └── pages/       # Route pages
│   └── index.html
├── server/              # Express backend
│   ├── auth.ts          # Passport auth setup
│   ├── routes.ts        # API endpoints
│   ├── storage.ts       # Database access layer
│   └── index.ts         # Server entry point
├── shared/              # Shared types and schemas
│   └── schema.ts        # Drizzle schema + Zod validation
└── package.json
```

## License

MIT
