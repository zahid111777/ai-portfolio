-- ============================================================
-- AI Portfolio Database Schema
-- Run this once in Supabase: SQL Editor → New Query → Run
-- ============================================================

-- About Info
CREATE TABLE IF NOT EXISTS about_info (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Zahid Rashid',
  title TEXT NOT NULL DEFAULT 'AI Engineer',
  description TEXT,
  profile_image TEXT,
  years_experience INT DEFAULT 3,
  ai_projects INT DEFAULT 25,
  ml_models INT DEFAULT 50,
  accuracy_rate INT DEFAULT 98,
  cv_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- About Highlights
CREATE TABLE IF NOT EXISTS about_highlights (
  id SERIAL PRIMARY KEY,
  icon TEXT NOT NULL,
  text TEXT NOT NULL,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experience
CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  duration TEXT NOT NULL,
  location TEXT,
  employment_type TEXT DEFAULT 'Full-time',
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experience_responsibilities (
  id SERIAL PRIMARY KEY,
  experience_id INT REFERENCES experiences(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience_achievements (
  id SERIAL PRIMARY KEY,
  experience_id INT REFERENCES experiences(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience_projects (
  id SERIAL PRIMARY KEY,
  experience_id INT REFERENCES experiences(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience_technologies (
  id SERIAL PRIMARY KEY,
  experience_id INT REFERENCES experiences(id) ON DELETE CASCADE,
  name TEXT NOT NULL
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  github_url TEXT,
  live_url TEXT,
  order_index INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_technologies (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS project_features (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS project_metrics (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  order_index INT DEFAULT 0
);

-- Skills
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency INT DEFAULT 80,
  icon TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Info
CREATE TABLE IF NOT EXISTS contact_info (
  id SERIAL PRIMARY KEY,
  email TEXT,
  phone TEXT,
  location TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Seed Data (insert your real data)
-- ============================================================

INSERT INTO about_info (name, title, description, years_experience, ai_projects, ml_models, accuracy_rate, cv_url)
VALUES (
  'Zahid Rashid',
  'AI Engineer',
  'Passionate AI Engineer with expertise in LLMs, RAG systems, and multi-agent AI. I specialize in developing innovative AI solutions using LangChain, LangGraph, CrewAI, and modern vector databases.',
  3, 25, 50, 98, '/resume.pdf'
) ON CONFLICT DO NOTHING;

INSERT INTO about_highlights (icon, text, order_index) VALUES
  ('🚀', 'Building the Future with AI', 1),
  ('💡', 'Innovative Problem Solver', 2),
  ('⚡', 'Performance Optimizer', 3)
ON CONFLICT DO NOTHING;

INSERT INTO contact_info (email, phone, location, linkedin_url, github_url, twitter_url, website_url)
VALUES (
  'zahidrasheed0123@gmail.com', '+923558073760', 'Pakistan',
  'https://linkedin.com/in/zahidrashid',
  'https://github.com/zahid111777',
  '',
  'https://zahidrashid.vercel.app'
) ON CONFLICT DO NOTHING;
