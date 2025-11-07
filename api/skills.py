from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # Sample skills data
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
                }
            ]
            
            self.send_success_response(skills)
                
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