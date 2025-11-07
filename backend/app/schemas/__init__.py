from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# About schemas
class HighlightBase(BaseModel):
    icon: str
    text: str
    order_index: Optional[int] = 0

class HighlightCreate(HighlightBase):
    pass

class Highlight(HighlightBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class AboutInfoBase(BaseModel):
    name: str
    title: str
    description: str
    profile_image: Optional[str] = None
    years_experience: Optional[int] = 0
    ai_projects: Optional[int] = 0
    ml_models: Optional[int] = 0
    accuracy_rate: Optional[int] = 0
    cv_url: Optional[str] = None

class AboutInfoCreate(AboutInfoBase):
    pass

class AboutInfoUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    profile_image: Optional[str] = None
    years_experience: Optional[int] = None
    ai_projects: Optional[int] = None
    ml_models: Optional[int] = None
    accuracy_rate: Optional[int] = None
    cv_url: Optional[str] = None

class AboutInfo(AboutInfoBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Experience schemas
class ResponsibilityBase(BaseModel):
    description: str
    order_index: Optional[int] = 0

class ResponsibilityCreate(ResponsibilityBase):
    pass

class Responsibility(ResponsibilityBase):
    id: int
    
    class Config:
        from_attributes = True

class AchievementBase(BaseModel):
    description: str
    order_index: Optional[int] = 0

class AchievementCreate(AchievementBase):
    pass

class Achievement(AchievementBase):
    id: int
    
    class Config:
        from_attributes = True

class ExperienceProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    order_index: Optional[int] = 0

class ExperienceProjectCreate(ExperienceProjectBase):
    pass

class ExperienceProject(ExperienceProjectBase):
    id: int
    
    class Config:
        from_attributes = True

class ExperienceTechnologyBase(BaseModel):
    name: str

class ExperienceTechnologyCreate(ExperienceTechnologyBase):
    pass

class ExperienceTechnology(ExperienceTechnologyBase):
    id: int
    
    class Config:
        from_attributes = True

class ExperienceBase(BaseModel):
    title: str
    company: str
    duration: str
    location: str
    employment_type: str
    order_index: Optional[int] = 0

class ExperienceCreate(ExperienceBase):
    responsibilities: List[ResponsibilityCreate] = []
    achievements: List[AchievementCreate] = []
    projects: List[ExperienceProjectCreate] = []
    technologies: List[ExperienceTechnologyCreate] = []

class ExperienceUpdate(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    duration: Optional[str] = None
    location: Optional[str] = None
    employment_type: Optional[str] = None
    order_index: Optional[int] = None
    responsibilities: Optional[List[ResponsibilityCreate]] = None
    achievements: Optional[List[AchievementCreate]] = None
    projects: Optional[List[ExperienceProjectCreate]] = None
    technologies: Optional[List[ExperienceTechnologyCreate]] = None

class Experience(ExperienceBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    responsibilities: List[Responsibility] = []
    achievements: List[Achievement] = []
    projects: List[ExperienceProject] = []
    technologies: List[ExperienceTechnology] = []
    
    class Config:
        from_attributes = True

# Skill schemas
class SkillBase(BaseModel):
    name: str
    category: str
    proficiency: Optional[int] = 0
    icon: Optional[str] = None
    order_index: Optional[int] = 0

class SkillCreate(SkillBase):
    pass

class SkillUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    proficiency: Optional[int] = None
    icon: Optional[str] = None
    order_index: Optional[int] = None

class Skill(SkillBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Project schemas
class ProjectTechnologyBase(BaseModel):
    name: str

class ProjectTechnologyCreate(ProjectTechnologyBase):
    pass

class ProjectTechnology(ProjectTechnologyBase):
    id: int
    
    class Config:
        from_attributes = True

class ProjectFeatureBase(BaseModel):
    description: str
    order_index: Optional[int] = 0

class ProjectFeatureCreate(ProjectFeatureBase):
    pass

class ProjectFeature(ProjectFeatureBase):
    id: int
    
    class Config:
        from_attributes = True

class ProjectMetricBase(BaseModel):
    description: str
    order_index: Optional[int] = 0

class ProjectMetricCreate(ProjectMetricBase):
    pass

class ProjectMetric(ProjectMetricBase):
    id: int
    
    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    title: str
    description: str
    image: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    order_index: Optional[int] = 0
    is_featured: Optional[bool] = False

class ProjectCreate(ProjectBase):
    technologies: List[ProjectTechnologyCreate] = []
    features: List[ProjectFeatureCreate] = []
    metrics: List[ProjectMetricCreate] = []

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    order_index: Optional[int] = None
    is_featured: Optional[bool] = None
    technologies: Optional[List[ProjectTechnologyCreate]] = None
    features: Optional[List[ProjectFeatureCreate]] = None
    metrics: Optional[List[ProjectMetricCreate]] = None

class Project(ProjectBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    technologies: List[ProjectTechnology] = []
    features: List[ProjectFeature] = []
    metrics: List[ProjectMetric] = []
    
    class Config:
        from_attributes = True

# Contact schemas
class ContactInfoBase(BaseModel):
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    twitter_url: Optional[str] = None
    website_url: Optional[str] = None

class ContactInfoCreate(ContactInfoBase):
    pass

class ContactInfoUpdate(BaseModel):
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    twitter_url: Optional[str] = None
    website_url: Optional[str] = None

class ContactInfo(ContactInfoBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class ContactMessageBase(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessage(ContactMessageBase):
    id: int
    is_read: bool
    created_at: datetime
    
    class Config:
        from_attributes = True