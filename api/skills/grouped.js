const supabase = require('../_supabase');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category')
      .order('order_index');

    if (error) return res.status(500).json({ error: error.message });

    const grouped = data.reduce((acc, skill) => {
      const cat = acc.find(c => c.category === skill.category);
      const entry = { name: skill.name, level: skill.proficiency };
      if (cat) { cat.skills.push(entry); }
      else { acc.push({ category: skill.category, skills: [entry] }); }
      return acc;
    }, []);

    res.status(200).json(grouped);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};