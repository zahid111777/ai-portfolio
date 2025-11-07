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

# Simple admin credentials
ADMIN_USER = {"username": "admin", "password": "admin123"}

@app.post("/")
async def login(credentials: dict):
    username = credentials.get("username")
    password = credentials.get("password")
    
    if username == ADMIN_USER["username"] and password == ADMIN_USER["password"]:
        return {"access_token": "valid_token", "token_type": "bearer"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

def handler(request):
    return app(request)