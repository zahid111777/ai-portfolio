from http.server import BaseHTTPRequestHandler
import json
import sys
import os
import sqlite3
import bcrypt
import base64
import hmac
import hashlib
from datetime import datetime, timedelta

# Add the backend directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Parse request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            username = data.get('username')
            password = data.get('password')
            
            if not username or not password:
                self.send_error_response(400, "Username and password required")
                return
            
            # Database path for Vercel
            db_path = '/tmp/portfolio.db'
            if not os.path.exists(db_path):
                # Create database if it doesn't exist
                self.create_database(db_path)
            
            # Authenticate user
            if self.authenticate_user(db_path, username, password):
                # Generate JWT token
                token = self.generate_token(username)
                self.send_success_response({
                    "access_token": token,
                    "token_type": "bearer",
                    "message": "Login successful"
                })
            else:
                self.send_error_response(401, "Invalid credentials")
                
        except Exception as e:
            self.send_error_response(500, f"Server error: {str(e)}")
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
    
    def authenticate_user(self, db_path, username, password):
        try:
            conn = sqlite3.connect(db_path)
            cursor = conn.cursor()
            
            cursor.execute("SELECT password FROM users WHERE username = ?", (username,))
            result = cursor.fetchone()
            conn.close()
            
            if result:
                stored_password = result[0]
                return bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8'))
            return False
        except:
            return False
    
    def generate_token(self, username):
        secret_key = os.getenv("SECRET_KEY", "your-super-secret-key-change-this-in-production-please")
        # Simple token generation for Vercel compatibility
        import time
        payload = f"{username}:{int(time.time() + 1800)}"  # 30 minutes
        signature = hmac.new(
            secret_key.encode(), 
            payload.encode(), 
            hashlib.sha256
        ).hexdigest()
        token = base64.b64encode(f"{payload}:{signature}".encode()).decode()
        return token
    
    def create_database(self, db_path):
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Create users table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Create admin user
        admin_username = os.getenv("ADMIN_USERNAME", "zahid")
        admin_password = os.getenv("ADMIN_PASSWORD", "zahid@786")
        
        # Hash password
        hashed = bcrypt.hashpw(admin_password.encode('utf-8'), bcrypt.gensalt())
        
        try:
            cursor.execute(
                "INSERT INTO users (username, password) VALUES (?, ?)",
                (admin_username, hashed.decode('utf-8'))
            )
        except sqlite3.IntegrityError:
            pass  # User already exists
        
        conn.commit()
        conn.close()
    
    def send_success_response(self, data):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
    
    def send_error_response(self, code, message):
        self.send_response(code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        self.wfile.write(json.dumps({"detail": message}).encode())