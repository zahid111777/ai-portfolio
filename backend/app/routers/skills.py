from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..auth import get_current_active_user
from ..database import get_db
from ..models import Skill as SkillModel, User
from ..schemas import Skill, SkillCreate, SkillUpdate

router = APIRouter(prefix="/skills", tags=["Skills"])

@router.get("", response_model=List[Skill])
async def get_skills(category: str = None, db: Session = Depends(get_db)):
    """Get all skills, optionally filtered by category."""
    query = db.query(SkillModel)
    if category:
        query = query.filter(SkillModel.category == category)
    skills = query.order_by(SkillModel.order_index, SkillModel.name).all()
    return skills

@router.get("/grouped")
async def get_skills_grouped(db: Session = Depends(get_db)):
    """Get all skills grouped by category for frontend display."""
    skills = db.query(SkillModel).order_by(SkillModel.order_index, SkillModel.name).all()
    
    # Group skills by category
    categories_dict = {}
    for skill in skills:
        if skill.category not in categories_dict:
            categories_dict[skill.category] = []
        categories_dict[skill.category].append({
            "name": skill.name,
            "level": skill.proficiency,
            "id": skill.id
        })
    
    # Format as array of category objects
    result = []
    for cat_name, cat_skills in categories_dict.items():
        result.append({
            "category": cat_name,
            "skills": cat_skills
        })
    
    return result

@router.get("/categories")
async def get_skill_categories(db: Session = Depends(get_db)):
    """Get all skill categories/specializations as a simple array."""
    categories = db.query(SkillModel.category).distinct().all()
    return [category[0] for category in categories]

@router.get("/{skill_id}", response_model=Skill)
async def get_skill(skill_id: int, db: Session = Depends(get_db)):
    """Get skill by ID."""
    skill = db.query(SkillModel).filter(SkillModel.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return skill

@router.post("", response_model=Skill)
async def create_skill(
    skill: SkillCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new skill."""
    db_skill = SkillModel(**skill.dict())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

@router.put("/{skill_id}", response_model=Skill)
async def update_skill(
    skill_id: int,
    skill: SkillUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update a skill."""
    db_skill = db.query(SkillModel).filter(SkillModel.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    update_data = skill.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_skill, field, value)
    
    db.commit()
    db.refresh(db_skill)
    return db_skill

@router.delete("/{skill_id}")
async def delete_skill(
    skill_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a skill."""
    db_skill = db.query(SkillModel).filter(SkillModel.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    db.delete(db_skill)
    db.commit()
    return {"message": "Skill deleted successfully"}