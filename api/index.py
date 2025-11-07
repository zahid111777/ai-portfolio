import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

from backend.app.main import app

# Vercel serverless function entry point
app = app