module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Admin credentials (set ADMIN_USERNAME and ADMIN_PASSWORD env vars in production)
  const adminUser = {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin123'
  };
  
  if (req.method === 'POST') {
    // If Express/middleware already parsed the body, use it directly.
    // Otherwise fall back to reading the raw stream (Vercel serverless context).
    if (req.body && (req.body.username !== undefined)) {
      const username = req.body.username;
      const password = req.body.password;
      if (username === adminUser.username && password === adminUser.password) {
        res.status(200).json({ access_token: 'valid_admin_token', token_type: 'bearer' });
      } else {
        res.status(401).json({ detail: 'Invalid credentials' });
      }
      return;
    }

    // Parse form data from raw stream (Vercel serverless)
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      // Parse URL-encoded form data
      const params = new URLSearchParams(body);
      const username = params.get('username');
      const password = params.get('password');
      
      if (username === adminUser.username && password === adminUser.password) {
        res.status(200).json({
          access_token: 'valid_admin_token',
          token_type: 'bearer'
        });
      } else {
        res.status(401).json({ detail: 'Invalid credentials' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};