from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # Sample projects data
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
                
        except Exception as e:
            self.send_error_response(500, f"Server error: {str(e)}")
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
    
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