module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  const aboutInfo = {
    id: 1,
    name: "Zahid Rashid",
    title: "AI Engineer & Machine Learning Specialist",
    description: "Passionate AI Engineer with expertise in machine learning, deep learning, and data science. I specialize in developing innovative AI solutions, building predictive models, and integrating cutting-edge AI technologies into business applications to drive digital transformation.",
    profile_image: "/zahid-profile.jpeg",
    years_experience: 3,
    ai_projects: 25,
    ml_models: 50,
    accuracy_rate: 98,
    cv_url: "/resume.pdf",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  if (req.method === 'GET') {
    res.status(200).json(aboutInfo);
  } else if (req.method === 'PUT') {
    // For demo purposes, just return the updated data
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const updates = JSON.parse(body);
        const updatedData = { ...aboutInfo, ...updates };
        res.status(200).json(updatedData);
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};