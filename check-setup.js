#!/usr/bin/env node

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Checking EspressoTrack setup...\n');

// Check .env file
try {
  const envContent = readFileSync(join(__dirname, '.env'), 'utf-8');
  
  const hasDbUrl = envContent.includes('DATABASE_URL=') && 
                   !envContent.match(/DATABASE_URL=\s*$/m);
  const hasSessionSecret = envContent.includes('SESSION_SECRET=') && 
                          envContent.match(/SESSION_SECRET=.{32,}/);
  
  console.log(`✅ .env file exists`);
  console.log(`${hasDbUrl ? '✅' : '❌'} DATABASE_URL is ${hasDbUrl ? 'set' : 'missing'}`);
  console.log(`${hasSessionSecret ? '✅' : '❌'} SESSION_SECRET is ${hasSessionSecret ? 'set' : 'missing or too short'}`);
  
  if (!hasDbUrl) {
    console.log('\n⚠️  You need to add your Neon database URL to .env');
    console.log('   Visit https://neon.tech to create a free database\n');
  }
  
  if (hasDbUrl && hasSessionSecret) {
    console.log('\n🎉 Setup looks good! Run "npm run dev" to start the app');
  }
} catch (err) {
  console.log('❌ .env file not found');
  console.log('   Run: cp .env.example .env\n');
}
