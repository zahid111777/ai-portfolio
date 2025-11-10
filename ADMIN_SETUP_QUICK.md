# QUICK SETUP: Deploy Admin App

## Step 1: Create Admin Project on Vercel
1. Go to https://vercel.com/new
2. Select repository: `ai-portfolio`
3. Set these options:
   - **Framework**: React
   - **Root Directory**: `admin`
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`
   - **Output Directory**: `build`
4. Click **Deploy**
5. Wait for deployment to complete
6. Note your **Admin Project URL** (e.g., `https://portfolio-admin-xxx.vercel.app`)

## Step 2: Get Admin Project ID
Copy the project ID from Vercel dashboard or run:
```bash
vercel projects ls
```
Find the admin project and note its ID.

## Step 3: Add GitHub Secrets
1. Go to GitHub repository settings: https://github.com/zahid111777/ai-portfolio/settings/secrets/actions
2. Create new secrets:

**Secret 1: VERCEL_TOKEN**
- Get from: https://vercel.com/account/tokens
- Create a new token and copy it

**Secret 2: VERCEL_ORG_ID**
- Get from: https://vercel.com/account/settings
- Look for "Team ID" in settings

**Secret 3: VERCEL_ADMIN_PROJECT_ID**
- Get from Vercel dashboard for the admin project

## Step 4: Verify Setup
After adding secrets, the GitHub Actions workflow will automatically:
- ✅ Deploy admin app when you push changes to `admin/` folder
- ✅ Keep main portfolio separate at `https://zahidrashid.vercel.app`
- ✅ Deploy admin app to its own URL

## Result
**Two separate apps:**
- **Portfolio**: https://zahidrashid.vercel.app (main portfolio website)
- **Admin**: https://portfolio-admin-xxx.vercel.app (admin dashboard with login)

## Testing Admin App
1. Open admin URL: `https://portfolio-admin-xxx.vercel.app`
2. Login with: `admin` / `admin123`
3. You'll see the ModernDashboard with full admin controls

## Automatic Deployments
Every time you:
- Push to `admin/` folder → Admin app deploys
- Push other files → Main portfolio deploys

## Full Guide
See `ADMIN_DEPLOYMENT.md` for complete documentation.
