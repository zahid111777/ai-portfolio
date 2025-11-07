import React, { useState } from 'react';

const AdminPanel: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch('/api/token', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        setIsLoggedIn(true);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  if (isLoggedIn) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin panel!</p>
        <button onClick={() => {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        }}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        width: '400px',
        maxWidth: '90%'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
          Portfolio Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
              required
            />
          </div>
          {error && (
            <div style={{ color: 'red', marginBottom: '20px', textAlign: 'center' }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#888', fontSize: '14px' }}>
          Default credentials: admin / admin123
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;