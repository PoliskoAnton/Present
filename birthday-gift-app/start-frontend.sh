#!/bin/bash

echo "🎁 Starting Birthday Gift Frontend..."
echo ""
echo "Prerequisites Check:"
echo "- Node.js 18+ ✓"
echo "- npm ✓"
echo ""

cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo ""
echo "Starting Vite development server..."
echo "Frontend will be available at: http://localhost:5173"
echo ""
echo "Make sure the backend is running at: http://localhost:8080"
echo ""

npm run dev
