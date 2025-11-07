from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    hashed_password = Column(String(100), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class AboutInfo(Base):
    __tablename__ = "about_info"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    profile_image = Column(String(255))
    years_experience = Column(Integer, default=0)
    ai_projects = Column(Integer, default=0)
    ml_models = Column(Integer, default=0)
    accuracy_rate = Column(Integer, default=0)
    cv_url = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Highlight(Base):
    __tablename__ = "highlights"
    
    id = Column(Integer, primary_key=True, index=True)
    icon = Column(String(10), nullable=False)
    text = Column(String(200), nullable=False)
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Experience(Base):
    __tablename__ = "experiences"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    company = Column(String(200), nullable=False)
    duration = Column(String(100), nullable=False)
    location = Column(String(200), nullable=False)
    employment_type = Column(String(50), nullable=False)
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    responsibilities = relationship("Responsibility", back_populates="experience", cascade="all, delete-orphan")
    achievements = relationship("Achievement", back_populates="experience", cascade="all, delete-orphan")
    projects = relationship("ExperienceProject", back_populates="experience", cascade="all, delete-orphan")
    technologies = relationship("ExperienceTechnology", back_populates="experience", cascade="all, delete-orphan")

class Responsibility(Base):
    __tablename__ = "responsibilities"
    
    id = Column(Integer, primary_key=True, index=True)
    experience_id = Column(Integer, ForeignKey("experiences.id"), nullable=False)
    description = Column(Text, nullable=False)
    order_index = Column(Integer, default=0)
    
    experience = relationship("Experience", back_populates="responsibilities")

class Achievement(Base):
    __tablename__ = "achievements"
    
    id = Column(Integer, primary_key=True, index=True)
    experience_id = Column(Integer, ForeignKey("experiences.id"), nullable=False)
    description = Column(Text, nullable=False)
    order_index = Column(Integer, default=0)
    
    experience = relationship("Experience", back_populates="achievements")

class ExperienceProject(Base):
    __tablename__ = "experience_projects"
    
    id = Column(Integer, primary_key=True, index=True)
    experience_id = Column(Integer, ForeignKey("experiences.id"), nullable=False)
    name = Column(String(200), nullable=False)
    description = Column(Text)
    order_index = Column(Integer, default=0)
    
    experience = relationship("Experience", back_populates="projects")

class ExperienceTechnology(Base):
    __tablename__ = "experience_technologies"
    
    id = Column(Integer, primary_key=True, index=True)
    experience_id = Column(Integer, ForeignKey("experiences.id"), nullable=False)
    name = Column(String(100), nullable=False)
    
    experience = relationship("Experience", back_populates="technologies")

class Skill(Base):
    __tablename__ = "skills"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(100), nullable=False)
    proficiency = Column(Integer, default=0)  # 0-100
    icon = Column(String(100))
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    image = Column(String(255))
    github_url = Column(String(255))
    live_url = Column(String(255))
    order_index = Column(Integer, default=0)
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    technologies = relationship("ProjectTechnology", back_populates="project", cascade="all, delete-orphan")
    features = relationship("ProjectFeature", back_populates="project", cascade="all, delete-orphan")
    metrics = relationship("ProjectMetric", back_populates="project", cascade="all, delete-orphan")

class ProjectTechnology(Base):
    __tablename__ = "project_technologies"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    name = Column(String(100), nullable=False)
    
    project = relationship("Project", back_populates="technologies")

class ProjectFeature(Base):
    __tablename__ = "project_features"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    description = Column(Text, nullable=False)
    order_index = Column(Integer, default=0)
    
    project = relationship("Project", back_populates="features")

class ProjectMetric(Base):
    __tablename__ = "project_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    description = Column(Text, nullable=False)
    order_index = Column(Integer, default=0)
    
    project = relationship("Project", back_populates="metrics")

class ContactInfo(Base):
    __tablename__ = "contact_info"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable=False)
    phone = Column(String(50))
    location = Column(String(200))
    linkedin_url = Column(String(255))
    github_url = Column(String(255))
    twitter_url = Column(String(255))
    website_url = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(255), nullable=False)
    subject = Column(String(300))
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())