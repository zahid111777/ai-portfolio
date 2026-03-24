const supabase = require('../_supabase');

const setCors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('about_info').select('*').limit(1).single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);

  } else if (req.method === 'PUT') {
    const updates = req.body || {};
    const { data, error } = await supabase
      .from('about_info').update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', updates.id || 1).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);

  } else if (req.method === 'POST') {
    const body = req.body || {};
    const { data, error } = await supabase.from('about_info').insert(body).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};