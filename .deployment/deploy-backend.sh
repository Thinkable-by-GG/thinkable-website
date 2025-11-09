#!/bin/bash
# Backend deployment script

set -e

SERVER_USER="ubuntu"
SERVER_HOST="3.127.110.245"
SERVER_PATH="/var/www/thinkable.app/backend"
KEY_FILE="/Users/gurilany/samuramu.pem"

echo "📦 Preparing backend for deployment..."

# Create deployment directory
mkdir -p .deployment/backend

# Copy necessary files
echo "Copying backend files..."
cp -r src/cms .deployment/backend/
cp package.json .deployment/backend/
cp tsconfig.json .deployment/backend/
cp .env.example .deployment/backend/.env.example

# Create production package.json (without dev dependencies for frontend)
cat > .deployment/backend/package.json << 'EOF'
{
  "name": "thinkable-cms",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/cms/server.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/cms/server.js",
    "dev": "cross-env PAYLOAD_CONFIG_PATH=src/cms/payload.config.ts payload"
  },
  "dependencies": {
    "payload": "^2.8.2",
    "@payloadcms/db-mongodb": "^1.0.0",
    "@payloadcms/bundler-webpack": "^1.0.0",
    "@payloadcms/richtext-slate": "^1.0.0",
    "express": "^4.18.2",
    "mongodb": "^6.3.0",
    "dotenv": "^16.4.1",
    "cross-env": "^7.0.3"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "typescript": "^5.2.2"
  }
}
EOF

echo "✅ Backend package prepared"
