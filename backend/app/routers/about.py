from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..auth import get_current_active_user
from ..database import get_db
from ..models import AboutInfo as AboutInfoModel, Highlight as HighlightModel, User
from ..schemas import AboutInfo, AboutInfoCreate, AboutInfoUpdate, Highlight, HighlightCreate

router = APIRouter(prefix="/about", tags=["About"])

@router.get("/info", response_model=AboutInfo)
async def get_about_info(db: Session = Depends(get_db)):
    """Get about information."""
    about_info = db.query(AboutInfoModel).first()
    if not about_info:
        raise HTTPException(status_code=404, detail="About information not found")
    return about_info

@router.post("/info", response_model=AboutInfo)
async def create_about_info(
    about_info: AboutInfoCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create about information."""
    # Check if about info already exists
    existing_info = db.query(AboutInfoModel).first()
    if existing_info:
        raise HTTPException(status_code=400, detail="About information already exists. Use PUT to update.")
    
    db_about_info = AboutInfoModel(**about_info.dict())
    db.add(db_about_info)
    db.commit()
    db.refresh(db_about_info)
    return db_about_info

@router.put("/info", response_model=AboutInfo)
async def update_about_info(
    about_info: AboutInfoUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update about information."""
    db_about_info = db.query(AboutInfoModel).first()
    if not db_about_info:
        raise HTTPException(status_code=404, detail="About information not found")
    
    update_data = about_info.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_about_info, field, value)
    
    db.commit()
    db.refresh(db_about_info)
    return db_about_info

@router.get("/highlights", response_model=List[Highlight])
async def get_highlights(db: Session = Depends(get_db)):
    """Get all highlights."""
    highlights = db.query(HighlightModel).order_by(HighlightModel.order_index).all()
    return highlights

@router.post("/highlights", response_model=Highlight)
async def create_highlight(
    highlight: HighlightCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new highlight."""
    db_highlight = HighlightModel(**highlight.dict())
    db.add(db_highlight)
    db.commit()
    db.refresh(db_highlight)
    return db_highlight

@router.put("/highlights/{highlight_id}", response_model=Highlight)
async def update_highlight(
    highlight_id: int,
    highlight: HighlightCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update a highlight."""
    db_highlight = db.query(HighlightModel).filter(HighlightModel.id == highlight_id).first()
    if not db_highlight:
        raise HTTPException(status_code=404, detail="Highlight not found")
    
    for field, value in highlight.dict().items():
        setattr(db_highlight, field, value)
    
    db.commit()
    db.refresh(db_highlight)
    return db_highlight

@router.delete("/highlights/{highlight_id}")
async def delete_highlight(
    highlight_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a highlight."""
    db_highlight = db.query(HighlightModel).filter(HighlightModel.id == highlight_id).first()
    if not db_highlight:
        raise HTTPException(status_code=404, detail="Highlight not found")
    
    db.delete(db_highlight)
    db.commit()
    return {"message": "Highlight deleted successfully"}