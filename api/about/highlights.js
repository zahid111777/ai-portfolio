module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  const highlights = [
    {
      id: 1,
      icon: "🚀",
      text: "Building the Future with AI",
      order_index: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      icon: "💡",
      text: "Innovative Problem Solver",
      order_index: 2,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      icon: "🎯",
      text: "Results-Driven Developer",
      order_index: 3,
      created_at: new Date().toISOString()
    }
  ];
  
  if (req.method === 'GET') {
    res.status(200).json(highlights);
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const newHighlight = JSON.parse(body);
        newHighlight.id = highlights.length + 1;
        newHighlight.created_at = new Date().toISOString();
        highlights.push(newHighlight);
        res.status(201).json(newHighlight);
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};