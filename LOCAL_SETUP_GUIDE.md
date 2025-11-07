# 🚀 AI Portfolio - Local Development Setup

## Overview
This is a dynamic portfolio with React frontend, FastAPI backend, and React admin panel. Everything can be run locally on any machine.

## Architecture
- **Frontend**: React + TypeScript (Main portfolio)
- **Backend**: FastAPI + SQLAlchemy + SQLite 
- **Admin**: React + TypeScript (Content management)

## 📋 Prerequisites
- Node.js 18+ 
- Python 3.9+
- Git

## 🛠️ Quick Setup (Any Machine)

### 1. Clone Repository
```bash
git clone https://github.com/zahid111777/ai-portfolio.git
cd ai-portfolio
```

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create admin user (first time only)
python setup_new_admin.py

# Start backend server
python run.py
```
Backend will run on: http://localhost:8000

### 3. Frontend Setup
```bash
# Open new terminal, navigate to project root
cd ai-portfolio

# Install dependencies
npm install

# Start frontend
npm start
```
Frontend will run on: http://localhost:3000

### 4. Admin Panel Setup
```bash
# Open new terminal, navigate to admin
cd ai-portfolio/admin

# Install dependencies
npm install

# Start admin panel
npm start
```
Admin panel will run on: http://localhost:3001

## 🔐 Admin Credentials
- **Username**: `zahid`
- **Password**: `zahid@786`

## 📁 Project Structure
```
ai-portfolio/
├── src/                 # Main portfolio frontend
├── admin/               # Admin panel frontend  
├── backend/             # FastAPI backend
│   ├── app/            # FastAPI application
│   ├── portfolio.db    # SQLite database
│   └── run.py          # Server startup
├── public/             # Static assets
└── README.md
```

## 🎯 Development Workflow

### Making Content Changes:
1. **Start all services** (backend, frontend, admin)
2. **Open admin panel**: http://localhost:3001
3. **Login** with admin credentials
4. **Update content** (About, Experience, Projects, Skills)
5. **View changes** on main portfolio: http://localhost:3000

### API Endpoints:
- **Health Check**: http://localhost:8000/api/health
- **API Docs**: http://localhost:8000/api/docs
- **Admin Login**: POST /api/auth/login
- **About Info**: GET /api/about/info
- **Projects**: GET /api/projects
- **Experience**: GET /api/experience
- **Skills**: GET /api/skills

## 🔧 Troubleshooting

### Backend Issues:
```bash
# Recreate virtual environment
cd backend
rmdir /s .venv  # Windows
rm -rf .venv    # macOS/Linux
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
```

### Database Issues:
```bash
# Reset database (if needed)
cd backend
python setup_new_admin.py
```

### Port Conflicts:
- Backend: Change port in `backend/run.py`
- Frontend: Change port with `PORT=3002 npm start`
- Admin: Change port with `PORT=3003 npm start`

## 📦 Building for Production
```bash
# Build frontend
npm run build

# Build admin
cd admin
npm run build
```

## 🎨 Customization
- **Portfolio Content**: Use admin panel
- **Styling**: Edit CSS files in `src/`
- **Components**: Modify React components
- **API**: Extend FastAPI routes in `backend/app/routers/`

## 📝 Notes
- Database is SQLite (file-based) - easy to backup/restore
- All changes persist in `backend/portfolio.db`
- Admin panel provides full CRUD operations
- Frontend fetches data dynamically from API

---
**Ready to develop!** 🎉 Start all three services and begin customizing your portfolio.