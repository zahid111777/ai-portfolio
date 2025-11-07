import sys
import os

# Add the backend directory to Python path
backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend')
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

try:
    # Import and create the app
    from app.main import app as fastapi_app
    
    # For Vercel deployment, we need to handle the app properly
    app = fastapi_app
    
except Exception as e:
    # Fallback FastAPI app for debugging
    from fastapi import FastAPI
    
    app = FastAPI()
    
    @app.get("/")
    async def root():
        return {
            "error": f"Failed to load main app: {str(e)}",
            "status": "error",
            "path_info": sys.path,
            "backend_path": backend_path
        }
    
    @app.get("/api/health")
    async def health():
        return {"status": "error", "message": f"Backend loading failed: {str(e)}"}

# Vercel handler
handler = app