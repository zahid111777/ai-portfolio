const supabase = require('./_supabase');
const setCors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};
module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  const url = new URL(req.url, `http://${req.headers.host}`);
  const parts = url.pathname.split('/').filter(Boolean);
  const last = parts[parts.length - 1];
  if (last === 'categories') {
    const { data, error } = await supabase.from('skills').select('category');
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json([...new Set(data.map(s => s.category))]);
    return;
  }
  const id = parseInt(last);
  const isIdRequest = !isNaN(id);
  if (req.method === 'GET') {
    if (isIdRequest) {
      const { data, error } = await supabase.from('skills').select('*').eq('id', id).single();
      if (error) return res.status(404).json({ error: error.message });
      res.status(200).json(data);
    } else {
      const category = url.searchParams.get('category');
      let q = supabase.from('skills').select('*').order('category').order('order_index');
      if (category) q = q.eq('category', category);
      const { data, error } = await q;
      if (error) return res.status(500).json({ error: error.message });
      res.status(200).json(data);
    }
  } else if (req.method === 'POST') {
    const { data, error } = await supabase.from('skills').insert(req.body || {}).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  } else if (req.method === 'PUT' && isIdRequest) {
    const { data, error } = await supabase.from('skills').update({ ...(req.body||{}), updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  } else if (req.method === 'DELETE' && isIdRequest) {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ message: 'Deleted' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
