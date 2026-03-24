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
  const parts = url.pathname.split('/').filter(Boolean);
  const msgIdx = parts.indexOf('messages');
  const id = parseInt(parts[msgIdx + 1]);
  const isIdRequest = !isNaN(id);
  const isReadAction = parts[msgIdx + 2] === 'read';
  if (req.method === 'GET') {
    const unreadOnly = url.searchParams.get('unread_only') === 'true';
    let q = supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (unreadOnly) q = q.eq('is_read', false);
    const { data, error } = await q;
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  } else if (req.method === 'POST' && !isIdRequest) {
    const body = req.body || {};
    const { data, error } = await supabase.from('contact_messages').insert({ name: body.name||'Anonymous', email: body.email||'', subject: body.subject||'', message: body.message||'', is_read: false }).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ message: 'Message sent successfully', id: data.id });
  } else if (req.method === 'PUT' && isIdRequest && isReadAction) {
    const { data, error } = await supabase.from('contact_messages').update({ is_read: true }).eq('id', id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  } else if (req.method === 'DELETE' && isIdRequest) {
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ message: 'Deleted' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
