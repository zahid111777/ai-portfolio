# Fix Admin Login - Add Environment Variable to Vercel

## Problem
Admin app was using `/api` which pointed to the admin domain, not the main portfolio API.

## Solution
Add environment variable to Vercel admin project:

### Steps:

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Select Admin Project**
   - Click on `portfolio-admin` project

3. **Go to Settings**
   - Click the "Settings" tab

4. **Environment Variables**
   - Look for "Environment Variables" section
   - Click "Add New"

5. **Add Environment Variable**
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://zahidrashid.vercel.app/api`
   - **Environments**: Select `Production` (or all)
   - Click "Add"

6. **Redeploy**
   - Go to "Deployments" tab
   - Click the three dots on the latest deployment
   - Select "Redeploy"
   - Wait for deployment to complete

7. **Test Admin Login**
   - Open: https://portfolio-admin.vercel.app
   - Login with: `admin` / `admin123`
   - Should work now!

## After Redeploy
The admin app will now correctly connect to the main portfolio API and login will work!
