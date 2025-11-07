import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import User
import bcrypt

# Database setup
DATABASE_URL = "sqlite:///./portfolio.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    password_bytes = password.encode('utf-8')
    hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    return hashed.decode('utf-8')

def update_admin_credentials():
    """Update admin credentials."""
    db = SessionLocal()
    try:
        print("\n" + "="*50)
        print("   PORTFOLIO ADMIN - PASSWORD RESET TOOL")
        print("="*50 + "\n")
        
        # Get username input
        new_username = input("Enter username (default: admin): ").strip()
        if not new_username:
            new_username = "admin"
        
        # Get password input
        new_password = input("Enter new password: ").strip()
        if not new_password:
            print("❌ Error: Password cannot be empty!")
            return
        
        # Confirm password
        confirm_password = input("Confirm new password: ").strip()
        if new_password != confirm_password:
            print("❌ Error: Passwords do not match!")
            return
        
        print("\n🔄 Updating credentials...")
        
        # Delete all existing users
        db.query(User).delete()
        db.commit()
        print("✓ Deleted all existing users")
        
        hashed_password = hash_password(new_password)
        
        admin_user = User(
            username=new_username,
            hashed_password=hashed_password,
            is_active=True
        )
        
        db.add(admin_user)
        db.commit()
        
        print(f"\n✅ Admin credentials updated successfully!")
        print(f"   Username: {new_username}")
        print(f"   Password: {new_password}")
        print(f"\n🔐 You can now login with these credentials at http://localhost:3001")
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    update_admin_credentials()
