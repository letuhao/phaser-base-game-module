@echo off
echo Building Phaser Game for Production...
echo.
echo This will:
echo - Install dependencies (if not already installed)
echo - Build the project
echo - Create optimized files in the 'dist' folder
echo.
echo Press any key to continue...
pause >nul

echo.
echo Installing dependencies...
call npm install

echo.
echo Building project...
call npm run build

echo.
echo Build completed!
echo Check the 'dist' folder for production files.
echo.
pause
