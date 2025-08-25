#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Environment variables content
const envContent = `# UniBot Environment Variables
# Copy this file to .env.local and update the values

# API Configuration
NEXT_PUBLIC_API_URL=https://unibot-model.onrender.com

# Development API URL (uncomment for local development)
# NEXT_PUBLIC_API_URL=http://localhost:3000

# Other Configuration
NEXT_PUBLIC_APP_NAME=UniBot
NEXT_PUBLIC_APP_DESCRIPTION=OAU Admission Assistant
`;

// Create .env.local file
const envPath = path.join(__dirname, '.env.local');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created successfully!');
  console.log('📝 Edit .env.local to customize your configuration');
  console.log('🔧 For development, uncomment the localhost URL');
} catch (error) {
  console.error('❌ Error creating .env.local file:', error.message);
  process.exit(1);
}
