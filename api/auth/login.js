module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Admin credentials
  const adminUser = { username: 'admin', password: 'admin123' };
  
  if (req.method === 'POST') {
    const { username, password } = req.body || {};
    
    if (username === adminUser.username && password === adminUser.password) {
      res.status(200).json({
        access_token: 'valid_admin_token',
        token_type: 'bearer',
        user: { username: adminUser.username }
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};