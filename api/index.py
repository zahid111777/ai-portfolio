from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import sys

# Add the backend directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

from backend.app.main import app as backend_app

# Create a new FastAPI app for Vercel
app = FastAPI()

# Configure CORS for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the backend app
app.mount("/api", backend_app)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Portfolio API is running on Vercel"}

# Health check endpoint
@app.get("/health")
async def health():
    return {"status": "healthy"}