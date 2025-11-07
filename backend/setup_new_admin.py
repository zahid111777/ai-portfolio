"""
Direct setup admin user using bcrypt directly
"""
import sqlite3
import bcrypt
import os

def setup_admin():
    print("\n=== Setting Up Admin User ===\n")
    
    # Database path
    db_path = os.path.join(os.path.dirname(__file__), 'portfolio.db')
    
    # Username and password
    username = "zahid"
    password = "zahid@786"
    
    # Hash password using bcrypt directly
    password_bytes = password.encode('utf-8')
    hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    hashed_str = hashed.decode('utf-8')
    
    # Connect to database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Check if user exists
        cursor.execute("SELECT id FROM users WHERE username = ?", (username,))
        existing = cursor.fetchone()
        
        if existing:
            print(f"User '{username}' already exists. Updating password...")
            cursor.execute(
                "UPDATE users SET hashed_password = ?, is_active = 1 WHERE username = ?",
                (hashed_str, username)
            )
            print(f"✅ Password updated for user '{username}'")
        else:
            print(f"Creating new admin user '{username}'...")
            cursor.execute(
                "INSERT INTO users (username, hashed_password, is_active) VALUES (?, ?, 1)",
                (username, hashed_str)
            )
            print(f"✅ Admin user '{username}' created successfully!")
        
        # Delete old default admin
        cursor.execute("SELECT id FROM users WHERE username = 'admin'")
        old_admin = cursor.fetchone()
        if old_admin:
            print(f"\nRemoving old default admin user...")
            cursor.execute("DELETE FROM users WHERE username = 'admin'")
            print("✅ Old admin user removed")
        
        conn.commit()
        
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
        conn.rollback()
        import traceback
        traceback.print_exc()
    finally:
        conn.close()

if __name__ == "__main__":
    setup_admin()
