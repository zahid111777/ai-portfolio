import React, { useState, useEffect } from 'react';
import { aboutService, uploadService } from '../services';
import { AboutInfo, Highlight } from '../types';

const AboutManager: React.FC = () => {
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    profile_image: '',
    years_experience: 0,
    ai_projects: 0,
    ml_models: 0,
    accuracy_rate: 0,
    cv_url: ''
  });

  // Highlight form state
  const [highlightForm, setHighlightForm] = useState({
    id: null as number | null,
    icon: '',
    text: '',
    order_index: 0
  });
  const [showHighlightForm, setShowHighlightForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [info, highlightsList] = await Promise.all([
        aboutService.getInfo(),
        aboutService.getHighlights()
      ]);
      
      if (info) {
        setAboutInfo(info);
        setFormData({
          name: info.name,
          title: info.title,
          description: info.description,
          profile_image: info.profile_image || '',
          years_experience: info.years_experience,
          ai_projects: info.ai_projects,
          ml_models: info.ml_models,
          accuracy_rate: info.accuracy_rate,
          cv_url: info.cv_url || ''
        });
      }
      
      setHighlights(highlightsList.sort((a, b) => a.order_index - b.order_index));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      if (aboutInfo?.id) {
        await aboutService.updateInfo(formData);
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        await aboutService.createInfo(formData);
        setMessage({ type: 'success', text: 'Profile created successfully!' });
      }
      await loadData();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.detail || 'Failed to save profile' });
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
      setFormData({ ...formData, profile_image: result.url });
      setMessage({ type: 'success', text: 'Image uploaded successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.detail || 'Failed to upload image' });
    } finally {
      setUploading(false);
    }
  };

  const handleHighlightSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      if (highlightForm.id) {
        await aboutService.updateHighlight(highlightForm.id, {
          icon: highlightForm.icon,
          text: highlightForm.text,
          order_index: highlightForm.order_index
        });
        setMessage({ type: 'success', text: 'Highlight updated successfully!' });
      } else {
        await aboutService.createHighlight({
          icon: highlightForm.icon,
          text: highlightForm.text,
          order_index: highlights.length
        });
        setMessage({ type: 'success', text: 'Highlight added successfully!' });
      }
      
      setShowHighlightForm(false);
      setHighlightForm({ id: null, icon: '', text: '', order_index: 0 });
      await loadData();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.detail || 'Failed to save highlight' });
    } finally {
      setSaving(false);
    }
  };

  const editHighlight = (highlight: Highlight) => {
    setHighlightForm({
      id: highlight.id,
      icon: highlight.icon,
      text: highlight.text,
      order_index: highlight.order_index
    });
    setShowHighlightForm(true);
  };

  const deleteHighlight = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this highlight?')) return;

    try {
      await aboutService.deleteHighlight(id);
      setMessage({ type: 'success', text: 'Highlight deleted successfully!' });
      await loadData();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.detail || 'Failed to delete highlight' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {message && (
        <div className={`p-4 rounded-lg shadow-md border-l-4 ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-500 text-green-800' 
            : 'bg-red-50 border-red-500 text-red-800'
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

      {/* Profile Information Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 border border-gray-200">
        <div className="mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Profile Information</h3>
              <p className="text-gray-500 text-sm mt-1">Manage your personal information and profile details</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">1</span>
              Basic Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., AI Engineer & ML Specialist"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Description *</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Brief description about yourself and your expertise..."
              />
            </div>
          </div>

          {/* Profile Image Section */}
          <div className="border-t border-gray-200 pt-8">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">2</span>
              Profile Picture
            </h4>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0">
                  {formData.profile_image ? (
                    <div className="relative">
                      <img src={formData.profile_image} alt="Profile" className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white" />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1.5">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-400">
                      <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <label className="cursor-pointer inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {uploading ? 'Uploading...' : 'Choose Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-600 mt-3">
                    Supported formats: JPG, PNG, GIF<br/>
                    Maximum file size: 5MB
                  </p>
                  {formData.profile_image && (
                    <div className="mt-3 inline-flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Image uploaded: {formData.profile_image.split('/').pop()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="border-t border-gray-200 pt-8">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">3</span>
              Professional Statistics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.years_experience}
                    onChange={(e) => setFormData({ ...formData, years_experience: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">years</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">AI Projects Completed *</label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.ai_projects}
                    onChange={(e) => setFormData({ ...formData, ai_projects: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">projects</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ML Models Deployed *</label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.ml_models}
                    onChange={(e) => setFormData({ ...formData, ml_models: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">models</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model Accuracy Rate *</label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.accuracy_rate}
                    onChange={(e) => setFormData({ ...formData, accuracy_rate: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0.0"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-t border-gray-200 pt-8">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold mr-2">4</span>
              Additional Resources
            </h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CV/Resume URL</label>
              <input
                type="url"
                value={formData.cv_url}
                onChange={(e) => setFormData({ ...formData, cv_url: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="https://example.com/your-resume.pdf"
              />
              <p className="text-sm text-gray-500 mt-1">Optional: Link to your CV or resume PDF</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-200 pt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => loadData()}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              {saving ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving Changes...
                </span>
              ) : (
                <span className="flex items-center">
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Profile
                </span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Highlights Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 border border-gray-200">
        <div className="mb-6 pb-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-4">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Career Highlights</h3>
              <p className="text-gray-500 text-sm mt-1">Showcase your key achievements and expertise</p>
            </div>
          </div>
          <button
            onClick={() => {
              setHighlightForm({ id: null, icon: '', text: '', order_index: highlights.length });
              setShowHighlightForm(true);
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <span className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Highlight
            </span>
          </button>
        </div>

        {showHighlightForm && (
          <form onSubmit={handleHighlightSubmit} className="mb-6 p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <input
                  type="text"
                  required
                  value={highlightForm.icon}
                  onChange={(e) => setHighlightForm({ ...highlightForm, icon: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., 🎯 ⚡ 🚀"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Highlight Text</label>
                <input
                  type="text"
                  required
                  value={highlightForm.text}
                  onChange={(e) => setHighlightForm({ ...highlightForm, text: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Deep Learning Specialist"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowHighlightForm(false);
                  setHighlightForm({ id: null, icon: '', text: '', order_index: 0 });
                }}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-white font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                {saving ? 'Saving...' : highlightForm.id ? 'Update Highlight' : 'Add Highlight'}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {highlights.map((highlight, index) => (
            <div key={highlight.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{highlight.icon}</span>
                <div>
                  <p className="text-gray-900 font-medium">{highlight.text}</p>
                  <p className="text-xs text-gray-500 mt-1">Position: {index + 1}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => editHighlight(highlight)}
                  className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHighlight(highlight.id)}
                  className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {highlights.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <p className="text-gray-500 mt-3">No highlights added yet</p>
              <p className="text-gray-400 text-sm mt-1">Click "Add Highlight" to create your first highlight</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutManager;
