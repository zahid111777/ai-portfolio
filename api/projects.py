from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Projects data
PROJECTS_DATA = [
    {
        "id": 1,
        "title": "Dynamic Portfolio Website",
        "description": "A full-stack portfolio website with admin panel for content management. Built with React frontend, FastAPI backend, and deployed on Vercel.",
        "technologies": "React, FastAPI, SQLAlchemy, Vercel",
        "github_url": "https://github.com/zahid111777/ai-portfolio",
        "live_url": "https://zahidrashid.vercel.app",
        "image": "projects/portfolio.jpg"
    },
    {
        "id": 2,
        "title": "Task Management App",
        "description": "A responsive task management application with drag-and-drop functionality and real-time updates.",
        "technologies": "React, Node.js, MongoDB",
        "github_url": "https://github.com/username/task-app",
        "live_url": "https://task-app.vercel.app",
        "image": "projects/task-app.jpg"
    }
]

@app.get("/")
async def get_projects():
    return PROJECTS_DATA

@app.post("/")
async def create_project(project: dict):
    new_id = max([p["id"] for p in PROJECTS_DATA], default=0) + 1
    project["id"] = new_id
    PROJECTS_DATA.append(project)
    return project

def handler(request):
    return app(request)