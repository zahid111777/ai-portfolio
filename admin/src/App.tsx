import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ModernLogin from './components/ModernLogin';
import ModernDashboard from './components/ModernDashboard';
import { authService } from './services';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          await authService.getCurrentUser();
          setIsAuthenticated(true);
        } catch (error) {
          authService.logout();
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/" replace /> : 
              <ModernLogin onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/*" 
            element={
              isAuthenticated ? 
              <ModernDashboard onLogout={handleLogout} /> : 
              <Navigate to="/login" replace />
            } 
          />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;