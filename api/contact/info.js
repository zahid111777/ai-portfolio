// In-memory data store for demo purposes
let contactInfo = {
  id: 1,
  email: "zahid@example.com",
  phone: "+1234567890",
  location: "Your City, Country",
  linkedin: "https://linkedin.com/in/zahidrashid",
  github: "https://github.com/zahid111777",
  twitter: "https://twitter.com/zahidrashid",
  website: "https://zahidrashid.vercel.app",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

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
    res.status(200).json(contactInfo);
  } else if (req.method === 'PUT') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const updates = JSON.parse(body);
        contactInfo = { 
          ...contactInfo, 
          ...updates, 
          id: 1,
          updated_at: new Date().toISOString() 
        };
        res.status(200).json(contactInfo);
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const newInfo = JSON.parse(body);
        contactInfo = { 
          ...newInfo, 
          id: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString() 
        };
        res.status(201).json(contactInfo);
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};