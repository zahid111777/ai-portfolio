from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    # For Vercel deployment, use in-memory SQLite or remote database
    database_url: str = os.getenv("DATABASE_URL", 
        "sqlite:///:memory:" if os.getenv("VERCEL") else "sqlite:///./portfolio.db"
    )
    secret_key: str = os.getenv("SECRET_KEY", "your-super-secret-key-change-this-in-production-please")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    admin_username: str = os.getenv("ADMIN_USERNAME", "admin")
    admin_password: str = os.getenv("ADMIN_PASSWORD", "admin123")
    frontend_url: str = os.getenv("FRONTEND_URL", "http://localhost:3000")
    admin_url: str = os.getenv("ADMIN_URL", "http://localhost:3001")
    upload_dir: str = os.getenv("UPLOAD_DIR", "/tmp/uploads" if os.getenv("VERCEL") else "./uploads")
    max_file_size: int = int(os.getenv("MAX_FILE_SIZE", "5242880"))

    class Config:
        env_file = ".env"

settings = Settings()