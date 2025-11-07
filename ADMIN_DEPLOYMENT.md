# Admin App Deployment Guide

## Overview
The admin app is now deployed as a **separate Vercel project** to provide a clean separation between:
- **Main Portfolio App**: `https://zahidrashid.vercel.app` (your portfolio website)
- **Admin App**: Deployed to its own Vercel project with separate URL

## Deployment Setup

### Prerequisites
1. Admin app Vercel project created on Vercel dashboard
2. GitHub repository secrets configured:
   - `VERCEL_TOKEN`: Your Vercel API token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_ADMIN_PROJECT_ID`: The Vercel project ID for the admin app

### Configuration Files
- **Main App**: `vercel.json` - Configures main portfolio deployment
- **Admin App**: `vercel-admin.json` - Configures admin app deployment
- **Workflow**: `.github/workflows/deploy-admin.yml` - Auto-deploys admin app when `admin/` folder changes

### Getting Started

#### 1. Create Admin Vercel Project
- Go to [https://vercel.com/new](https://vercel.com/new)
- Select this repository
- Set project name (e.g., `portfolio-admin`)
- Override settings:
  - Framework: React
  - Root Directory: `admin`
  - Build command: `npm run build`
  - Output directory: `build`

#### 2. Get Project ID
After creating the project:
```bash
# Get your project ID from Vercel dashboard or:
vercel projects ls
```

#### 3. Set GitHub Secrets
In your repository settings, add these secrets:
```
VERCEL_TOKEN: [Your Vercel API token from https://vercel.com/account/tokens]
VERCEL_ORG_ID: [Your Vercel organization ID]
VERCEL_ADMIN_PROJECT_ID: [The admin project ID]
```

#### 4. Deploy
The admin app will automatically deploy when you:
- Push changes to `admin/` folder
- Update `.github/workflows/deploy-admin.yml`

## Architecture

```
Repository Structure:
├── src/                    # Main portfolio app
├── public/                 # Main app assets
├── admin/                  # Admin app (separate deployment)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── build/
├── api/                    # Serverless API functions
├── backend/                # Python FastAPI backend
├── vercel.json            # Main app config
├── vercel-admin.json      # Admin app config
└── .github/workflows/     # CI/CD workflows
    └── deploy-admin.yml   # Admin auto-deploy
```

## Deployment Flow

### Main Portfolio App
1. Push to main branch (any files outside `admin/`)
2. Vercel auto-deploys via main `vercel.json`
3. Available at: `https://zahidrashid.vercel.app`

### Admin App
1. Push changes to `admin/` folder
2. GitHub workflow triggers
3. Admin app builds and deploys via `vercel-admin.json`
4. Available at: `[Admin Vercel Project URL]`

## Environment Variables

### Admin App (`.env.local` in admin folder)
```env
REACT_APP_API_BASE_URL=https://zahidrashid.vercel.app/api
REACT_APP_ENV=production
```

## Development

### Main Portfolio App
```bash
npm install
npm start       # Runs on http://localhost:3000
npm run build   # Production build
```

### Admin App
```bash
cd admin
npm install
npm start       # Runs on http://localhost:3001
npm run build   # Production build
```

## Testing

### Local Testing
```bash
# Terminal 1: Start main app
npm start

# Terminal 2: Start admin app
cd admin && npm start

# Access:
# Main: http://localhost:3000
# Admin: http://localhost:3001
```

### Production Testing
- Main Portfolio: https://zahidrashid.vercel.app
- Admin App: [Your admin Vercel URL]

## Troubleshooting

### Admin app not deploying
1. Check `.github/workflows/deploy-admin.yml` syntax
2. Verify GitHub secrets are set correctly
3. Check Vercel project ID is correct
4. Review GitHub Actions logs

### Admin app not building
1. `cd admin && npm install` - Ensure dependencies installed
2. Check `admin/package.json` has all required dependencies
3. Review `admin/tsconfig.json` configuration

### API calls failing
1. Verify `REACT_APP_API_BASE_URL` is correct
2. Check backend API is running
3. Review CORS configuration in backend

## Links
- Main Portfolio: https://zahidrashid.vercel.app
- Admin Project Dashboard: https://vercel.com/dashboard
- GitHub Repository: https://github.com/zahid111777/ai-portfolio
