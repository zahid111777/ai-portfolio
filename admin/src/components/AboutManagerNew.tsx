import React, { useState, useEffect } from 'react';
import { aboutService, uploadService } from '../services';
import { AboutInfo, Highlight } from '../types';
import { Card, CardHeader, CardBody, Button, Input, Textarea, Alert } from './ui';
import { notifyPortfolioUpdate } from '../utils/dataUpdateBroadcast';

const AboutManagerNew: React.FC = () => {
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showHighlightForm, setShowHighlightForm] = useState(false);

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
      setMessage({ type: 'error', text: 'Failed to load data' });
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
      // Notify portfolio to refresh about data
      notifyPortfolioUpdate('about');
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
        await aboutService.updateHighlight(highlightForm.id, highlightForm);
        setMessage({ type: 'success', text: 'Highlight updated successfully!' });
      } else {
        await aboutService.createHighlight(highlightForm);
        setMessage({ type: 'success', text: 'Highlight created successfully!' });
      }
      setShowHighlightForm(false);
      setHighlightForm({ id: null, icon: '', text: '', order_index: 0 });
      await loadData();
      // Notify portfolio to refresh highlights data
      notifyPortfolioUpdate('highlights');
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {message && (
        <Alert 
          type={message.type} 
          message={message.text} 
          onClose={() => setMessage(null)} 
        />
      )}

      {/* Profile Information Card */}
      <Card>
        <CardHeader
          title="Profile Information"
          subtitle="Manage your personal information and profile details"
          icon={
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        />
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
              />
              <Input
                label="Professional Title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., AI Engineer & ML Specialist"
              />
            </div>

            <Textarea
              label="Professional Description"
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description about yourself..."
            />

            {/* Profile Image */}
            <div className="border-t pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Profile Picture</h4>
              <div className="flex items-center space-x-4">
                {formData.profile_image ? (
                  <img 
                    src={formData.profile_image} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full object-cover border-4 border-gray-100"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <div>
                  <label className="cursor-pointer inline-block">
                    <span className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500">
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max 5MB</p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="border-t pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Professional Statistics</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Input
                  label="Years of Experience"
                  type="number"
                  required
                  min="0"
                  value={formData.years_experience}
                  onChange={(e) => setFormData({ ...formData, years_experience: parseInt(e.target.value) })}
                />
                <Input
                  label="AI Projects"
                  type="number"
                  required
                  min="0"
                  value={formData.ai_projects}
                  onChange={(e) => setFormData({ ...formData, ai_projects: parseInt(e.target.value) })}
                />
                <Input
                  label="ML Models"
                  type="number"
                  required
                  min="0"
                  value={formData.ml_models}
                  onChange={(e) => setFormData({ ...formData, ml_models: parseInt(e.target.value) })}
                />
                <Input
                  label="Accuracy Rate (%)"
                  type="number"
                  required
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.accuracy_rate}
                  onChange={(e) => setFormData({ ...formData, accuracy_rate: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            {/* CV URL */}
            <div className="border-t pt-6">
              <Input
                label="CV/Resume URL"
                type="url"
                value={formData.cv_url}
                onChange={(e) => setFormData({ ...formData, cv_url: e.target.value })}
                placeholder="https://example.com/your-resume.pdf"
                helperText="Optional: Link to your CV or resume PDF"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 border-t pt-6">
              <Button type="button" variant="secondary" onClick={() => loadData()}>
                Reset
              </Button>
              <Button type="submit" variant="primary" isLoading={saving}>
                {saving ? 'Saving...' : 'Save Profile'}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* Highlights Card */}
      <Card>
        <CardHeader
          title="Career Highlights"
          subtitle="Showcase your key achievements and expertise"
          icon={
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          }
          action={
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setHighlightForm({ id: null, icon: '', text: '', order_index: highlights.length });
                setShowHighlightForm(true);
              }}
              icon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              Add Highlight
            </Button>
          }
        />
        <CardBody>
          {showHighlightForm && (
            <form onSubmit={handleHighlightSubmit} className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Icon"
                  type="text"
                  required
                  value={highlightForm.icon}
                  onChange={(e) => setHighlightForm({ ...highlightForm, icon: e.target.value })}
                  placeholder="e.g., 🎯 ⚡ 🚀"
                />
                <Input
                  label="Highlight Text"
                  type="text"
                  required
                  value={highlightForm.text}
                  onChange={(e) => setHighlightForm({ ...highlightForm, text: e.target.value })}
                  placeholder="e.g., Deep Learning Specialist"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowHighlightForm(false);
                    setHighlightForm({ id: null, icon: '', text: '', order_index: 0 });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" isLoading={saving}>
                  {highlightForm.id ? 'Update' : 'Add'} Highlight
                </Button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {highlights.map((highlight, index) => (
              <div
                key={highlight.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{highlight.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{highlight.text}</p>
                    <p className="text-xs text-gray-500">Position: {index + 1}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => editHighlight(highlight)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteHighlight(highlight.id)}
                  >
                    Delete
                  </Button>
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
        </CardBody>
      </Card>
    </div>
  );
};

export default AboutManagerNew;
