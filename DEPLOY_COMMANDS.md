# Quick Deploy Commands

## 1. Commit and Push Changes
```bash
git add .
git commit -m "Prepare backend for Render deployment"
git push origin main
```

## 2. Render Deployment Steps
1. Go to [render.com](https://render.com)
2. Connect GitHub → Select `zahid111777/ai-portfolio`
3. Create Web Service:
   - **Root Directory**: `backend`
   - **Build**: `pip install -r requirements.txt`
   - **Start**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

## 3. Environment Variables (Add in Render Dashboard):
```
DATABASE_URL=sqlite:///./portfolio.db
SECRET_KEY=make-this-super-long-and-random-for-security
ADMIN_USERNAME=zahid
ADMIN_PASSWORD=zahid@786
FRONTEND_URL=https://zahidrashid.vercel.app
```

## 4. After Deploy - Update Frontend:
Replace `ai-portfolio-backend.onrender.com` with your actual Render URL in:
- `src/services/api.ts` (line 3)
- `admin/src/services/api.ts` (line 4)

## 5. Test Everything:
- Your backend: `https://your-app.onrender.com/api/health`
- API docs: `https://your-app.onrender.com/api/docs`
- Frontend: `https://zahidrashid.vercel.app`

That's it! 🚀