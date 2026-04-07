# 🎨 AI Portfolio - Dynamic Portfolio System

A modern, full-stack portfolio website with content management capabilities.

## ✨ Features

- 🎯 **Dynamic Content**: Update portfolio content through admin panel
- 📱 **Responsive Design**: Works perfectly on all devices  
- 🔐 **Admin Panel**: Full CRUD operations for content management
- 🚀 **Modern Tech Stack**: React + FastAPI + SQLite
- 🎨 **Clean UI**: Modern, professional design
- 📊 **Real-time Updates**: Changes reflect immediately

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Modern CSS
- **Backend**: FastAPI + SQLAlchemy + Pydantic
- **Database**: SQLite (portable & easy)
- **Admin**: React with full content management
- **Authentication**: JWT-based admin login

## 🚀 Quick Start

### Option 1: Automated Setup (Windows)
```bash
# Clone and setup everything automatically
git clone https://github.com/zahid111777/ai-portfolio.git
cd ai-portfolio
setup-first-time.bat

# Start all development servers
start-dev.bat
```

### Option 2: Manual Setup
```bash
# 1. Clone repository
git clone https://github.com/zahid111777/ai-portfolio.git
cd ai-portfolio

# 2. Backend setup
cd backend
python -m venv .venv
.venv\Scripts\activate  # Windows
pip install -r requirements.txt
python setup_new_admin.py
python run.py

# 3. Frontend setup (new terminal)
cd ai-portfolio
npm install
npm start

# 4. Admin setup (new terminal)  
cd ai-portfolio/admin
npm install
npm start
```

## 🌐 Access Your Portfolio

- **Portfolio**: http://localhost:3000
- **Admin Panel**: http://localhost:3001
- **API Docs**: http://localhost:8000/api/docs

## 📁 Project Structure

```
ai-portfolio/
├── src/                    # Main portfolio (React)
├── admin/                  # Admin panel (React)
├── backend/                # API server (FastAPI)
│   ├── app/               # Application code
│   ├── portfolio.db       # SQLite database
│   └── run.py            # Server startup
├── setup-first-time.bat   # Automated setup
├── start-dev.bat          # Start all servers
└── LOCAL_SETUP_GUIDE.md   # Detailed guide
```

## 🎯 Usage

1. **Start Development**: Run `start-dev.bat` or start services manually
2. **Update Content**: Login to admin panel and modify your portfolio
3. **View Changes**: Check main portfolio for real-time updates
4. **Customize**: Edit React components and API endpoints as needed

## 📝 Content Management

The admin panel allows you to manage:
- ✏️ **About Section**: Personal info, highlights, bio
- 💼 **Experience**: Job history, roles, achievements  
- 🚀 **Projects**: Portfolio projects with descriptions
- 🔧 **Skills**: Technical skills and proficiency levels
- 📞 **Contact**: Social links and contact information

## 🔧 Customization

- **Styling**: Edit CSS files in `src/` directories
- **Components**: Modify React components for UI changes
- **API**: Extend FastAPI routes in `backend/app/routers/`
- **Database**: SQLite file for easy backup/restore

## 📚 Documentation

- **Full Setup Guide**: [LOCAL_SETUP_GUIDE.md](LOCAL_SETUP_GUIDE.md)
- **Backend API**: Visit `/api/docs` when server is running
- **Admin Guide**: Built-in help in admin panel

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
