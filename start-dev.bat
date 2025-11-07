@echo off
echo Starting AI Portfolio Development Environment...
echo.

echo [1/3] Starting Backend...
start "Backend" cmd /k "cd backend && .venv\Scripts\activate && python run.py"

timeout /t 3 /nobreak >nul

echo [2/3] Starting Frontend...
start "Frontend" cmd /k "npm start"

timeout /t 3 /nobreak >nul

echo [3/3] Starting Admin Panel...
start "Admin" cmd /k "cd admin && npm start"

echo.
echo Development servers are starting...
echo - Backend: http://localhost:8000
echo - Frontend: http://localhost:3000  
echo - Admin: http://localhost:3001
echo.
echo Admin Login: zahid / zahid@786
echo.
echo Press any key to exit...
pause >nul