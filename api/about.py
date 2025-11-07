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

# Portfolio about data
ABOUT_DATA = {
    "name": "Zahid Rashid",
    "title": "Full Stack Developer",
    "description": "Passionate developer with experience in modern web technologies including React, FastAPI, and cloud deployments.",
    "email": "zahid@example.com",
    "phone": "+1234567890",
    "location": "Your Location",
    "profile_image": "assets/profile.jpg"
}

@app.get("/")
async def get_about():
    return ABOUT_DATA

@app.put("/")
async def update_about(data: dict):
    ABOUT_DATA.update(data)
    return ABOUT_DATA

def handler(request):
    return app(request)