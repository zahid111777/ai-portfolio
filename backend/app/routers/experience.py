from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..auth import get_current_active_user
from ..database import get_db
from ..models import (
    Experience as ExperienceModel, 
    Responsibility as ResponsibilityModel,
    Achievement as AchievementModel,
    ExperienceProject as ExperienceProjectModel,
    ExperienceTechnology as ExperienceTechnologyModel,
    User
)
from ..schemas import Experience, ExperienceCreate, ExperienceUpdate

router = APIRouter(prefix="/experience", tags=["Experience"])

@router.get("", response_model=List[Experience])
async def get_experiences(db: Session = Depends(get_db)):
    """Get all experiences."""
    experiences = db.query(ExperienceModel).order_by(ExperienceModel.order_index.desc()).all()
    return experiences

@router.get("/{experience_id}", response_model=Experience)
async def get_experience(experience_id: int, db: Session = Depends(get_db)):
    """Get experience by ID."""
    experience = db.query(ExperienceModel).filter(ExperienceModel.id == experience_id).first()
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    return experience

@router.post("", response_model=Experience)
async def create_experience(
    experience: ExperienceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new experience."""
    # Create experience record
    experience_data = experience.dict(exclude={'responsibilities', 'achievements', 'projects', 'technologies'})
    db_experience = ExperienceModel(**experience_data)
    db.add(db_experience)
    db.commit()
    db.refresh(db_experience)
    
    # Add responsibilities
    for resp in experience.responsibilities:
        db_responsibility = ResponsibilityModel(**resp.dict(), experience_id=db_experience.id)
        db.add(db_responsibility)
    
    # Add achievements
    for achievement in experience.achievements:
        db_achievement = AchievementModel(**achievement.dict(), experience_id=db_experience.id)
        db.add(db_achievement)
    
    # Add projects
    for project in experience.projects:
        db_project = ExperienceProjectModel(**project.dict(), experience_id=db_experience.id)
        db.add(db_project)
    
    # Add technologies
    for tech in experience.technologies:
        db_tech = ExperienceTechnologyModel(**tech.dict(), experience_id=db_experience.id)
        db.add(db_tech)
    
    db.commit()
    db.refresh(db_experience)
    return db_experience

@router.put("/{experience_id}", response_model=Experience)
async def update_experience(
    experience_id: int,
    experience: ExperienceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update an experience."""
    db_experience = db.query(ExperienceModel).filter(ExperienceModel.id == experience_id).first()
    if not db_experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    # Update basic fields
    update_data = experience.dict(exclude_unset=True, exclude={'responsibilities', 'achievements', 'projects', 'technologies'})
    for field, value in update_data.items():
        setattr(db_experience, field, value)
    
    # Update related data if provided
    if experience.responsibilities is not None:
        # Delete existing responsibilities
        db.query(ResponsibilityModel).filter(ResponsibilityModel.experience_id == experience_id).delete()
        # Add new responsibilities
        for resp in experience.responsibilities:
            db_responsibility = ResponsibilityModel(**resp.dict(), experience_id=experience_id)
            db.add(db_responsibility)
    
    if experience.achievements is not None:
        # Delete existing achievements
        db.query(AchievementModel).filter(AchievementModel.experience_id == experience_id).delete()
        # Add new achievements
        for achievement in experience.achievements:
            db_achievement = AchievementModel(**achievement.dict(), experience_id=experience_id)
            db.add(db_achievement)
    
    if experience.projects is not None:
        # Delete existing projects
        db.query(ExperienceProjectModel).filter(ExperienceProjectModel.experience_id == experience_id).delete()
        # Add new projects
        for project in experience.projects:
            db_project = ExperienceProjectModel(**project.dict(), experience_id=experience_id)
            db.add(db_project)
    
    if experience.technologies is not None:
        # Delete existing technologies
        db.query(ExperienceTechnologyModel).filter(ExperienceTechnologyModel.experience_id == experience_id).delete()
        # Add new technologies
        for tech in experience.technologies:
            db_tech = ExperienceTechnologyModel(**tech.dict(), experience_id=experience_id)
            db.add(db_tech)
    
    db.commit()
    db.refresh(db_experience)
    return db_experience

@router.delete("/{experience_id}")
async def delete_experience(
    experience_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete an experience."""
    db_experience = db.query(ExperienceModel).filter(ExperienceModel.id == experience_id).first()
    if not db_experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    db.delete(db_experience)
    db.commit()
    return {"message": "Experience deleted successfully"}