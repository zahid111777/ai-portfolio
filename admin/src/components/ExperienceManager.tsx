import React, { useState, useEffect } from 'react';
import { experienceService } from '../services';
import { Experience } from '../types';

const ExperienceManager: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    duration: '',
    location: '',
    employment_type: 'Full-time',
    order_index: 0,
    responsibilities: [] as { description: string; order_index: number }[],
    achievements: [] as { description: string; order_index: number }[],
    projects: [] as { name: string; description: string; order_index: number }[],
    technologies: [] as { name: string }[]
  });

  const [newResponsibility, setNewResponsibility] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [newTechnology, setNewTechnology] = useState('');

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const data = await experienceService.getAll();
      setExperiences(data.sort((a, b) => a.order_index - b.order_index));
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      duration: '',
      location: '',
      employment_type: 'Full-time',
      order_index: experiences.length,
      responsibilities: [],
      achievements: [],
      projects: [],
      technologies: []
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = async (id: number) => {
    try {
      const experience = await experienceService.getById(id);
      setFormData({
        title: experience.title,
        company: experience.company,
        duration: experience.duration,
        location: experience.location,
        employment_type: experience.employment_type,
        order_index: experience.order_index,
        responsibilities: experience.responsibilities.map(r => ({ description: r.description, order_index: r.order_index })),
        achievements: experience.achievements.map(a => ({ description: a.description, order_index: a.order_index })),
        projects: experience.projects.map(p => ({ name: p.name, description: p.description || '', order_index: p.order_index })),
        technologies: experience.technologies.map(t => ({ name: t.name }))
      });
      setEditingId(id);
      setShowForm(true);
    } catch (error: any) {
      setMessage({ type: 'error', text: 'Failed to load experience details' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;

    try {
      await experienceService.delete(id);
      setMessage({ type: 'success', text: 'Experience deleted successfully!' });
      await loadExperiences();
    } catch (error: any) {
      setMessage({ type: 'error', text: 'Failed to delete experience' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      if (editingId) {
        await experienceService.update(editingId, formData);
        setMessage({ type: 'success', text: 'Experience updated successfully!' });
      } else {
        await experienceService.create(formData);
        setMessage({ type: 'success', text: 'Experience created successfully!' });
      }
      resetForm();
      await loadExperiences();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.detail || 'Failed to save experience' });
    } finally {
      setSaving(false);
    }
  };

  const addResponsibility = () => {
    if (!newResponsibility.trim()) return;
    setFormData({
      ...formData,
      responsibilities: [...formData.responsibilities, { description: newResponsibility, order_index: formData.responsibilities.length }]
    });
    setNewResponsibility('');
  };

  const removeResponsibility = (index: number) => {
    setFormData({
      ...formData,
      responsibilities: formData.responsibilities.filter((_, i) => i !== index)
    });
  };

  const addAchievement = () => {
    if (!newAchievement.trim()) return;
    setFormData({
      ...formData,
      achievements: [...formData.achievements, { description: newAchievement, order_index: formData.achievements.length }]
    });
    setNewAchievement('');
  };

  const removeAchievement = (index: number) => {
    setFormData({
      ...formData,
      achievements: formData.achievements.filter((_, i) => i !== index)
    });
  };

  const addProject = () => {
    if (!newProject.name.trim()) return;
    setFormData({
      ...formData,
      projects: [...formData.projects, { ...newProject, order_index: formData.projects.length }]
    });
    setNewProject({ name: '', description: '' });
  };

  const removeProject = (index: number) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_, i) => i !== index)
    });
  };

  const addTechnology = () => {
    if (!newTechnology.trim()) return;
    setFormData({
      ...formData,
      technologies: [...formData.technologies, { name: newTechnology }]
    });
    setNewTechnology('');
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ml-auto"
          >
            <span className="flex items-center">
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Experience
            </span>
          </button>
        )}
      </div>

      {message && (
        <div className={`p-4 rounded-xl shadow-lg border ${
          message.type === 'success' 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800' 
            : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-center">
            {message.type === 'success' ? (
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      )}

      {showForm ? (
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-2 mr-3">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            {editingId ? 'Edit Experience' : 'Add Experience'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Jan 2020 - Present"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                <select
                  value={formData.employment_type}
                  onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                  <option>Freelance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Index</label>
                <input
                  type="number"
                  required
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Responsibilities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newResponsibility}
                  onChange={(e) => setNewResponsibility(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResponsibility())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Add responsibility"
                />
                <button type="button" onClick={addResponsibility} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  Add
                </button>
              </div>
              <ul className="space-y-1">
                {formData.responsibilities.map((resp, index) => (
                  <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">{resp.description}</span>
                    <button type="button" onClick={() => removeResponsibility(index)} className="text-red-600 hover:text-red-800 text-sm">
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Achievements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Add achievement"
                />
                <button type="button" onClick={addAchievement} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  Add
                </button>
              </div>
              <ul className="space-y-1">
                {formData.achievements.map((ach, index) => (
                  <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">{ach.description}</span>
                    <button type="button" onClick={() => removeAchievement(index)} className="text-red-600 hover:text-red-800 text-sm">
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Projects</label>
              <div className="space-y-2 mb-2">
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Project name"
                />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Project description (optional)"
                  />
                  <button type="button" onClick={addProject} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                    Add
                  </button>
                </div>
              </div>
              <ul className="space-y-1">
                {formData.projects.map((proj, index) => (
                  <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div className="text-sm">
                      <div className="font-medium">{proj.name}</div>
                      {proj.description && <div className="text-gray-600 text-xs">{proj.description}</div>}
                    </div>
                    <button type="button" onClick={() => removeProject(index)} className="text-red-600 hover:text-red-800 text-sm">
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Add technology"
                />
                <button type="button" onClick={addTechnology} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {tech.name}
                    <button type="button" onClick={() => removeTechnology(index)} className="ml-2 text-blue-600 hover:text-blue-800">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100 hover-lift">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company} • {exp.duration}</p>
                  <p className="text-sm text-gray-500">{exp.location} • {exp.employment_type}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(exp.id)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-700">Responsibilities: {exp.responsibilities.length}</p>
                  <p className="font-medium text-gray-700">Achievements: {exp.achievements.length}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Projects: {exp.projects.length}</p>
                  <p className="font-medium text-gray-700">Technologies: {exp.technologies.length}</p>
                </div>
              </div>
            </div>
          ))}
          {experiences.length === 0 && (
            <p className="text-center text-gray-500 py-8">No experiences added yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExperienceManager;
