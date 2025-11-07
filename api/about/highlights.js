// In-memory data store for demo purposes
let highlights = [
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
  const id = parseInt(pathParts[pathParts.length - 1]);
  const isIdRequest = !isNaN(id);
  
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
        newHighlight.id = Math.max(...highlights.map(h => h.id), 0) + 1;
        newHighlight.created_at = new Date().toISOString();
        highlights.push(newHighlight);
        res.status(201).json(newHighlight);
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });
  } else if (req.method === 'PUT' && isIdRequest) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const updates = JSON.parse(body);
        const index = highlights.findIndex(h => h.id === id);
        if (index !== -1) {
          highlights[index] = { 
            ...highlights[index], 
            ...updates, 
            id: id
          };
          res.status(200).json(highlights[index]);
        } else {
          res.status(404).json({ error: 'Highlight not found' });
        }
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });
  } else if (req.method === 'DELETE' && isIdRequest) {
    const index = highlights.findIndex(h => h.id === id);
    if (index !== -1) {
      highlights.splice(index, 1);
      res.status(200).json({ message: 'Highlight deleted successfully' });
    } else {
      res.status(404).json({ error: 'Highlight not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};