# EspressoTrack

Full-stack espresso shot tracker with brewing parameters. Log shots, track grind settings, dose, yield, and time to dial in your espresso.

## Stack

React (frontend), Express (backend), PostgreSQL, Drizzle ORM

## Architecture

This is a multi-tier app with a separate frontend and backend:

```
client/   → React frontend
server/   → Express API
db/       → Shared Drizzle ORM schema + migrations
```

The `db/` folder is the shared schema layer used by both client and server.

## Dev Commands

```bash
npm run dev       # starts both client and server
npm run db:push   # run after any schema changes in db/
npm run check     # TypeScript type checking
```

## Important

- Always run `npm run db:push` after modifying anything in `db/`
- Schema changes affect both frontend types and backend queries
