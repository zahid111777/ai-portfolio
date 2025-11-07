"""
Update database with exact content from live website
Run this to match your deployed portfolio
"""

from app.database import SessionLocal, engine
from app.models import (
    Base, AboutInfo, Highlight, Experience, Responsibility,
    Achievement, ExperienceTechnology, ExperienceProject, Project, ProjectTechnology,
    ProjectFeature, ProjectMetric, Skill
)

def update_database():
    """Update database with live website content."""
    db = SessionLocal()
    
    try:
        print("🔄 Updating database with live website content...")
        
        # Clear existing data
        db.query(ProjectMetric).delete()
        db.query(ProjectFeature).delete()
        db.query(ProjectTechnology).delete()
        db.query(Project).delete()
        db.query(ExperienceTechnology).delete()
        db.query(ExperienceProject).delete()
        db.query(Achievement).delete()
        db.query(Responsibility).delete()
        db.query(Experience).delete()
        db.query(Skill).delete()
        db.query(Highlight).delete()
        db.query(AboutInfo).delete()
        db.commit()
        
        # 1. Create About Info
        about_info = AboutInfo(
            name="Zahid Rashid",
            title="AI Engineer & Machine Learning Specialist",
            description="Passionate AI Engineer with expertise in machine learning, deep learning, and data science. I specialize in developing innovative AI solutions, building predictive models, and integrating cutting-edge AI technologies into business applications to drive digital transformation.",
            profile_image="/assets/zahid-profile.jpeg",
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
        
        # 3. Create Skills (matching live site exactly)
        skills = [
            # AI/ML Frameworks
            Skill(name="TensorFlow", category="AI/ML Frameworks", proficiency=90, order_index=1),
            Skill(name="PyTorch", category="AI/ML Frameworks", proficiency=85, order_index=2),
            Skill(name="Scikit-learn", category="AI/ML Frameworks", proficiency=95, order_index=3),
            Skill(name="Keras", category="AI/ML Frameworks", proficiency=88, order_index=4),
            Skill(name="Hugging Face", category="AI/ML Frameworks", proficiency=80, order_index=5),
            
            # Programming Languages
            Skill(name="Python", category="Programming Languages", proficiency=95, order_index=1),
            Skill(name="JavaScript", category="Programming Languages", proficiency=85, order_index=2),
            Skill(name="SQL", category="Programming Languages", proficiency=90, order_index=3),
            
            # Cloud & DevOps
            Skill(name="AWS", category="Cloud & DevOps", proficiency=85, order_index=1),
            Skill(name="Docker", category="Cloud & DevOps", proficiency=80, order_index=2),
            Skill(name="MLflow", category="Cloud & DevOps", proficiency=85, order_index=3),
            Skill(name="Git", category="Cloud & DevOps", proficiency=90, order_index=4),
            
            # Data & Databases
            Skill(name="PostgreSQL", category="Data & Databases", proficiency=85, order_index=1),
            Skill(name="MongoDB", category="Data & Databases", proficiency=80, order_index=2),
        ]
        db.add_all(skills)
        
        # 4. Experience 1: Senior AI Engineer
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
            Achievement(experience_id=exp1.id, description="Presented research findings at Pakistan AI Summit 2023", order_index=4),
            Achievement(experience_id=exp1.id, description="RCM automation", order_index=5),
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
            ExperienceTechnology(experience_id=exp1.id, name="Rag"),
        ]
        db.add_all(exp1_technologies)
        
        # 5. Experience 2: AI/ML Engineer
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
            Responsibility(experience_id=exp2.id, description="Created data visualization dashboards for business stakeholders", order_index=4),
        ]
        db.add_all(exp2_responsibilities)
        
        exp2_achievements = [
            Achievement(experience_id=exp2.id, description="Deployed 10+ ML models in production with 99.5% uptime", order_index=1),
            Achievement(experience_id=exp2.id, description="Improved data processing efficiency by 35% through pipeline optimization", order_index=2),
            Achievement(experience_id=exp2.id, description="Developed an automated anomaly detection system that reduced manual monitoring by 60%", order_index=3),
            Achievement(experience_id=exp2.id, description="Work on the Charges automation", order_index=4),
        ]
        db.add_all(exp2_achievements)
        
        exp2_technologies = [
            ExperienceTechnology(experience_id=exp2.id, name="Python"),
            ExperienceTechnology(experience_id=exp2.id, name="Scikit-learn"),
            ExperienceTechnology(experience_id=exp2.id, name="OpenCV"),
            ExperienceTechnology(experience_id=exp2.id, name="NLTK"),
            ExperienceTechnology(experience_id=exp2.id, name="SQL"),
            ExperienceTechnology(experience_id=exp2.id, name="FastAPI"),
            ExperienceTechnology(experience_id=exp2.id, name="Selenium"),
            ExperienceTechnology(experience_id=exp2.id, name="PyautoGui"),
            ExperienceTechnology(experience_id=exp2.id, name="PYAutoIT"),
        ]
        db.add_all(exp2_technologies)
        
        # 6. Experience 3: Junior Data Scientist (Internship)
        exp3 = Experience(
            title="Junior Data Scientist (Internship)",
            company="CareCloud",
            duration="May 2023 - Dec 2023",
            location="Bagh AJK, Pakistan",
            employment_type="Internship",
            order_index=3
        )
        db.add(exp3)
        db.flush()
        
        exp3_responsibilities = [
            Responsibility(experience_id=exp3.id, description="Learned foundational data science concepts and machine learning algorithms", order_index=1),
            Responsibility(experience_id=exp3.id, description="Gained hands-on experience with Python programming and data manipulation libraries", order_index=2),
            Responsibility(experience_id=exp3.id, description="Developed understanding of statistical analysis and data visualization techniques", order_index=3),
            Responsibility(experience_id=exp3.id, description="Participated in team projects to apply theoretical knowledge to real-world problems", order_index=4),
            Responsibility(experience_id=exp3.id, description="Studied deep learning concepts and transformer architectures", order_index=5),
        ]
        db.add_all(exp3_responsibilities)
        
        exp3_achievements = [
            Achievement(experience_id=exp3.id, description="Successfully completed comprehensive training in Python, Flask, SQL, NumPy, Pandas, and Matplotlib", order_index=1),
            Achievement(experience_id=exp3.id, description="Mastered Scikit-learn for machine learning model development", order_index=2),
            Achievement(experience_id=exp3.id, description="Gained proficiency in deep learning frameworks and transformer models", order_index=3),
            Achievement(experience_id=exp3.id, description="Built beginner-level projects demonstrating core data science skills", order_index=4),
        ]
        db.add_all(exp3_achievements)
        
        exp3_projects = [
            ExperienceProject(experience_id=exp3.id, name="Basic Calculator Application", description="using Python and Tkinter GUI", order_index=1),
            ExperienceProject(experience_id=exp3.id, name="Student Grade Management System", description="with Flask web framework", order_index=2),
            ExperienceProject(experience_id=exp3.id, name="Simple Data Analysis", description="of Sales Dataset using Pandas and Matplotlib", order_index=3),
            ExperienceProject(experience_id=exp3.id, name="Basic Linear Regression Model", description="for predicting house prices", order_index=4),
            ExperienceProject(experience_id=exp3.id, name="Beginner-level Image Classification", description="using basic CNN architecture", order_index=5),
            ExperienceProject(experience_id=exp3.id, name="Simple Web Scraping project", description="to collect and analyze data", order_index=6),
            ExperienceProject(experience_id=exp3.id, name="Basic Chatbot", description="using rule-based NLP techniques", order_index=7),
        ]
        db.add_all(exp3_projects)
        
        exp3_technologies = [
            ExperienceTechnology(experience_id=exp3.id, name="Python"),
            ExperienceTechnology(experience_id=exp3.id, name="Flask"),
            ExperienceTechnology(experience_id=exp3.id, name="SQL"),
            ExperienceTechnology(experience_id=exp3.id, name="NumPy"),
            ExperienceTechnology(experience_id=exp3.id, name="Pandas"),
            ExperienceTechnology(experience_id=exp3.id, name="Matplotlib"),
            ExperienceTechnology(experience_id=exp3.id, name="Scikit-learn"),
            ExperienceTechnology(experience_id=exp3.id, name="Deep Learning"),
            ExperienceTechnology(experience_id=exp3.id, name="Transformers"),
        ]
        db.add_all(exp3_technologies)
        
        # 7. Projects
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
            ProjectFeature(project_id=project1.id, description="Automated model retraining pipeline", order_index=4),
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
            ProjectTechnology(project_id=project1.id, name="SQL"),
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
            ProjectFeature(project_id=project2.id, description="A/B testing framework", order_index=3),
            ProjectFeature(project_id=project2.id, description="Scalable microservices architecture", order_index=4),
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
            ProjectTechnology(project_id=project2.id, name="MongoDB"),
        ]
        db.add_all(project2_technologies)
        
        # Project 3
        project3 = Project(
            title="Computer Vision Quality Control System",
            description="Automated quality inspection system using computer vision and deep learning for manufacturing processes.",
            image="/projects/quality-control.jpg",
            github_url="https://github.com/zahidrashid",
            live_url="",
            is_featured=True,
            order_index=3
        )
        db.add(project3)
        db.flush()
        
        project3_features = [
            ProjectFeature(project_id=project3.id, description="Real-time defect detection", order_index=1),
            ProjectFeature(project_id=project3.id, description="Multi-class classification", order_index=2),
            ProjectFeature(project_id=project3.id, description="Production line integration", order_index=3),
            ProjectFeature(project_id=project3.id, description="Quality metrics dashboard", order_index=4),
        ]
        db.add_all(project3_features)
        
        project3_metrics = [
            ProjectMetric(project_id=project3.id, description="99.2% accuracy in defect detection", order_index=1),
            ProjectMetric(project_id=project3.id, description="60% reduction in manual inspection time", order_index=2),
        ]
        db.add_all(project3_metrics)
        
        project3_technologies = [
            ProjectTechnology(project_id=project3.id, name="OpenCV"),
            ProjectTechnology(project_id=project3.id, name="TensorFlow"),
            ProjectTechnology(project_id=project3.id, name="Flask"),
            ProjectTechnology(project_id=project3.id, name="PostgreSQL"),
            ProjectTechnology(project_id=project3.id, name="Docker"),
        ]
        db.add_all(project3_technologies)
        
        # Commit all changes
        db.commit()
        print("✅ Database updated successfully!")
        print("\n📊 Updated:")
        print("  - About info with exact text from live site")
        print("  - 3 Highlights")
        print("  - 14 Skills across 4 categories")
        print("  - 3 Work Experiences (including internship)")
        print("  - 3 Featured Projects")
        print("\n🎉 Your local portfolio now matches zahidrashid.vercel.app!")
        print("🌐 Visit http://localhost:3000 to see the updated portfolio!")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error updating database: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    print("🔄 Updating database with live website content...")
    update_database()
