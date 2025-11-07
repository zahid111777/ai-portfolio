# Deploy Backend to Render.com

## Step 1: Prepare Your Repository

Your backend code is ready! Located in `/backend` directory with:
- ✅ FastAPI application (`app/main.py`)
- ✅ Requirements file (`requirements.txt`)
- ✅ Database models and schemas
- ✅ Authentication system

## Step 2: Create Render Account & Deploy

### A. Sign Up / Login
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended) or email
3. Connect your GitHub account

### B. Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `zahid111777/ai-portfolio`
3. Configure the service:

**Basic Settings:**
- **Name**: `ai-portfolio-backend`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Python 3`

**Build & Deploy:**
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### C. Environment Variables
Add these in Render dashboard under "Environment":
```
ADMIN_USERNAME=zahid
ADMIN_PASSWORD=zahid@786
SECRET_KEY=your-secret-key-here-make-it-long-and-secure
DATABASE_URL=sqlite:///./portfolio.db
CORS_ORIGINS=https://zahidrashid.vercel.app,http://localhost:3000
```

## Step 3: Deploy Process
1. Click "Create Web Service"
2. Render will automatically:
   - Clone your repo
   - Install dependencies
   - Start the FastAPI server
3. Your backend will be available at: `https://ai-portfolio-backend-xxxx.onrender.com`

## Step 4: Update Frontend
Update your frontend API base URL to use the Render URL instead of localhost.

## Step 5: Test Everything
- Test API endpoints
- Test admin login
- Verify CORS settings

## Troubleshooting
- **Build fails**: Check requirements.txt format
- **App won't start**: Verify start command
- **CORS errors**: Update CORS_ORIGINS environment variable
- **Database issues**: SQLite will work but consider PostgreSQL for production

## Free Tier Limitations
- Apps sleep after 15 minutes of inactivity
- 750 hours/month (enough for personal projects)
- 512MB RAM, 0.1 CPU

## Production Recommendations
- Upgrade to paid plan for always-on service
- Use PostgreSQL instead of SQLite
- Set up proper logging and monitoring