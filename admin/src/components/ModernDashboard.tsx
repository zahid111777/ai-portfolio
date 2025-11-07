// Modern Dashboard Layout with Beautiful UI
import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import AboutManagerNew from './AboutManagerNew';
import ExperienceManager from './ExperienceManager';
import ProjectManager from './ProjectManager';
import SkillManager from './SkillManager';
import ContactManager from './ContactManager';
import MessageManager from './MessageManager';

interface DashboardProps {
  onLogout: () => void;
}

const ModernDashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();

  const menuItems = [
    { path: '/', label: 'About', icon: '👤' },
    { path: '/experience', label: 'Experience', icon: '💼' },
    { path: '/projects', label: 'Projects', icon: '🚀' },
    { path: '/skills', label: 'Skills', icon: '⚡' },
    { path: '/contact', label: 'Contact', icon: '📧' },
    { path: '/messages', label: 'Messages', icon: '💬' },
  ];

  const getPageTitle = () => {
    const item = menuItems.find(item => item.path === location.pathname);
    return item ? item.label : 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none lg:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Portfolio Admin
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
              <div className="hidden md:flex items-center space-x-2 bg-green-50 dark:bg-green-900/30 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-green-700 dark:text-green-400">Online</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-16 bottom-0 bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 z-40 ${
          isSidebarOpen ? 'w-64' : 'w-0 -translate-x-full'
        } lg:translate-x-0 lg:w-64`}>
          <nav className="h-full overflow-y-auto py-6">
            <div className="space-y-1 px-3">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:translate-x-1'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{getPageTitle()}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your portfolio {getPageTitle().toLowerCase()}</p>
            </div>

            {/* Content Area with Beautiful Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 animate-fadeIn">
              <Routes>
                <Route path="/" element={<AboutManagerNew />} />
                <Route path="/experience" element={<ExperienceManager />} />
                <Route path="/projects" element={<ProjectManager />} />
                <Route path="/skills" element={<SkillManager />} />
                <Route path="/contact" element={<ContactManager />} />
                <Route path="/messages" element={<MessageManager />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ModernDashboard;
