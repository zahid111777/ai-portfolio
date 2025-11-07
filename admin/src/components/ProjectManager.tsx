import React, { useState, useEffect } from 'react';
import { projectService, uploadService } from '../services';
import { Project } from '../types';

const ProjectManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    github_url: '',
    live_url: '',
    order_index: 0,
    is_featured: false,
    technologies: [] as { name: string }[],
    features: [] as { description: string; order_index: number }[],
    metrics: [] as { description: string; order_index: number }[]
  });

  const [newTechnology, setNewTechnology] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newMetric, setNewMetric] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAll();
      setProjects(data.sort((a, b) => a.order_index - b.order_index));
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      github_url: '',
      live_url: '',
      order_index: projects.length,
      is_featured: false,
      technologies: [],
      features: [],
      metrics: []
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = async (id: number) => {
    try {
      const project = await projectService.getById(id);
      
      // Parse technologies from string to array of objects if needed
      let techs: any = project.technologies || [];
      if (typeof techs === 'string') {
        techs = (techs as string).split(',').map((t: string) => ({ name: t.trim() }));
      }
      
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image || '',
        github_url: project.github_url || '',
        live_url: project.live_url || '',
        order_index: project.order_index,
        is_featured: project.is_featured,
        technologies: techs,
        features: (project.features || []).map((f: any) => ({ description: f.description, order_index: f.order_index })),
        metrics: (project.metrics || []).map((m: any) => ({ description: m.description, order_index: m.order_index }))
      });
      setEditingId(id);
      setShowForm(true);
    } catch (error: any) {
      setMessage({ type: 'error', text: 'Failed to load project details' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectService.delete(id);
      setMessage({ type: 'success', text: 'Project deleted successfully!' });
      await loadProjects();
    } catch (error: any) {
      setMessage({ type: 'error', text: 'Failed to delete project' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      if (editingId) {
        await projectService.update(editingId, formData);
        setMessage({ type: 'success', text: 'Project updated successfully!' });
      } else {
        await projectService.create(formData);
        setMessage({ type: 'success', text: 'Project created successfully!' });
      }
      resetForm();
      await loadProjects();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.detail || 'Failed to save project' });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const result = await uploadService.uploadImage(file);
      setFormData({ ...formData, image: result.url });
      setMessage({ type: 'success', text: 'Image uploaded successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.detail || 'Failed to upload image' });
    } finally {
      setUploading(false);
    }
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

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFormData({
      ...formData,
      features: [...formData.features, { description: newFeature, order_index: formData.features.length }]
    });
    setNewFeature('');
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const addMetric = () => {
    if (!newMetric.trim()) return;
    setFormData({
      ...formData,
      metrics: [...formData.metrics, { description: newMetric, order_index: formData.metrics.length }]
    });
    setNewMetric('');
  };

  const removeMetric = (index: number) => {
    setFormData({
      ...formData,
      metrics: formData.metrics.filter((_, i) => i !== index)
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
              Add Project
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            {editingId ? 'Edit Project' : 'Add Project'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
                <div className="flex items-center space-x-4">
                  {formData.image && (
                    <img src={formData.image} alt="Project" className="w-32 h-32 rounded object-cover" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="text-sm"
                  />
                  {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://github.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
                <input
                  type="url"
                  value={formData.live_url}
                  onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://..."
                />
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

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-700">
                  Featured Project
                </label>
              </div>
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

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Add feature"
                />
                <button type="button" onClick={addFeature} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  Add
                </button>
              </div>
              <ul className="space-y-1">
                {formData.features.map((feat, index) => (
                  <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">{feat.description}</span>
                    <button type="button" onClick={() => removeFeature(index)} className="text-red-600 hover:text-red-800 text-sm">
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metrics */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Metrics</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newMetric}
                  onChange={(e) => setNewMetric(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMetric())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Add metric"
                />
                <button type="button" onClick={addMetric} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  Add
                </button>
              </div>
              <ul className="space-y-1">
                {formData.metrics.map((metric, index) => (
                  <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">{metric.description}</span>
                    <button type="button" onClick={() => removeMetric(index)} className="text-red-600 hover:text-red-800 text-sm">
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 hover-lift">
              {project.image && (
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  {project.is_featured && (
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">Featured</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {(() => {
                    const techs = typeof project.technologies === 'string' 
                      ? (project.technologies as string).split(',').map((t: string) => ({ name: t.trim() }))
                      : (project.technologies as any[] || []);
                    return techs.slice(0, 3).map((tech: any, index: number) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {typeof tech === 'string' ? tech : tech.name}
                      </span>
                    ));
                  })()}
                  {(() => {
                    const techs = typeof project.technologies === 'string' 
                      ? (project.technologies as string).split(',').map((t: string) => ({ name: t.trim() }))
                      : (project.technologies as any[] || []);
                    return techs.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        +{techs.length - 3}
                      </span>
                    );
                  })()}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project.id)}
                    className="flex-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-8">No projects added yet</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
