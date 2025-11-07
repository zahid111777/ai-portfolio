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
    // Return skill categories that the main portfolio expects
    const categories = [
      "Programming Languages",
      "Frontend Frameworks", 
      "AI/ML Frameworks",
      "Backend Frameworks",
      "Cloud Platforms",
      "DevOps Tools"
    ];
    
    res.status(200).json(categories);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};