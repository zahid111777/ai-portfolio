"""
Setup admin user: zahid with password zahid@786
"""
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app.database import SessionLocal, engine
from app.models import Base, User
from app.auth import get_password_hash

def setup_admin():
    print("\n=== Setting Up Admin User ===\n")
    
    # Create database tables
    Base.metadata.create_all(bind=engine)
    
    # Create database session
    db = SessionLocal()
    
    try:
        # Username and password
        username = "zahid"
        password = "zahid@786"
        
        # Check if user already exists
        existing_user = db.query(User).filter(User.username == username).first()
        if existing_user:
            print(f"User '{username}' already exists. Updating password...")
            existing_user.hashed_password = get_password_hash(password)
            db.commit()
            print(f"✅ Password updated for user '{username}'")
        else:
            # Create new user
            print(f"Creating new admin user '{username}'...")
            hashed_password = get_password_hash(password)
            new_user = User(
                username=username,
                hashed_password=hashed_password,
                is_active=True
            )
            
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            
            print(f"✅ Admin user '{username}' created successfully!")
            print(f"User ID: {new_user.id}")
        
        # Delete old default admin if exists
        old_admin = db.query(User).filter(User.username == "admin").first()
        if old_admin:
            print(f"\nRemoving old default admin user...")
            db.delete(old_admin)
            db.commit()
            print("✅ Old admin user removed")
        
        print("\n" + "="*50)
        print("ADMIN CREDENTIALS:")
        print("="*50)
        print(f"Username: {username}")
        print(f"Password: {password}")
        print("="*50)
        print("\nYou can now login at: http://localhost:3001")
        print("="*50 + "\n")
        
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        db.rollback()
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    setup_admin()
