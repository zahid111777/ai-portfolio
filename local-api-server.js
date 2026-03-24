/**
 * Local API server for development.
 * Serves the Vercel serverless functions (api/) as Express routes on port 8000.
 * Run with: node local-api-server.js
 * Admin login: username=admin, password=admin123
 */

require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 8000;

// Parse JSON and URL-encoded bodies (needed for /api/token login)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount all API routes
// Note: routes with sub-paths (e.g., /experience/1) need a wildcard suffix
app.all('/api/token',                  require('./api/token'));
app.all('/api/auth/login',             require('./api/auth/login'));
app.all('/api/users/me',               require('./api/users/me'));
app.all('/api/about/info',             require('./api/about/info'));
app.all('/api/about/highlights*',      require('./api/about/highlights'));
app.all('/api/experience*',            require('./api/experience'));
app.all('/api/projects*',              require('./api/projects'));
app.all('/api/skills/grouped',         require('./api/skills/grouped'));
app.all('/api/skills/categories',      require('./api/skills/categories'));
app.all('/api/skills*',                require('./api/skills'));
app.all('/api/contact/info',           require('./api/contact/info'));
app.all('/api/contact/messages*',      require('./api/contact/messages'));
app.all('/api/health',                 require('./api/health'));

app.listen(PORT, () => {
  console.log(`\n✅ Local API server running at http://localhost:${PORT}`);
  console.log('   Admin login credentials: admin / admin123');
  console.log('   Health check: http://localhost:8000/api/health\n');
});
