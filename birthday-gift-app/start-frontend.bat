@echo off
echo 🎁 Starting Birthday Gift Frontend...
echo.
echo Prerequisites Check:
echo - Node.js 18+ ✓
echo - npm ✓
echo.

cd frontend

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo.
echo Starting Vite development server...
echo Frontend will be available at: http://localhost:5173
echo.
echo Make sure the backend is running at: http://localhost:8080
echo.

call npm run dev
pause
