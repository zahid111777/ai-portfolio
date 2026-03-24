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
  const id = parseInt(parts[parts.length - 1]);
  const isIdRequest = !isNaN(id);
  const withRelated = async (proj) => {
    const [t, f] = await Promise.all([
      supabase.from('project_technologies').select('*').eq('project_id', proj.id),
      supabase.from('project_features').select('*').eq('project_id', proj.id).order('order_index')
    ]);
    return { ...proj, technologies: t.data||[], features: f.data||[], metrics: [] };
  };
  if (req.method === 'GET') {
    if (isIdRequest) {
      const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
      if (error) return res.status(404).json({ error: error.message });
      res.status(200).json(await withRelated(data));
    } else {
      const featured = url.searchParams.get('featured');
      let q = supabase.from('projects').select('*').order('order_index');
      if (featured !== null) q = q.eq('is_featured', featured === 'true');
      const { data, error } = await q;
      if (error) return res.status(500).json({ error: error.message });
      res.status(200).json(await Promise.all(data.map(withRelated)));
    }
  } else if (req.method === 'POST') {
    const { technologies, features, metrics, ...projData } = req.body || {};
    const { data, error } = await supabase.from('projects').insert(projData).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ ...data, technologies: [], features: [], metrics: [] });
  } else if (req.method === 'PUT' && isIdRequest) {
    const { technologies, features, metrics, ...projData } = req.body || {};
    const { data, error } = await supabase.from('projects').update({ ...projData, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  } else if (req.method === 'DELETE' && isIdRequest) {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ message: 'Deleted' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
