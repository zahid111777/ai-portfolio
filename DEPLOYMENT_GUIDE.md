# DEPLOYMENT GUIDE - Railway.app (Recommended)

## Backend Deployment Steps:

### 1. Prepare Backend for Deployment
✅ DONE - All files are ready

### 2. Deploy to Railway.app
1. Go to https://railway.app
2. Sign up/Login with GitHub
3. Click "Start a New Project"
4. Select "Deploy from GitHub repo"
5. Choose your ai-portfolio repository
6. Select the `backend` folder as the root directory
7. Railway will automatically detect Python and deploy

### 3. Set Environment Variables in Railway
In Railway dashboard → Variables, add:
```
ENVIRONMENT=production
DATABASE_URL=sqlite:///./portfolio.db
SECRET_KEY=your-super-secret-key-change-this-in-production
FRONTEND_DOMAIN=https://your-vercel-app.vercel.app
```

### 4. Get Your Backend URL
After deployment, Railway will give you a URL like:
`https://your-app-name.railway.app`

## Alternative: Render.com Deployment

### 1. Go to https://render.com
2. Connect GitHub
3. Create New → Web Service
4. Select ai-portfolio repo
5. Root Directory: `backend`
6. Build Command: `pip install -r requirements.txt`
7. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

## Alternative: Heroku Deployment

### 1. Install Heroku CLI
2. In backend folder, run:
```bash
heroku create your-portfolio-api
git subtree push --prefix backend heroku main
```

---

## Next Steps After Backend Deployment:

1. Get your backend URL (e.g., https://your-app.railway.app)
2. Update frontend environment variables
3. Deploy frontend to Vercel
4. Test the full system