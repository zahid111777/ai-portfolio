"""
Script to create a new admin user
"""
import sys
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, User
from auth import get_password_hash

def create_admin():
    print("\n=== Create New Admin User ===\n")
    
    username = input("Enter username: ").strip()
    if not username:
        print("Username cannot be empty!")
        return
    
    password = input("Enter password: ").strip()
    if not password:
        print("Password cannot be empty!")
        return
    
    confirm_password = input("Confirm password: ").strip()
    if password != confirm_password:
        print("Passwords do not match!")
        return
    
    # Create database tables
    Base.metadata.create_all(bind=engine)
    
    # Create database session
    db = SessionLocal()
    
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.username == username).first()
        if existing_user:
            print(f"\nUser '{username}' already exists!")
            update = input("Do you want to update the password? (yes/no): ").strip().lower()
            if update == 'yes' or update == 'y':
                existing_user.hashed_password = get_password_hash(password)
                db.commit()
                print(f"\n✅ Password updated for user '{username}'")
            return
        
        # Create new user
        hashed_password = get_password_hash(password)
        new_user = User(
            username=username,
            hashed_password=hashed_password,
            is_active=True
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        print(f"\n✅ Admin user '{username}' created successfully!")
        print(f"User ID: {new_user.id}")
        
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()
