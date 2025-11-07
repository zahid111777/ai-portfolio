@echo off
echo AI Portfolio - First Time Setup
echo ================================
echo.

echo [1/4] Setting up Backend...
cd backend
if not exist ".venv" (
    echo Creating Python virtual environment...
    python -m venv .venv
)
echo Activating virtual environment...
call .venv\Scripts\activate
echo Installing Python dependencies...
pip install -r requirements.txt
echo Creating admin user...
python setup_new_admin.py
cd ..

echo.
echo [2/4] Setting up Frontend...
echo Installing frontend dependencies...
call npm install

echo.
echo [3/4] Setting up Admin Panel...
cd admin
echo Installing admin dependencies...
call npm install
cd ..

echo.
echo [4/4] Setup Complete!
echo ===================
echo.
echo Your portfolio is ready for development!
echo.
echo To start development servers, run: start-dev.bat
echo Or manually start each service:
echo   1. Backend: cd backend ^&^& .venv\Scripts\activate ^&^& python run.py
echo   2. Frontend: npm start
echo   3. Admin: cd admin ^&^& npm start
echo.
echo Admin Credentials:
echo   Username: zahid
echo   Password: zahid@786
echo.
echo Press any key to exit...
pause >nul