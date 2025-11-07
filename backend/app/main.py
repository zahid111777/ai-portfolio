from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import os

from .config import settings
from .database import engine, get_db
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
    """Startup event - admin user should be created manually."""
    # Admin user creation disabled - use setup_new_admin.py to create admin
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