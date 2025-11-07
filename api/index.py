import sys
import os
from pathlib import Path

# Setup paths for Vercel deployment
current_dir = Path(__file__).parent
backend_dir = current_dir.parent / "backend"

# Add backend to Python path
sys.path.insert(0, str(backend_dir))
sys.path.insert(0, str(backend_dir / "app"))

def create_app():
    """Create and configure the FastAPI app for Vercel."""
    try:
        # Set environment variables for Vercel
        os.environ.setdefault("VERCEL", "1")
        os.environ.setdefault("ENVIRONMENT", "production")
        
        # Import FastAPI modules
        from fastapi import FastAPI, HTTPException
        from fastapi.middleware.cors import CORSMiddleware
        from fastapi.responses import JSONResponse
        import sqlite3
        
        # Create FastAPI app
        app = FastAPI(title="Portfolio API", version="1.0.0")
        
        # Configure CORS for Vercel
        app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],  # Allow all origins for Vercel
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        
        # Simple in-memory data store for Vercel
        portfolio_data = {
            "about": {
                "name": "Zahid Rashid",
                "title": "Full Stack Developer", 
                "description": "Passionate developer with experience in modern web technologies.",
                "email": "zahid@example.com",
                "phone": "+1234567890",
                "location": "Your Location",
                "profile_image": "assets/profile.jpg"
            },
            "skills": [
                {"id": 1, "name": "JavaScript", "category": "Programming", "proficiency": 90},
                {"id": 2, "name": "Python", "category": "Programming", "proficiency": 85},
                {"id": 3, "name": "React", "category": "Frontend", "proficiency": 88},
                {"id": 4, "name": "FastAPI", "category": "Backend", "proficiency": 82}
            ],
            "experiences": [
                {
                    "id": 1,
                    "title": "Full Stack Developer",
                    "company": "Tech Company",
                    "location": "Remote",
                    "start_date": "2023-01-01",
                    "end_date": "Present",
                    "description": "Developing modern web applications using React and FastAPI."
                }
            ],
            "projects": [
                {
                    "id": 1,
                    "title": "Portfolio Website",
                    "description": "Dynamic portfolio website with admin panel",
                    "technologies": "React, FastAPI, SQLAlchemy",
                    "github_url": "https://github.com/zahid111777/ai-portfolio",
                    "live_url": "https://zahidrashid.vercel.app",
                    "image": "projects/portfolio.jpg"
                }
            ]
        }
        
        # Admin user for authentication
        admin_user = {"username": "admin", "password": "admin123"}
        
        # Authentication routes
        @app.post("/api/auth/login")
        async def login(credentials: dict):
            username = credentials.get("username")
            password = credentials.get("password")
            
            if username == admin_user["username"] and password == admin_user["password"]:
                return {"access_token": "dummy_token", "token_type": "bearer"}
            else:
                raise HTTPException(status_code=401, detail="Invalid credentials")
        
        # About routes
        @app.get("/api/about")
        async def get_about():
            return portfolio_data["about"]
            
        @app.put("/api/about")
        async def update_about(data: dict):
            portfolio_data["about"].update(data)
            return portfolio_data["about"]
        
        # Skills routes
        @app.get("/api/skills")
        async def get_skills():
            return portfolio_data["skills"]
            
        @app.post("/api/skills")
        async def create_skill(skill: dict):
            new_id = max([s["id"] for s in portfolio_data["skills"]], default=0) + 1
            skill["id"] = new_id
            portfolio_data["skills"].append(skill)
            return skill
            
        @app.put("/api/skills/{skill_id}")
        async def update_skill(skill_id: int, skill: dict):
            for i, s in enumerate(portfolio_data["skills"]):
                if s["id"] == skill_id:
                    portfolio_data["skills"][i] = {**s, **skill}
                    return portfolio_data["skills"][i]
            raise HTTPException(status_code=404, detail="Skill not found")
            
        @app.delete("/api/skills/{skill_id}")
        async def delete_skill(skill_id: int):
            portfolio_data["skills"] = [s for s in portfolio_data["skills"] if s["id"] != skill_id]
            return {"message": "Skill deleted"}
        
        # Experience routes  
        @app.get("/api/experience")
        async def get_experience():
            return portfolio_data["experiences"]
            
        @app.post("/api/experience")
        async def create_experience(experience: dict):
            new_id = max([e["id"] for e in portfolio_data["experiences"]], default=0) + 1
            experience["id"] = new_id
            portfolio_data["experiences"].append(experience)
            return experience
            
        @app.put("/api/experience/{experience_id}")
        async def update_experience(experience_id: int, experience: dict):
            for i, e in enumerate(portfolio_data["experiences"]):
                if e["id"] == experience_id:
                    portfolio_data["experiences"][i] = {**e, **experience}
                    return portfolio_data["experiences"][i]
            raise HTTPException(status_code=404, detail="Experience not found")
            
        @app.delete("/api/experience/{experience_id}")
        async def delete_experience(experience_id: int):
            portfolio_data["experiences"] = [e for e in portfolio_data["experiences"] if e["id"] != experience_id]
            return {"message": "Experience deleted"}
        
        # Projects routes
        @app.get("/api/projects")
        async def get_projects():
            return portfolio_data["projects"]
            
        @app.post("/api/projects")
        async def create_project(project: dict):
            new_id = max([p["id"] for p in portfolio_data["projects"]], default=0) + 1
            project["id"] = new_id
            portfolio_data["projects"].append(project)
            return project
            
        @app.put("/api/projects/{project_id}")
        async def update_project(project_id: int, project: dict):
            for i, p in enumerate(portfolio_data["projects"]):
                if p["id"] == project_id:
                    portfolio_data["projects"][i] = {**p, **project}
                    return portfolio_data["projects"][i]
            raise HTTPException(status_code=404, detail="Project not found")
            
        @app.delete("/api/projects/{project_id}")
        async def delete_project(project_id: int):
            portfolio_data["projects"] = [p for p in portfolio_data["projects"] if p["id"] != project_id]
            return {"message": "Project deleted"}
        
        # Contact route
        @app.get("/api/contact")
        async def get_contact():
            return {
                "email": portfolio_data["about"]["email"],
                "phone": portfolio_data["about"]["phone"],
                "location": portfolio_data["about"]["location"]
            }
        
        # Health check
        @app.get("/api/health")
        async def health_check():
            return {"status": "healthy", "message": "Portfolio API is running on Vercel"}
        
        # Root endpoint
        @app.get("/")
        async def root():
            return {
                "message": "Portfolio API - Vercel Deployment",
                "version": "1.0.0",
                "docs": "/api/docs",
                "health": "/api/health"
            }
        
        return app
        
    except Exception as e:
        # Fallback app if main app fails
        from fastapi import FastAPI
        
        fallback_app = FastAPI()
        
        @fallback_app.get("/")
        async def fallback_root():
            return {
                "error": f"Failed to load main app: {str(e)}",
                "status": "error",
                "message": "Fallback API active"
            }
            
        @fallback_app.get("/api/health")
        async def fallback_health():
            return {"status": "error", "message": f"Backend loading failed: {str(e)}"}
        
        return fallback_app

# Create the app instance for Vercel
app = create_app()

# Vercel handler
handler = app