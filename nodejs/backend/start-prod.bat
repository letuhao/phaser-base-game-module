@echo off
echo Starting Phaser Minigame Backend Production Server...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Failed to install dependencies
        pause
        exit /b 1
    )
)

echo Starting production server...
echo Server will be available at: http://localhost:3001
echo API Documentation: http://localhost:3001/docs
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start

pause
