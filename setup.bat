@echo off
echo Setting up Dynamic Portfolio...

echo.
echo Step 1: Setting up Backend...
cd backend
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt
echo Backend setup complete!

echo.
echo Step 2: Setting up Frontend...
cd ..
npm install
echo Frontend setup complete!

echo.
echo Step 3: Setting up Admin Panel...
cd admin
npm install
npm install axios react-hook-form react-hot-toast @heroicons/react
echo Admin panel setup complete!

echo.
echo Setup complete! 
echo.
echo To start the application:
echo 1. Backend: cd backend && python run.py
echo 2. Frontend: npm start (in root directory)
echo 3. Admin Panel: cd admin && npm start
echo.
echo Default admin credentials:
echo Username: admin
echo Password: admin123
echo.
pause