const supabase = require('../_supabase');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('skills')
      .select('category')
      .order('category');

    if (error) return res.status(500).json({ error: error.message });

    const categories = [...new Set(data.map(r => r.category))];
    res.status(200).json(categories);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};