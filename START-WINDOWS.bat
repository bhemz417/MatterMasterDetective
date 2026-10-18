@echo off
setlocal
cd /d "%~dp0"
title Matter Detective - Science City
color 0E
echo.
echo  ==================================================
echo     MATTER DETECTIVE 3.3 - SCIENCE
echo  ==================================================
echo.
where node.exe >nul 2>&1
if errorlevel 1 (
 echo [ERROR] Node.js is missing. Install Node.js 20 or newer from https://nodejs.org/
 pause
 exit /b 1
)
where npm.cmd >nul 2>&1
if errorlevel 1 (
 echo [ERROR] npm is missing. Reinstall Node.js from https://nodejs.org/
 pause
 exit /b 1
)
if not exist "node_modules\.bin\vite.cmd" goto install
if not exist "node_modules\.bin\concurrently.cmd" goto install
goto launch
:install
echo [SETUP] Installing dependencies (requires an internet connection)...
call npm.cmd install --no-audit --no-fund
if errorlevel 1 (
 echo.
 echo [ERROR] Dependency installation failed.
 echo Check the terminal error and see TROUBLESHOOTING-WINDOWS.md.
 pause
 exit /b 1
)
:launch
echo.
echo [START] React and Node.js development servers...
echo [OPEN]  http://localhost:5173
echo [STOP]  Press Ctrl+C in this window.
echo.
call npm.cmd run dev
if errorlevel 1 (
 echo [ERROR] Application did not start. See TROUBLESHOOTING-WINDOWS.md.
 pause
 exit /b 1
)
pause
