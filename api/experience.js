// In-memory data store for demo purposes
let experienceData = [
  {
    id: 1,
    title: "AI Engineer & Machine Learning Specialist",
    company: "Tech Innovation Corp",
    location: "Remote",
    start_date: "2023-01-01",
    end_date: "Present",
    description: "Leading AI/ML initiatives, developing predictive models, and implementing deep learning solutions for business applications. Built and deployed 15+ machine learning models with 95%+ accuracy rates.",
    technologies: "Python, TensorFlow, PyTorch, Scikit-learn, AWS, Docker",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd",
    location: "City, Country",
    start_date: "2022-01-01",
    end_date: "2022-12-31",
    description: "Developed responsive web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    technologies: "React, Node.js, MongoDB, Express.js",
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
  
  // Parse URL for ID parameter
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathParts = url.pathname.split('/');
  const id = pathParts[pathParts.length - 1];
  const isIdRequest = !isNaN(parseInt(id));
  
  if (req.method === 'GET') {
    if (isIdRequest) {
      // Get specific experience
      const experience = experienceData.find(exp => exp.id === parseInt(id));
      if (experience) {
        res.status(200).json(experience);
      } else {
        res.status(404).json({ error: 'Experience not found' });
      }
    } else {
      // Get all experiences
      res.status(200).json(experienceData);
    }
  } else if (req.method === 'POST') {
    // Create new experience
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const newExperience = JSON.parse(body);
        newExperience.id = Math.max(...experienceData.map(e => e.id), 0) + 1;
        newExperience.created_at = new Date().toISOString();
        newExperience.updated_at = new Date().toISOString();
        experienceData.push(newExperience);
        res.status(201).json(newExperience);
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });
  } else if (req.method === 'PUT' && isIdRequest) {
    // Update experience
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const updates = JSON.parse(body);
        const index = experienceData.findIndex(exp => exp.id === parseInt(id));
        if (index !== -1) {
          experienceData[index] = { 
            ...experienceData[index], 
            ...updates, 
            id: parseInt(id),
            updated_at: new Date().toISOString() 
          };
          res.status(200).json(experienceData[index]);
        } else {
          res.status(404).json({ error: 'Experience not found' });
        }
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });
  } else if (req.method === 'DELETE' && isIdRequest) {
    // Delete experience
    const index = experienceData.findIndex(exp => exp.id === parseInt(id));
    if (index !== -1) {
      experienceData.splice(index, 1);
      res.status(200).json({ message: 'Experience deleted successfully' });
    } else {
      res.status(404).json({ error: 'Experience not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};