# 🚀 Deployment Guide - AI Portfolio

## 📋 Overview
This guide will help you deploy your AI Portfolio with both frontend and backend on Vercel using your existing GitHub repository.

## 🏗️ Architecture
- **Frontend**: React TypeScript portfolio (main site)
- **Backend**: FastAPI serverless functions
- **Admin Panel**: Separate React admin interface
- **Database**: PostgreSQL (recommended for production)

## 🔧 Pre-Deployment Setup

### 1. Code Cleanup ✅
- ✅ Removed test files and dependencies
- ✅ Updated API endpoints to use relative paths
- ✅ Configured CORS for production
- ✅ Added environment variable support

### 2. Required Environment Variables

For **Vercel Dashboard > Settings > Environment Variables**, add:

```env
# Database (Use Vercel Postgres or external PostgreSQL)
DATABASE_URL=postgresql://username:password@host:port/database

# JWT Security
SECRET_KEY=your-super-secure-secret-key-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Admin Credentials
ADMIN_USERNAME=your-secure-admin-username
ADMIN_PASSWORD=your-secure-admin-password

# CORS Origins (Update with your actual domains)
FRONTEND_URL=https://your-portfolio.vercel.app
ADMIN_URL=https://your-admin.vercel.app

# File Upload
UPLOAD_DIR=/tmp/uploads
MAX_FILE_SIZE=5242880
```

## 🚀 Deployment Options

### Option 1: Use Your Existing Repository (Recommended)

#### Step 1: Deploy Main Portfolio + Backend
1. **Push your current changes** to GitHub:
   ```bash
   git add .
   git commit -m "feat: prepare for production deployment with backend API"
   git push origin main
   ```

2. **In Vercel Dashboard**:
   - Your existing project should auto-deploy
   - The `vercel.json` now includes backend API routes
   - Backend will be available at `/api/*` endpoints

#### Step 2: Deploy Admin Panel (Separate Project)
1. **Create new Vercel project** for admin:
   - Import the same GitHub repository
   - Set **Root Directory** to `admin`
   - Use `vercel-admin.json` as config

2. **Or create separate repository** (optional):
   ```bash
   # Create new repo for admin only
   mkdir portfolio-admin
   cp -r admin/* portfolio-admin/
   cd portfolio-admin
   git init
   git add .
   git commit -m "Initial admin panel"
   # Push to new GitHub repo and deploy
   ```

### Option 2: Split into Separate Repositories

If you prefer complete separation:

1. **Frontend Repo**: Move `src/`, `public/`, `package.json` to new repo
2. **Backend Repo**: Move `backend/`, `api/`, `requirements.txt` to new repo  
3. **Admin Repo**: Move `admin/` to new repo

## 🗄️ Database Migration

### For Production (PostgreSQL):

1. **Option A: Vercel Postgres**
   ```bash
   # In Vercel dashboard, add Postgres addon
   # Copy connection string to DATABASE_URL
   ```

2. **Option B: External PostgreSQL**
   - Use Railway, Supabase, or AWS RDS
   - Update `DATABASE_URL` environment variable

3. **Migrate from SQLite**:
   ```bash
   # Export current data
   python backend/update_from_live.py
   
   # Run with new DATABASE_URL
   python backend/setup_new_admin.py
   ```

## 🔒 Security Checklist

- [ ] Change default admin credentials
- [ ] Generate secure SECRET_KEY (32+ characters)
- [ ] Configure proper CORS origins
- [ ] Set up PostgreSQL for production
- [ ] Enable Vercel password protection for admin panel

## 📡 API Endpoints

After deployment, your API will be available at:

```
Frontend: https://your-domain.vercel.app
Backend API: https://your-domain.vercel.app/api
Admin Panel: https://your-admin.vercel.app
```

### Available API Routes:
- `GET /api/health` - Health check
- `POST /api/auth/login` - Admin login
- `GET /api/about/info` - About information
- `GET /api/experience` - Work experience
- `GET /api/projects` - Portfolio projects
- `GET /api/skills` - Technical skills
- `POST /api/contact` - Contact form

## 🚨 Troubleshooting

### Common Issues:

1. **API calls fail**: Check CORS configuration and environment variables
2. **Database connection**: Verify DATABASE_URL format
3. **File uploads**: Ensure UPLOAD_DIR is set to `/tmp/uploads` for Vercel
4. **Admin login**: Check ADMIN_USERNAME and ADMIN_PASSWORD

### Debug Steps:
1. Check Vercel function logs in dashboard
2. Test API endpoints: `/api/health`
3. Verify environment variables are set
4. Check CORS origins match your domains

## 🎯 Next Steps

1. **Deploy main portfolio** using existing repository
2. **Set up environment variables** in Vercel
3. **Create admin panel** deployment
4. **Migrate to PostgreSQL** database
5. **Test all functionality** in production
6. **Set up custom domains** (optional)

## 💡 Tips

- Use Vercel's preview deployments for testing
- Set up branch protection for main branch
- Monitor API usage in Vercel dashboard
- Consider adding API rate limiting for production
- Set up proper logging and monitoring

---

**Ready to deploy?** Start with Step 1 of Option 1! 🚀