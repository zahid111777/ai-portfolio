import os
import shutil
import time
from typing import List
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from ..auth import get_current_active_user
from ..config import settings
from ..database import get_db
from ..models import User

router = APIRouter(prefix="/upload", tags=["File Upload"])

# Ensure upload directory exists
os.makedirs(settings.upload_dir, exist_ok=True)

ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf'}

def is_allowed_file(filename: str) -> bool:
    """Check if file extension is allowed."""
    return any(filename.lower().endswith(ext) for ext in ALLOWED_EXTENSIONS)

@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_active_user)
):
    """Upload an image file."""
    if not is_allowed_file(file.filename):
        raise HTTPException(
            status_code=400,
            detail=f"File type not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    # Check file size
    if file.size > settings.max_file_size:
        raise HTTPException(
            status_code=400,
            detail=f"File size too large. Maximum size: {settings.max_file_size / 1024 / 1024:.1f}MB"
        )
    
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{int(time.time())}_{file.filename}"
    file_path = os.path.join(settings.upload_dir, unique_filename)
    
    # Save file
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")
    
    # Return file URL
    file_url = f"/uploads/{unique_filename}"
    return {
        "filename": unique_filename,
        "url": file_url,
        "size": file.size,
        "content_type": file.content_type
    }

@router.delete("/files/{filename}")
async def delete_file(
    filename: str,
    current_user: User = Depends(get_current_active_user)
):
    """Delete an uploaded file."""
    file_path = os.path.join(settings.upload_dir, filename)
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    try:
        os.remove(file_path)
        return {"message": "File deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete file: {str(e)}")

@router.get("/files")
async def list_files(
    current_user: User = Depends(get_current_active_user)
):
    """List all uploaded files."""
    try:
        files = []
        for filename in os.listdir(settings.upload_dir):
            file_path = os.path.join(settings.upload_dir, filename)
            if os.path.isfile(file_path):
                stat = os.stat(file_path)
                files.append({
                    "filename": filename,
                    "url": f"/uploads/{filename}",
                    "size": stat.st_size,
                    "created_at": stat.st_ctime
                })
        return files
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list files: {str(e)}")