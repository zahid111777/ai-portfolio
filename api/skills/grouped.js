// Import skills data from main skills endpoint logic
const skillsData = [
  { id: 1, name: "Python", category: "Programming Languages", proficiency: 95 },
  { id: 2, name: "JavaScript", category: "Programming Languages", proficiency: 90 },
  { id: 3, name: "React", category: "Frontend Frameworks", proficiency: 88 },
  { id: 4, name: "TensorFlow", category: "AI/ML Frameworks", proficiency: 92 },
  { id: 5, name: "PyTorch", category: "AI/ML Frameworks", proficiency: 85 },
  { id: 6, name: "FastAPI", category: "Backend Frameworks", proficiency: 88 },
  { id: 7, name: "AWS", category: "Cloud Platforms", proficiency: 82 },
  { id: 8, name: "Docker", category: "DevOps Tools", proficiency: 80 }
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
  
  if (req.method === 'GET') {
    // Group skills by category as expected by the frontend
    const groupedSkills = skillsData.reduce((acc, skill) => {
      const existingCategory = acc.find(cat => cat.category === skill.category);
      
      if (existingCategory) {
        existingCategory.skills.push({
          name: skill.name,
          level: skill.proficiency
        });
      } else {
        acc.push({
          category: skill.category,
          skills: [{
            name: skill.name,
            level: skill.proficiency
          }]
        });
      }
      
      return acc;
    }, []);
    
    res.status(200).json(groupedSkills);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};