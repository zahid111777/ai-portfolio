from http.server import BaseHTTPRequestHandler
import json
import sys
import os

# Add the backend directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

try:
    from backend.app.config import settings
except ImportError:
    # Fallback settings if backend imports fail
    class Settings:
        secret_key = os.getenv("SECRET_KEY", "fallback-key")
        admin_username = os.getenv("ADMIN_USERNAME", "admin")
        admin_password = os.getenv("ADMIN_PASSWORD", "admin123")
        database_url = os.getenv("DATABASE_URL", "sqlite:///./portfolio.db")
    
    settings = Settings()

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        
        response = {
            "status": "healthy",
            "message": "Portfolio API is running",
            "version": "1.0.0",
            "endpoints": [
                "/api/health",
                "/api/auth/login",
                "/api/about/info",
                "/api/skills",
                "/api/projects",
                "/api/experience",
                "/api/contact"
            ]
        }
        
        self.wfile.write(json.dumps(response).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()