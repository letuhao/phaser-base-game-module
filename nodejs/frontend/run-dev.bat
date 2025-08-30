@echo off
echo Starting Phaser Game Development Server...
echo.
echo This will:
echo - Install dependencies (if not already installed)
echo - Start the development server
echo - Open your browser to http://localhost:3000
echo.
echo Press any key to continue...
pause >nul

echo.
echo Installing dependencies...
call npm install

echo.
echo Starting development server...
call npm run dev

echo.
echo Development server stopped.
pause
