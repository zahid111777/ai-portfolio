// In-memory data store for demo purposes
let projectsData = [
  {
    id: 1,
    title: "AI-Powered Portfolio Website",
    description: "A dynamic portfolio website with AI-driven content management, featuring real-time updates and intelligent content optimization.",
    technologies: "React, FastAPI, TensorFlow, Vercel, SQLAlchemy",
    github_url: "https://github.com/zahid111777/ai-portfolio",
    live_url: "https://zahidrashid.vercel.app",
    image: "/projects/portfolio-ai.jpg",
    featured: true,
    status: "completed",
    start_date: "2024-10-01",
    end_date: "2024-11-07",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Machine Learning Prediction Engine",
    description: "A scalable ML pipeline for predictive analytics with real-time data processing and automated model retraining capabilities.",
    technologies: "Python, PyTorch, Apache Kafka, Redis, Docker",
    github_url: "https://github.com/username/ml-engine",
    live_url: "https://ml-engine-demo.com",
    image: "/projects/ml-engine.jpg",
    featured: true,
    status: "completed",
    start_date: "2024-05-01",
    end_date: "2024-08-15",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "Smart Task Management System",
    description: "An intelligent task management application with AI-powered priority suggestions and productivity analytics.",
    technologies: "React, Node.js, MongoDB, OpenAI API",
    github_url: "https://github.com/username/smart-tasks",
    live_url: "https://smart-tasks.vercel.app",
    image: "/projects/task-manager.jpg",
    featured: false,
    status: "in-progress",
    start_date: "2024-09-01",
    end_date: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Parse URL for parameters
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathParts = url.pathname.split('/');
  const id = parseInt(pathParts[pathParts.length - 1]);
  const isIdRequest = !isNaN(id);
  
  if (req.method === 'GET') {
    if (isIdRequest) {
      // Get specific project
      const project = projectsData.find(p => p.id === id);
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ error: 'Project not found' });
      }
    } else {
      // Get all projects, optionally filtered by featured status
      const featured = url.searchParams.get('featured');
      let filteredProjects = projectsData;
      
      if (featured !== null) {
        const isFeatured = featured === 'true';
        filteredProjects = projectsData.filter(project => project.featured === isFeatured);
      }
      
      res.status(200).json(filteredProjects);
    }
  } else if (req.method === 'POST') {
    // Create new project
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const newProject = JSON.parse(body);
        newProject.id = Math.max(...projectsData.map(p => p.id), 0) + 1;
        newProject.created_at = new Date().toISOString();
        newProject.updated_at = new Date().toISOString();
        projectsData.push(newProject);
        res.status(201).json(newProject);
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });
  } else if (req.method === 'PUT' && isIdRequest) {
    // Update project
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const updates = JSON.parse(body);
        const index = projectsData.findIndex(p => p.id === id);
        if (index !== -1) {
          projectsData[index] = { 
            ...projectsData[index], 
            ...updates, 
            id: id,
            updated_at: new Date().toISOString() 
          };
          res.status(200).json(projectsData[index]);
        } else {
          res.status(404).json({ error: 'Project not found' });
        }
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });
  } else if (req.method === 'DELETE' && isIdRequest) {
    // Delete project
    const index = projectsData.findIndex(p => p.id === id);
    if (index !== -1) {
      projectsData.splice(index, 1);
      res.status(200).json({ message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};