# Portfolio Backend

This is the FastAPI backend for the dynamic portfolio application.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Copy environment variables:
```bash
copy .env.example .env
```

3. Update the `.env` file with your settings.

4. Run the development server:
```bash
python run.py
```

The API will be available at http://localhost:8000

## API Documentation

- Swagger UI: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

## Default Admin Credentials

- Username: admin
- Password: admin123

**Note:** Change these credentials in production!

## API Endpoints

### Authentication
- `POST /api/token` - Get access token
- `GET /api/users/me` - Get current user info

### About
- `GET /api/about/info` - Get about information
- `POST /api/about/info` - Create about information (admin)
- `PUT /api/about/info` - Update about information (admin)
- `GET /api/about/highlights` - Get highlights
- `POST /api/about/highlights` - Create highlight (admin)
- `PUT /api/about/highlights/{id}` - Update highlight (admin)
- `DELETE /api/about/highlights/{id}` - Delete highlight (admin)

### Experience
- `GET /api/experience` - Get all experiences
- `GET /api/experience/{id}` - Get experience by ID
- `POST /api/experience` - Create experience (admin)
- `PUT /api/experience/{id}` - Update experience (admin)
- `DELETE /api/experience/{id}` - Delete experience (admin)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get project by ID
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/{id}` - Update project (admin)
- `DELETE /api/projects/{id}` - Delete project (admin)

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/categories` - Get skill categories
- `GET /api/skills/{id}` - Get skill by ID
- `POST /api/skills` - Create skill (admin)
- `PUT /api/skills/{id}` - Update skill (admin)
- `DELETE /api/skills/{id}` - Delete skill (admin)

### Contact
- `GET /api/contact/info` - Get contact information
- `POST /api/contact/info` - Create contact information (admin)
- `PUT /api/contact/info` - Update contact information (admin)
- `POST /api/contact/messages` - Submit contact message
- `GET /api/contact/messages` - Get contact messages (admin)
- `PUT /api/contact/messages/{id}/read` - Mark message as read (admin)
- `DELETE /api/contact/messages/{id}` - Delete message (admin)

### File Upload
- `POST /api/upload/image` - Upload image (admin)
- `DELETE /api/upload/files/{filename}` - Delete file (admin)
- `GET /api/upload/files` - List uploaded files (admin)

## Database

The application uses SQLite by default for development. For production, configure PostgreSQL in the `.env` file.

## File Uploads

Uploaded files are stored in the `./uploads` directory and served at `/uploads/{filename}`.

Supported file types: jpg, jpeg, png, gif, webp, pdf
Maximum file size: 5MB