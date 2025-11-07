from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import os

from .config import settings
from .database import engine, get_db, SessionLocal
from .models import Base, User as UserModel
from .auth import get_password_hash
from .routers import auth, about, experience, projects, skills, contact, upload

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Portfolio API",
    description="Dynamic Portfolio Backend API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Configure CORS
allowed_origins = [
    settings.frontend_url, 
    settings.admin_url, 
    "http://localhost:3000", 
    "http://localhost:3001"
]

# Add production domain patterns
production_domains = [
    "https://*.vercel.app",
    "https://*.netlify.app",
    "https://*.herokuapp.com",
    "https://*.railway.app",
    "https://*.onrender.com"
]

# Add your custom domain if you have one
if os.getenv("FRONTEND_DOMAIN"):
    allowed_origins.append(os.getenv("FRONTEND_DOMAIN"))

# In production, allow common deployment platforms
if os.getenv("ENVIRONMENT") == "production":
    allowed_origins.extend(production_domains)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
os.makedirs(settings.upload_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.upload_dir), name="uploads")

# Include routers
app.include_router(auth.router, prefix="/api")
app.include_router(about.router, prefix="/api")
app.include_router(experience.router, prefix="/api")
app.include_router(projects.router, prefix="/api")
app.include_router(skills.router, prefix="/api")
app.include_router(contact.router, prefix="/api")
app.include_router(upload.router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    """Startup event - create admin user and sample data for Vercel deployment."""
    try:
        # For Vercel (in-memory database), create admin user and sample data on startup
        if os.getenv("VERCEL"):
            from sqlalchemy.orm import Session
            from .auth import get_password_hash
            from .models import About, Experience, Project, Skill, Contact
            
            # Create admin user and sample data in memory database
            db = SessionLocal()
            try:
                # Check if admin user exists
                admin_user = db.query(UserModel).filter(UserModel.username == settings.admin_username).first()
                if not admin_user:
                    # Create admin user
                    hashed_password = get_password_hash(settings.admin_password)
                    admin_user = UserModel(
                        username=settings.admin_username,
                        hashed_password=hashed_password,
                        email="admin@portfolio.com",
                        is_active=True
                    )
                    db.add(admin_user)
                    
                    # Create sample about data
                    about = About(
                        name="Zahid Rashid",
                        title="Full Stack Developer",
                        description="Passionate developer with experience in modern web technologies.",
                        email="zahid@example.com",
                        phone="+1234567890",
                        location="Your Location",
                        profile_image="assets/profile.jpg"
                    )
                    db.add(about)
                    
                    # Create sample skills
                    skills = [
                        Skill(name="JavaScript", category="Programming", proficiency=90),
                        Skill(name="Python", category="Programming", proficiency=85),
                        Skill(name="React", category="Frontend", proficiency=88),
                        Skill(name="FastAPI", category="Backend", proficiency=82)
                    ]
                    for skill in skills:
                        db.add(skill)
                    
                    db.commit()
                    print(f"Admin user and sample data created for Vercel deployment")
                else:
                    print(f"Admin user already exists: {settings.admin_username}")
            except Exception as e:
                print(f"Error creating admin user and sample data: {e}")
                db.rollback()
            finally:
                db.close()
    except Exception as e:
        print(f"Startup error: {e}")
        pass

@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "message": "Portfolio API is running"}

@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Portfolio API",
        "version": "1.0.0",
        "docs": "/api/docs",
        "health": "/api/health"
    }