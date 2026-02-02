# Quick Setup Guide

## Step 1: Get Your Neon Database

1. Go to [neon.tech](https://neon.tech) and sign up (it's free!)
2. Click "Create Project"
3. Give it a name like "espressotrack"
4. Copy the connection string (it looks like: `postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`)

## Step 2: Configure Environment Variables

Create a `.env` file in the EspressoTrack folder:

```bash
DATABASE_URL=your-neon-connection-string-here
SESSION_SECRET=your-generated-secret-here
```

## Step 3: Initialize Database

```bash
npm run db:push
```

This will create all the necessary tables in your Neon database.

## Step 4: Start the App

```bash
npm run dev
```

Open your browser to `http://localhost:5000` and start tracking your espresso shots! ☕

## Troubleshooting

**Database connection error?**
- Make sure your DATABASE_URL is correct
- Check that you included `?sslmode=require` at the end
- Verify your Neon database is active

**Port already in use?**
- The app runs on port 5000 by default
- Make sure nothing else is using that port

**Build errors?**
- Try deleting `node_modules` and running `npm install` again
- Make sure you're using Node.js 20 or higher
