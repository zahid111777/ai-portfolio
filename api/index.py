from http.server import BaseHTTPRequestHandler
import json
import urllib.parse
import os
import sqlite3
import bcrypt
import base64
import hmac
import hashlib
import time

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # Parse the URL path
            parsed_path = urllib.parse.urlparse(self.path)
            path = parsed_path.path
            query = urllib.parse.parse_qs(parsed_path.query)
            
            # Route based on path
            if path == '/api/index' or path == '/api/health':
                self.handle_health()
            elif path == '/api/about/info':
                self.handle_about_info()
            elif path == '/api/skills':
                self.handle_skills()
            elif path == '/api/projects':
                self.handle_projects()
            elif path == '/api/experience':
                self.handle_experience()
            else:
                self.send_error_response(404, "Endpoint not found")
                
        except Exception as e:
            self.send_error_response(500, f"Server error: {str(e)}")
    
    def do_POST(self):
        try:
            parsed_path = urllib.parse.urlparse(self.path)
            path = parsed_path.path
            
            if path == '/api/auth/login':
                self.handle_login()
            else:
                self.send_error_response(404, "Endpoint not found")
                
        except Exception as e:
            self.send_error_response(500, f"Server error: {str(e)}")
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
    
    def handle_health(self):
        response = {
            "status": "healthy",
            "message": "Portfolio API is running on Vercel",
            "version": "1.0.0",
            "timestamp": time.time(),
            "endpoints": {
                "GET /api/health": "Health check",
                "POST /api/auth/login": "Admin login",
                "GET /api/about/info": "About information",
                "GET /api/skills": "Skills data",
                "GET /api/projects": "Projects data",
                "GET /api/experience": "Experience data"
            }
        }
        self.send_success_response(response)
    
    def handle_login(self):
        try:
            # Parse request body
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length == 0:
                self.send_error_response(400, "Request body required")
                return
                
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            username = data.get('username')
            password = data.get('password')
            
            if not username or not password:
                self.send_error_response(400, "Username and password required")
                return
            
            # Simple authentication for demo
            admin_username = os.getenv("ADMIN_USERNAME", "zahid")
            admin_password = os.getenv("ADMIN_PASSWORD", "zahid@786")
            
            if username == admin_username and password == admin_password:
                # Generate simple token
                token = self.generate_simple_token(username)
                self.send_success_response({
                    "access_token": token,
                    "token_type": "bearer",
                    "message": "Login successful",
                    "user": username
                })
            else:
                self.send_error_response(401, "Invalid credentials")
                
        except json.JSONDecodeError:
            self.send_error_response(400, "Invalid JSON in request body")
        except Exception as e:
            self.send_error_response(500, f"Login error: {str(e)}")
    
    def handle_about_info(self):
        about_info = {
            "id": 1,
            "title": "AI Engineer & Machine Learning Specialist",
            "description": "Passionate AI Engineer with expertise in machine learning, deep learning, and data science. I specialize in developing innovative AI solutions, building predictive models, and integrating cutting-edge AI technologies into business applications to drive digital transformation.",
            "profile_image": "/assets/zahid-profile.jpeg",
            "resume_url": "/resume.pdf",
            "location": "San Francisco, CA",
            "email": "zahid@example.com",
            "experience_years": "5+",
            "projects_completed": "50+",
            "ml_models_deployed": "25+",
            "success_rate": "95%",
            "created_at": "2024-01-01T00:00:00Z",
            "updated_at": "2024-01-01T00:00:00Z"
        }
        self.send_success_response(about_info)
    
    def handle_skills(self):
        skills = [
            {
                "id": 1,
                "name": "Python",
                "category": "Programming Languages",
                "proficiency": 95,
                "years_experience": 5,
                "icon": "🐍",
                "description": "Advanced Python programming for AI/ML applications"
            },
            {
                "id": 2,
                "name": "Machine Learning",
                "category": "AI/ML",
                "proficiency": 90,
                "years_experience": 4,
                "icon": "🤖",
                "description": "Scikit-learn, pandas, numpy for ML model development"
            },
            {
                "id": 3,
                "name": "Deep Learning",
                "category": "AI/ML",
                "proficiency": 88,
                "years_experience": 3,
                "icon": "🧠",
                "description": "TensorFlow, PyTorch for neural network development"
            },
            {
                "id": 4,
                "name": "React",
                "category": "Frontend",
                "proficiency": 85,
                "years_experience": 3,
                "icon": "⚛️",
                "description": "Modern React with TypeScript and hooks"
            },
            {
                "id": 5,
                "name": "FastAPI",
                "category": "Backend",
                "proficiency": 82,
                "years_experience": 2,
                "icon": "🚀",
                "description": "High-performance Python web framework"
            },
            {
                "id": 6,
                "name": "TensorFlow",
                "category": "AI/ML",
                "proficiency": 87,
                "years_experience": 3,
                "icon": "🔥",
                "description": "Deep learning framework for neural networks"
            },
            {
                "id": 7,
                "name": "PostgreSQL",
                "category": "Database",
                "proficiency": 80,
                "years_experience": 4,
                "icon": "🐘",
                "description": "Advanced database design and optimization"
            },
            {
                "id": 8,
                "name": "Docker",
                "category": "DevOps",
                "proficiency": 75,
                "years_experience": 2,
                "icon": "🐳",
                "description": "Containerization and deployment"
            }
        ]
        self.send_success_response(skills)
    
    def handle_projects(self):
        projects = [
            {
                "id": 1,
                "title": "AI-Powered Analytics Platform",
                "description": "Comprehensive analytics platform leveraging machine learning for predictive insights, real-time data processing, and automated reporting systems.",
                "image": "/projects/analytics-platform.jpg",
                "technologies": ["Python", "TensorFlow", "React", "PostgreSQL", "Docker"],
                "github_url": "https://github.com/zahid111777/analytics-platform",
                "live_url": "https://analytics-platform.demo.com",
                "status": "completed",
                "featured": True,
                "created_at": "2024-01-15T00:00:00Z"
            },
            {
                "id": 2,
                "title": "Smart Recommendation Engine",
                "description": "Machine learning-based recommendation system using collaborative filtering and deep learning techniques for personalized user experiences.",
                "image": "/projects/recommendation-engine.jpg",
                "technologies": ["Python", "PyTorch", "FastAPI", "Redis", "AWS"],
                "github_url": "https://github.com/zahid111777/recommendation-engine",
                "live_url": "https://recommendations.demo.com",
                "status": "completed",
                "featured": True,
                "created_at": "2024-02-20T00:00:00Z"
            },
            {
                "id": 3,
                "title": "Computer Vision Quality Control",
                "description": "Automated quality control system using computer vision and deep learning for manufacturing process optimization and defect detection.",
                "image": "/projects/quality-control.jpg",
                "technologies": ["Python", "OpenCV", "YOLO", "Flask", "MongoDB"],
                "github_url": "https://github.com/zahid111777/cv-quality-control",
                "live_url": "https://quality-control.demo.com",
                "status": "completed",
                "featured": True,
                "created_at": "2024-03-10T00:00:00Z"
            }
        ]
        self.send_success_response(projects)
    
    def handle_experience(self):
        experiences = [
            {
                "id": 1,
                "title": "Senior AI Engineer",
                "company": "TechCorp Solutions",
                "location": "San Francisco, CA",
                "start_date": "2022-01-01",
                "end_date": None,
                "is_current": True,
                "description": "Leading AI/ML initiatives, developing cutting-edge machine learning models, and architecting scalable AI solutions for enterprise clients.",
                "responsibilities": [
                    "Led development of production ML models serving 1M+ users",
                    "Architected end-to-end ML pipelines using MLOps best practices",
                    "Mentored junior engineers and established ML engineering standards",
                    "Collaborated with product teams to integrate AI features"
                ],
                "technologies": ["Python", "TensorFlow", "PyTorch", "AWS", "Docker", "Kubernetes"],
                "achievements": [
                    "Improved model accuracy by 25% through advanced feature engineering",
                    "Reduced inference latency by 40% through model optimization",
                    "Successfully deployed 5+ ML models to production"
                ]
            },
            {
                "id": 2,
                "title": "Machine Learning Engineer",
                "company": "DataTech Inc",
                "location": "New York, NY",
                "start_date": "2020-06-01",
                "end_date": "2021-12-31",
                "is_current": False,
                "description": "Developed and deployed machine learning models for customer analytics and business intelligence solutions.",
                "responsibilities": [
                    "Built predictive models for customer behavior analysis",
                    "Implemented data pipelines for real-time ML inference",
                    "Collaborated with data scientists on model deployment",
                    "Optimized existing ML workflows for performance"
                ],
                "technologies": ["Python", "Scikit-learn", "Apache Spark", "PostgreSQL", "Jenkins"],
                "achievements": [
                    "Increased customer retention prediction accuracy by 30%",
                    "Automated data preprocessing reducing manual work by 60%",
                    "Built ML monitoring system improving model reliability"
                ]
            }
        ]
        self.send_success_response(experiences)
    
    def generate_simple_token(self, username):
        secret_key = os.getenv("SECRET_KEY", "your-super-secret-key-change-this-in-production-please")
        payload = f"{username}:{int(time.time() + 1800)}"  # 30 minutes
        signature = hmac.new(
            secret_key.encode(), 
            payload.encode(), 
            hashlib.sha256
        ).hexdigest()
        token = base64.b64encode(f"{payload}:{signature}".encode()).decode()
        return token
    
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