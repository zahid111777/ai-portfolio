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
  if (req.method === 'GET') {
    if (isIdRequest) {
      const { data: exp, error: e1 } = await supabase.from('experiences').select('*').eq('id', id).single();
      if (e1) return res.status(404).json({ error: e1.message });
      const [r, a, t] = await Promise.all([
        supabase.from('experience_responsibilities').select('*').eq('experience_id', id).order('order_index'),
        supabase.from('experience_achievements').select('*').eq('experience_id', id).order('order_index'),
        supabase.from('experience_technologies').select('*').eq('experience_id', id)
      ]);
      res.status(200).json({ ...exp, responsibilities: r.data||[], achievements: a.data||[], projects: [], technologies: t.data||[] });
    } else {
      const { data, error } = await supabase.from('experiences').select('*').order('order_index');
      if (error) return res.status(500).json({ error: error.message });
      const result = await Promise.all(data.map(async (exp) => {
        const [r, a, t] = await Promise.all([
          supabase.from('experience_responsibilities').select('*').eq('experience_id', exp.id).order('order_index'),
          supabase.from('experience_achievements').select('*').eq('experience_id', exp.id).order('order_index'),
          supabase.from('experience_technologies').select('*').eq('experience_id', exp.id)
        ]);
        return { ...exp, responsibilities: r.data||[], achievements: a.data||[], projects: [], technologies: t.data||[] };
      }));
      res.status(200).json(result);
    }
  } else if (req.method === 'POST') {
    const { responsibilities, achievements, technologies, projects, ...expData } = req.body || {};
    const { data, error } = await supabase.from('experiences').insert(expData).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ ...data, responsibilities: [], achievements: [], projects: [], technologies: [] });
  } else if (req.method === 'PUT' && isIdRequest) {
    const { responsibilities, achievements, technologies, projects, ...expData } = req.body || {};
    const { data, error } = await supabase.from('experiences').update({ ...expData, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  } else if (req.method === 'DELETE' && isIdRequest) {
    const { error } = await supabase.from('experiences').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ message: 'Deleted' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
