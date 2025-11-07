from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Skills data
SKILLS_DATA = [
    {"id": 1, "name": "JavaScript", "category": "Programming", "proficiency": 90},
    {"id": 2, "name": "Python", "category": "Programming", "proficiency": 85},
    {"id": 3, "name": "React", "category": "Frontend", "proficiency": 88},
    {"id": 4, "name": "FastAPI", "category": "Backend", "proficiency": 82},
    {"id": 5, "name": "HTML/CSS", "category": "Frontend", "proficiency": 92},
    {"id": 6, "name": "Node.js", "category": "Backend", "proficiency": 80}
]

@app.get("/")
async def get_skills():
    return SKILLS_DATA

@app.post("/")
async def create_skill(skill: dict):
    new_id = max([s["id"] for s in SKILLS_DATA], default=0) + 1
    skill["id"] = new_id
    SKILLS_DATA.append(skill)
    return skill

def handler(request):
    return app(request)