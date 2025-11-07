// In-memory data store for demo purposes
let skillsData = [
  { id: 1, name: "Python", category: "Programming Languages", proficiency: 95, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 2, name: "JavaScript", category: "Programming Languages", proficiency: 90, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 3, name: "React", category: "Frontend Frameworks", proficiency: 88, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 4, name: "TensorFlow", category: "AI/ML Frameworks", proficiency: 92, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 5, name: "PyTorch", category: "AI/ML Frameworks", proficiency: 85, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 6, name: "FastAPI", category: "Backend Frameworks", proficiency: 88, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 7, name: "AWS", category: "Cloud Platforms", proficiency: 82, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 8, name: "Docker", category: "DevOps Tools", proficiency: 80, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
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
  const lastPart = pathParts[pathParts.length - 1];
  
  // Check if requesting categories
  if (lastPart === 'categories') {
    const categories = [...new Set(skillsData.map(skill => skill.category))];
    res.status(200).json(categories);
    return;
  }
  
  // Check if requesting specific skill by ID
  const id = parseInt(lastPart);
  const isIdRequest = !isNaN(id);
  
  if (req.method === 'GET') {
    if (isIdRequest) {
      // Get specific skill
      const skill = skillsData.find(s => s.id === id);
      if (skill) {
        res.status(200).json(skill);
      } else {
        res.status(404).json({ error: 'Skill not found' });
      }
    } else {
      // Get all skills, optionally filtered by category
      const category = url.searchParams.get('category');
      let filteredSkills = skillsData;
      
      if (category) {
        filteredSkills = skillsData.filter(skill => skill.category === category);
      }
      
      res.status(200).json(filteredSkills);
    }
  } else if (req.method === 'POST') {
    // Create new skill
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const newSkill = JSON.parse(body);
        newSkill.id = Math.max(...skillsData.map(s => s.id), 0) + 1;
        newSkill.created_at = new Date().toISOString();
        newSkill.updated_at = new Date().toISOString();
        skillsData.push(newSkill);
        res.status(201).json(newSkill);
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });
  } else if (req.method === 'PUT' && isIdRequest) {
    // Update skill
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const updates = JSON.parse(body);
        const index = skillsData.findIndex(s => s.id === id);
        if (index !== -1) {
          skillsData[index] = { 
            ...skillsData[index], 
            ...updates, 
            id: id,
            updated_at: new Date().toISOString() 
          };
          res.status(200).json(skillsData[index]);
        } else {
          res.status(404).json({ error: 'Skill not found' });
        }
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });
  } else if (req.method === 'DELETE' && isIdRequest) {
    // Delete skill
    const index = skillsData.findIndex(s => s.id === id);
    if (index !== -1) {
      skillsData.splice(index, 1);
      res.status(200).json({ message: 'Skill deleted successfully' });
    } else {
      res.status(404).json({ error: 'Skill not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};