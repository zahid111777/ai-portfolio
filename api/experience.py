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

# Experience data
EXPERIENCE_DATA = [
    {
        "id": 1,
        "title": "Full Stack Developer",
        "company": "Tech Company",
        "location": "Remote",
        "start_date": "2023-01-01",
        "end_date": "Present",
        "description": "Developing modern web applications using React, FastAPI, and cloud technologies. Working on portfolio management systems and dynamic web applications."
    },
    {
        "id": 2,
        "title": "Frontend Developer",
        "company": "Previous Company",
        "location": "City, Country",
        "start_date": "2022-01-01",
        "end_date": "2022-12-31",
        "description": "Focused on React development and user interface design. Created responsive web applications with modern CSS frameworks."
    }
]

@app.get("/")
async def get_experience():
    return EXPERIENCE_DATA

@app.post("/")
async def create_experience(experience: dict):
    new_id = max([e["id"] for e in EXPERIENCE_DATA], default=0) + 1
    experience["id"] = new_id
    EXPERIENCE_DATA.append(experience)
    return experience

def handler(request):
    return app(request)