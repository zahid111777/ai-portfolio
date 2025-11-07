# Create New Admin User

## How to Create a New Admin User

### Method 1: Using the Python Script (Recommended)

1. **Navigate to the backend directory:**
   ```bash
   cd backend/app
   ```

2. **Run the create_admin script:**
   ```bash
   python create_admin.py
   ```

3. **Follow the prompts:**
   - Enter your desired username
   - Enter a strong password
   - Confirm the password

4. **The script will:**
   - Create the new admin user
   - Or update an existing user's password if the username already exists

### Method 2: Using Python Interactive Shell

1. **Navigate to the backend directory:**
   ```bash
   cd backend/app
   ```

2. **Open Python shell:**
   ```bash
   python
   ```

3. **Run the following code:**
   ```python
   from database import SessionLocal, engine
   from models import Base, User
   from auth import get_password_hash

   # Create tables
   Base.metadata.create_all(bind=engine)

   # Create session
   db = SessionLocal()

   # Create new user
   new_user = User(
       username="your_username",
       hashed_password=get_password_hash("your_password"),
       is_active=True
   )

   db.add(new_user)
   db.commit()
   print("Admin user created successfully!")
   db.close()
   ```

### Method 3: Using Database GUI (e.g., DB Browser for SQLite)

1. Open `portfolio.db` in your SQLite browser
2. Go to the `users` table
3. Add a new row with:
   - `username`: your desired username
   - `hashed_password`: use bcrypt to hash your password
   - `is_active`: 1 (or True)

## Important Security Notes

⚠️ **SECURITY RECOMMENDATIONS:**

1. **Delete Default Admin User:**
   After creating your own admin, delete the default `admin` user from the database:
   ```python
   from database import SessionLocal
   from models import User

   db = SessionLocal()
   default_user = db.query(User).filter(User.username == "admin").first()
   if default_user:
       db.delete(default_user)
       db.commit()
       print("Default admin deleted!")
   db.close()
   ```

2. **Use Strong Passwords:**
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, and special characters
   - Avoid dictionary words
   - Don't reuse passwords

3. **Change Password Regularly:**
   - Update passwords every 3-6 months
   - Use the `create_admin.py` script to update passwords

4. **Backup Database:**
   - Regular backups of `portfolio.db`
   - Store backups securely

## Troubleshooting

**If you get "ModuleNotFoundError":**
```bash
pip install sqlalchemy bcrypt passlib
```

**If database is locked:**
- Stop the backend server
- Run the script again

**To list all admin users:**
```python
from database import SessionLocal
from models import User

db = SessionLocal()
users = db.query(User).all()
for user in users:
    print(f"ID: {user.id}, Username: {user.username}, Active: {user.is_active}")
db.close()
```

## Current Admin Credentials

- **Default Username:** admin
- **Default Password:** admin123

⚠️ **PLEASE CHANGE THESE IMMEDIATELY IN PRODUCTION!**
