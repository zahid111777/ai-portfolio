module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  const aboutData = {
    name: "Zahid Rashid",
    title: "AI Engineer & Machine Learning Specialist", 
    description: "Passionate AI Engineer with expertise in machine learning, deep learning, and data science. I specialize in developing innovative AI solutions, building predictive models, and integrating cutting-edge AI technologies into business applications to drive digital transformation.",
    email: "zahid@example.com",
    phone: "+1234567890",
    location: "Your Location",
    profile_image: "/zahid-profile.jpeg",
    years_experience: 3,
    ai_projects: 25,
    ml_models: 50,
    accuracy_rate: 98
  };
  
  if (req.method === 'GET') {
    res.status(200).json(aboutData);
  } else if (req.method === 'PUT') {
    // For demo purposes, just return the updated data
    const updates = req.body || {};
    const updatedData = { ...aboutData, ...updates };
    res.status(200).json(updatedData);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};