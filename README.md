# 🎨 AI Portfolio — Dynamic Portfolio System

A modern, full-stack portfolio website with a separate admin panel and Supabase-powered content management.

---

## ✨ Features

- 🎯 **Dynamic Content** — Update portfolio content through the admin panel
- 📱 **Responsive Design** — Works perfectly on all devices
- 🔐 **Admin Panel** — Full CRUD operations for content management
- 🚀 **Modern Tech Stack** — React 19 + Supabase + Vercel
- 🎨 **Clean UI** — Professional design with Lucide icons
- 📊 **Real-time Updates** — Powered by Supabase

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19 + TypeScript + React Router v7 |
| **Admin Panel** | React 19 (separate app) |
| **Backend** | Node.js + Express (local) / Vercel Serverless Functions (production) |
| **Database** | Supabase (PostgreSQL) |
| **Icons** | Lucide React |
| **Deployment** | Vercel |
| **Auth** | JWT-based admin login |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_API_URL=/api
REACT_APP_USE_FALLBACK=false
```

---

## 🗄️ Database Setup

1. Go to your [Supabase](https://supabase.com) project
2. Open **SQL Editor → New Query**
3. Paste the contents of `supabase-schema.sql` and click **Run**

---

## 🚀 Quick Start (Local)

```bash
# 1. Clone the repository
git clone https://github.com/zahid111777/ai-portfolio.git
cd ai-portfolio

# 2. Install dependencies
npm install
npm run install:admin

# 3. Start the portfolio frontend
npm start
# Portfolio → http://localhost:3000

# 4. Start the local API server (open a new terminal)
npm run start:api
# API → http://localhost:8000

# 5. Start the admin panel (open a new terminal)
cd admin && npm start
# Admin → http://localhost:3001
```

---

## 🌐 Access

| App | URL |
|---|---|
| Portfolio | http://localhost:3000 |
| Admin Panel | http://localhost:3001 |
| Local API | http://localhost:8000 |

---

## 🚢 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

> Set all environment variables in your **Vercel project dashboard** under Settings → Environment Variables.

---

## 📁 Project Structure

```
ai-portfolio/
├── src/                        # Main portfolio (React)
├── admin/                      # Admin panel (React)
├── api/                        # Vercel serverless functions
│   ├── token.js               # Auth / JWT endpoint
│   └── users/
│       └── me.js              # User info endpoint
├── scripts/
│   └── combine-builds.js      # Merges main + admin builds for Vercel
├── supabase-schema.sql        # Full database schema
├── local-api-server.js        # Local Express API server
├── vercel.json                # Vercel config (main portfolio)
└── vercel-admin.json          # Vercel config (admin panel)
```

---

## 📝 Content Management

The admin panel allows you to manage:

- ✏️ **About** — Personal info, bio, highlights, and stats
- 💼 **Experience** — Job history, roles, responsibilities, and achievements
- 🚀 **Projects** — Portfolio projects with descriptions, links, and tech stack
- 🔧 **Skills** — Technical skills and proficiency levels
- 📞 **Contact** — Social links and contact information

---

## 🔧 Customization

- **Styling** — Edit CSS files inside the `src/` directory
- **Components** — Modify React components for UI changes
- **API Routes** — Extend or add Vercel serverless functions in `api/`
- **Database** — Update `supabase-schema.sql` and re-run in Supabase SQL Editor

---

## 📚 Documentation

- **Database Schema** — `supabase-schema.sql`
- **Vercel Config** — `vercel.json` and `vercel-admin.json`
- **Supabase Docs** — https://supabase.com/docs
