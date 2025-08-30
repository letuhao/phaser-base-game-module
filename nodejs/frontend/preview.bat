@echo off
echo Previewing Built Phaser Game...
echo.
echo This will:
echo - Start a local server to preview the built game
echo - Open your browser to the preview URL
echo.
echo Note: Make sure you've built the project first using build.bat
echo.
echo Press any key to continue...
pause >nul

echo.
echo Starting preview server...
call npm run preview

echo.
echo Preview server stopped.
pause
