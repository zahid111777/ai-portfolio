"""
Seed script to populate the database with initial portfolio data.
Run this script to add default data to your database.

Usage: python seed_data.py
"""

from app.database import SessionLocal, engine
from app.models import (
    Base, AboutInfo, Highlight, Experience, Responsibility,
    Achievement, ExperienceTechnology, ExperienceProject, Project, ProjectTechnology,
    ProjectFeature, ProjectMetric, Skill
)

def seed_database():
    """Populate database with initial data."""
    db = SessionLocal()
    
    try:
        # Create tables if they don't exist
        Base.metadata.create_all(bind=engine)
        
        # Check if data already exists
        existing_about = db.query(AboutInfo).first()
        if existing_about:
            print("Database already contains data. Skipping seed.")
            return
        
        print("Seeding database with initial data...")
        
        # 1. Create About Info
        about_info = AboutInfo(
            name="Zahid Rashid",
            title="AI Engineer & Machine Learning Specialist",
            description="I'm a passionate AI Engineer with expertise in machine learning, deep learning, and data science. I specialize in developing innovative AI solutions, building predictive models, and integrating cutting-edge AI technologies into business applications to drive digital transformation.",
            profile_image="/assets/zahid-profile.jpeg",  # Update this with actual uploaded image path
            years_experience=3,
            ai_projects=25,
            ml_models=50,
            accuracy_rate=98,
            cv_url="/resume.pdf"
        )
        db.add(about_info)
        db.flush()
        
        # 2. Create Highlights
        highlights = [
            Highlight(icon="🚀", text="Building the Future with AI", order_index=1),
            Highlight(icon="💡", text="Innovative Problem Solver", order_index=2),
            Highlight(icon="⚡", text="Performance Optimizer", order_index=3)
        ]
        db.add_all(highlights)
        
        # 3. Create Skills
        skills = [
            # AI/ML Frameworks
            Skill(name="TensorFlow", category="AI/ML Frameworks", proficiency=90, icon="🧠", order_index=1),
            Skill(name="PyTorch", category="AI/ML Frameworks", proficiency=85, icon="🔥", order_index=2),
            Skill(name="Scikit-learn", category="AI/ML Frameworks", proficiency=95, icon="📊", order_index=3),
            Skill(name="Keras", category="AI/ML Frameworks", proficiency=88, icon="🧪", order_index=4),
            Skill(name="Hugging Face", category="AI/ML Frameworks", proficiency=80, icon="🤗", order_index=5),
            
            # Programming Languages
            Skill(name="Python", category="Programming Languages", proficiency=95, icon="🐍", order_index=1),
            Skill(name="JavaScript", category="Programming Languages", proficiency=85, icon="📜", order_index=2),
            Skill(name="SQL", category="Programming Languages", proficiency=90, icon="🗄️", order_index=3),
            
            # Cloud & DevOps
            Skill(name="AWS", category="Cloud & DevOps", proficiency=85, icon="☁️", order_index=1),
            Skill(name="Docker", category="Cloud & DevOps", proficiency=80, icon="🐳", order_index=2),
            Skill(name="MLflow", category="Cloud & DevOps", proficiency=85, icon="📈", order_index=3),
            Skill(name="Git", category="Cloud & DevOps", proficiency=90, icon="🔀", order_index=4),
            
            # Data & Databases
            Skill(name="PostgreSQL", category="Data & Databases", proficiency=85, icon="🐘", order_index=1),
            Skill(name="MongoDB", category="Data & Databases", proficiency=80, icon="🍃", order_index=2),
        ]
        db.add_all(skills)
        
        # 4. Create Experiences
        # Experience 1: Senior AI Engineer
        exp1 = Experience(
            title="Senior AI Engineer",
            company="CareCloud",
            duration="Jan 2025 - Present",
            location="Bagh AJK, Pakistan",
            employment_type="Full-time",
            order_index=1
        )
        db.add(exp1)
        db.flush()
        
        exp1_responsibilities = [
            Responsibility(experience_id=exp1.id, description="Lead development of machine learning models for predictive analytics and business intelligence", order_index=1),
            Responsibility(experience_id=exp1.id, description="Architect and implement scalable AI solutions using TensorFlow, PyTorch, and cloud platforms", order_index=2),
            Responsibility(experience_id=exp1.id, description="Collaborate with cross-functional teams to integrate AI solutions into existing products", order_index=3),
            Responsibility(experience_id=exp1.id, description="Mentor junior developers and conduct technical workshops on AI/ML best practices", order_index=4),
        ]
        db.add_all(exp1_responsibilities)
        
        exp1_achievements = [
            Achievement(experience_id=exp1.id, description="Increased model accuracy by 25% through advanced optimization techniques", order_index=1),
            Achievement(experience_id=exp1.id, description="Reduced inference time by 40% through model optimization and deployment strategies", order_index=2),
            Achievement(experience_id=exp1.id, description="Led a team of 5 engineers in developing a real-time recommendation system", order_index=3),
            Achievement(experience_id=exp1.id, description="RCM automation", order_index=4),
        ]
        db.add_all(exp1_achievements)
        
        exp1_technologies = [
            ExperienceTechnology(experience_id=exp1.id, name="Python"),
            ExperienceTechnology(experience_id=exp1.id, name="TensorFlow"),
            ExperienceTechnology(experience_id=exp1.id, name="PyTorch"),
            ExperienceTechnology(experience_id=exp1.id, name="AWS"),
            ExperienceTechnology(experience_id=exp1.id, name="Docker"),
            ExperienceTechnology(experience_id=exp1.id, name="Langchain"),
            ExperienceTechnology(experience_id=exp1.id, name="LangGraph"),
            ExperienceTechnology(experience_id=exp1.id, name="RAG"),
        ]
        db.add_all(exp1_technologies)
        
        # Experience 2: AI/ML Engineer
        exp2 = Experience(
            title="AI/ML Engineer",
            company="CareCloud",
            duration="Jan 2024 - Dec 2024",
            location="Bagh AJK, Pakistan",
            employment_type="Full-time",
            order_index=2
        )
        db.add(exp2)
        db.flush()
        
        exp2_responsibilities = [
            Responsibility(experience_id=exp2.id, description="Developed end-to-end machine learning pipelines for data processing and model training", order_index=1),
            Responsibility(experience_id=exp2.id, description="Built computer vision models for image classification and object detection", order_index=2),
            Responsibility(experience_id=exp2.id, description="Implemented natural language processing solutions for text analysis", order_index=3),
        ]
        db.add_all(exp2_responsibilities)
        
        exp2_achievements = [
            Achievement(experience_id=exp2.id, description="Deployed 10+ ML models in production with 99.5% uptime", order_index=1),
            Achievement(experience_id=exp2.id, description="Improved data processing efficiency by 35% through pipeline optimization", order_index=2),
            Achievement(experience_id=exp2.id, description="Work on the Charges automation", order_index=3),
        ]
        db.add_all(exp2_achievements)
        
        exp2_technologies = [
            ExperienceTechnology(experience_id=exp2.id, name="Python"),
            ExperienceTechnology(experience_id=exp2.id, name="Scikit-learn"),
            ExperienceTechnology(experience_id=exp2.id, name="FastAPI"),
            ExperienceTechnology(experience_id=exp2.id, name="Selenium"),
        ]
        db.add_all(exp2_technologies)
        
        # 5. Create Projects
        # Project 1
        project1 = Project(
            title="Intelligent Customer Analytics Platform",
            description="End-to-end ML platform for customer behavior prediction and segmentation using advanced deep learning techniques.",
            image="/projects/analytics-platform.jpg",
            github_url="https://github.com/zahidrashid",
            live_url="https://analytics-platform.demo.com",
            is_featured=True,
            order_index=1
        )
        db.add(project1)
        db.flush()
        
        project1_features = [
            ProjectFeature(project_id=project1.id, description="Real-time customer behavior prediction", order_index=1),
            ProjectFeature(project_id=project1.id, description="Advanced customer segmentation algorithms", order_index=2),
            ProjectFeature(project_id=project1.id, description="Interactive analytics dashboard", order_index=3),
        ]
        db.add_all(project1_features)
        
        project1_metrics = [
            ProjectMetric(project_id=project1.id, description="25% increase in customer retention", order_index=1),
            ProjectMetric(project_id=project1.id, description="40% improvement in marketing ROI", order_index=2),
        ]
        db.add_all(project1_metrics)
        
        project1_technologies = [
            ProjectTechnology(project_id=project1.id, name="Python"),
            ProjectTechnology(project_id=project1.id, name="TensorFlow"),
            ProjectTechnology(project_id=project1.id, name="AWS"),
            ProjectTechnology(project_id=project1.id, name="React"),
        ]
        db.add_all(project1_technologies)
        
        # Project 2
        project2 = Project(
            title="AI-Powered Content Recommendation Engine",
            description="Scalable recommendation system using collaborative filtering and deep learning for personalized content delivery.",
            image="/projects/recommendation-engine.jpg",
            github_url="https://github.com/zahidrashid",
            live_url="https://recommendation-engine.demo.com",
            is_featured=True,
            order_index=2
        )
        db.add(project2)
        db.flush()
        
        project2_features = [
            ProjectFeature(project_id=project2.id, description="Hybrid recommendation algorithms", order_index=1),
            ProjectFeature(project_id=project2.id, description="Real-time inference API", order_index=2),
        ]
        db.add_all(project2_features)
        
        project2_metrics = [
            ProjectMetric(project_id=project2.id, description="35% increase in user engagement", order_index=1),
            ProjectMetric(project_id=project2.id, description="50% reduction in content discovery time", order_index=2),
        ]
        db.add_all(project2_metrics)
        
        project2_technologies = [
            ProjectTechnology(project_id=project2.id, name="PyTorch"),
            ProjectTechnology(project_id=project2.id, name="FastAPI"),
            ProjectTechnology(project_id=project2.id, name="Docker"),
        ]
        db.add_all(project2_technologies)
        
        # Commit all changes
        db.commit()
        print("✅ Database seeded successfully!")
        print("\n📊 Created:")
        print("  - 1 About Info entry")
        print("  - 3 Highlights")
        print("  - 14 Skills across 4 categories")
        print("  - 2 Work Experiences with responsibilities and achievements")
        print("  - 2 Featured Projects with features and metrics")
        print("\n🎉 Your portfolio is now populated with data!")
        print("🌐 Visit http://localhost:3000 to see your dynamic portfolio!")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding database: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    print("🌱 Starting database seed...")
    seed_database()
