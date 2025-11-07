from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..auth import get_current_active_user
from ..database import get_db
from ..models import (
    Project as ProjectModel,
    ProjectTechnology as ProjectTechnologyModel,
    ProjectFeature as ProjectFeatureModel,
    ProjectMetric as ProjectMetricModel,
    User
)
from ..schemas import Project, ProjectCreate, ProjectUpdate

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("", response_model=List[Project])
async def get_projects(featured: bool = None, db: Session = Depends(get_db)):
    """Get all projects."""
    query = db.query(ProjectModel)
    if featured is not None:
        query = query.filter(ProjectModel.is_featured == featured)
    projects = query.order_by(ProjectModel.order_index).all()
    return projects

@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: int, db: Session = Depends(get_db)):
    """Get project by ID."""
    project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.post("", response_model=Project)
async def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new project."""
    # Create project record
    project_data = project.dict(exclude={'technologies', 'features', 'metrics'})
    db_project = ProjectModel(**project_data)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    
    # Add technologies
    for tech in project.technologies:
        db_tech = ProjectTechnologyModel(**tech.dict(), project_id=db_project.id)
        db.add(db_tech)
    
    # Add features
    for feature in project.features:
        db_feature = ProjectFeatureModel(**feature.dict(), project_id=db_project.id)
        db.add(db_feature)
    
    # Add metrics
    for metric in project.metrics:
        db_metric = ProjectMetricModel(**metric.dict(), project_id=db_project.id)
        db.add(db_metric)
    
    db.commit()
    db.refresh(db_project)
    return db_project

@router.put("/{project_id}", response_model=Project)
async def update_project(
    project_id: int,
    project: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update a project."""
    db_project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Update basic fields
    update_data = project.dict(exclude_unset=True, exclude={'technologies', 'features', 'metrics'})
    for field, value in update_data.items():
        setattr(db_project, field, value)
    
    # Update related data if provided
    if project.technologies is not None:
        # Delete existing technologies
        db.query(ProjectTechnologyModel).filter(ProjectTechnologyModel.project_id == project_id).delete()
        # Add new technologies
        for tech in project.technologies:
            db_tech = ProjectTechnologyModel(**tech.dict(), project_id=project_id)
            db.add(db_tech)
    
    if project.features is not None:
        # Delete existing features
        db.query(ProjectFeatureModel).filter(ProjectFeatureModel.project_id == project_id).delete()
        # Add new features
        for feature in project.features:
            db_feature = ProjectFeatureModel(**feature.dict(), project_id=project_id)
            db.add(db_feature)
    
    if project.metrics is not None:
        # Delete existing metrics
        db.query(ProjectMetricModel).filter(ProjectMetricModel.project_id == project_id).delete()
        # Add new metrics
        for metric in project.metrics:
            db_metric = ProjectMetricModel(**metric.dict(), project_id=project_id)
            db.add(db_metric)
    
    db.commit()
    db.refresh(db_project)
    return db_project

@router.delete("/{project_id}")
async def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a project."""
    db_project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db.delete(db_project)
    db.commit()
    return {"message": "Project deleted successfully"}