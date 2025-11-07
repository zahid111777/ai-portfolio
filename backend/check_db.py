from app.database import SessionLocal
from app.models import AboutInfo, Highlight, Experience, Project, Skill
import json

db = SessionLocal()

# Get About Info
info = db.query(AboutInfo).first()
if info:
    print("=== ABOUT INFO ===")
    print(f"Name: {info.name}")
    print(f"Title: {info.title}")
    print(f"Profile Image: {info.profile_image}")
    print(f"Years Experience: {info.years_experience}")
    print(f"AI Projects: {info.ai_projects}")
    print(f"ML Models: {info.ml_models}")
    print(f"Accuracy Rate: {info.accuracy_rate}")
    print()

# Get Highlights
highlights = db.query(Highlight).all()
print(f"=== HIGHLIGHTS ({len(highlights)}) ===")
for h in highlights:
    print(f"{h.icon} {h.text}")
print()

# Get Experiences
experiences = db.query(Experience).all()
print(f"=== EXPERIENCES ({len(experiences)}) ===")
for exp in experiences:
    print(f"{exp.title} at {exp.company} ({exp.duration})")
print()

# Get Projects
projects = db.query(Project).all()
print(f"=== PROJECTS ({len(projects)}) ===")
for proj in projects:
    print(f"{proj.title} - Featured: {proj.is_featured}")
print()

# Get Skills
skills = db.query(Skill).all()
categories = {}
for skill in skills:
    if skill.category not in categories:
        categories[skill.category] = []
    categories[skill.category].append(skill.name)

print(f"=== SKILLS ({len(skills)}) ===")
for cat, skills_list in categories.items():
    print(f"{cat}: {len(skills_list)} skills")
print()

db.close()
