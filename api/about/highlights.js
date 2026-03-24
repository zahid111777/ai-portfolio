const supabase = require('../_supabase');
const setCors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};
module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  const url = new URL(req.url, `http://${req.headers.host}`);
  const id = parseInt(url.pathname.split('/').pop());
  const isIdRequest = !isNaN(id);
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('about_highlights').select('*').order('order_index');
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    const { data, error } = await supabase.from('about_highlights').insert(req.body || {}).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  } else if (req.method === 'PUT' && isIdRequest) {
    const { data, error } = await supabase.from('about_highlights').update(req.body || {}).eq('id', id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  } else if (req.method === 'DELETE' && isIdRequest) {
    const { error } = await supabase.from('about_highlights').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ message: 'Deleted' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
