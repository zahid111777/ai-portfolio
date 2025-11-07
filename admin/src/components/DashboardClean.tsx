import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AboutManagerNew from './AboutManagerNew';
import ExperienceManager from './ExperienceManager';
import ProjectManager from './ProjectManager';
import SkillManager from './SkillManager';
import ContactManager from './ContactManager';
import MessageManager from './MessageManager';

interface DashboardProps {
  onLogout: () => void;
}

const DashboardClean: React.FC<DashboardProps> = ({ onLogout }) => {
  const location = useLocation();

  const navigation = [
    { name: 'About', href: '/' },
    { name: 'Experience', href: '/experience' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Contact', href: '/contact' },
    { name: 'Messages', href: '/messages' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-white border-r border-gray-200">
            {/* Logo */}
            <div className="flex items-center h-16 flex-shrink-0 px-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
              <h1 className="text-xl font-bold text-white">Portfolio Admin</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="flex-shrink-0 border-t border-gray-200 p-4">
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top bar */}
          <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              {navigation.find(nav => nav.href === location.pathname)?.name || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                <span className="w-2 h-2 mr-1.5 bg-green-500 rounded-full"></span>
                Online
              </span>
            </div>
          </header>

          {/* Main content area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<AboutManagerNew />} />
                <Route path="/experience" element={<ExperienceManager />} />
                <Route path="/projects" element={<ProjectManager />} />
                <Route path="/skills" element={<SkillManager />} />
                <Route path="/contact" element={<ContactManager />} />
                <Route path="/messages" element={<MessageManager />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardClean;
