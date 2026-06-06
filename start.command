#!/bin/bash
# Mahmoud Plumbing — double-click this file on Mac to start the dev server

# Move to the folder where this script lives (the project root)
cd "$(dirname "$0")"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   MAHMOUD PLUMBING — Dev Server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Install dependencies only if node_modules is missing
if [ ! -d "node_modules" ]; then
  echo "⏳  First-time setup — installing packages..."
  npm install --legacy-peer-deps
  echo ""
fi

echo "🚀  Starting server at http://localhost:3000"
echo "    Press Ctrl+C in this window to stop."
echo ""

# Start the dev server in the background
npm run dev &
SERVER_PID=$!

# Wait a few seconds then open the browser
sleep 4
open http://localhost:3000

# Keep the terminal window open until the server is stopped
wait $SERVER_PID
