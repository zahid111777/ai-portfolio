from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # Sample experience data
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
                },
                {
                    "id": 3,
                    "title": "AI Research Intern",
                    "company": "Innovation Labs",
                    "location": "Boston, MA",
                    "start_date": "2019-06-01",
                    "end_date": "2020-05-31",
                    "is_current": False,
                    "description": "Research and development of novel AI algorithms and their applications in computer vision and natural language processing.",
                    "responsibilities": [
                        "Conducted research on deep learning architectures",
                        "Implemented and tested novel neural network models",
                        "Published research findings in internal technical reports",
                        "Collaborated with PhD researchers on cutting-edge projects"
                    ],
                    "technologies": ["Python", "TensorFlow", "OpenCV", "NLTK", "Jupyter"],
                    "achievements": [
                        "Developed novel CNN architecture for image classification",
                        "Achieved 15% improvement in NLP model performance",
                        "Contributed to 2 research publications"
                    ]
                }
            ]
            
            self.send_success_response(experiences)
                
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