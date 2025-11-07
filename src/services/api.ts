// API Base URL - supports both development and production
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://ai-portfolio-backend.onrender.com/api'  // Update this URL after deployment
    : 'http://localhost:8000/api');

// Simple fetch wrapper for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status}`);
  }

  return response.json();
};

// About API
export const aboutAPI = {
  getInfo: () => apiCall('/about/info'),
  getHighlights: () => apiCall('/about/highlights'),
};

// Experience API
export const experienceAPI = {
  getAll: () => apiCall('/experience'),
};

// Projects API
export const projectsAPI = {
  getAll: (featured?: boolean) => {
    const params = featured ? '?featured=true' : '';
    return apiCall(`/projects${params}`);
  },
};

// Skills API
export const skillsAPI = {
  getAll: (category?: string) => {
    const params = category ? `?category=${category}` : '';
    return apiCall(`/skills/grouped${params}`);
  },
  getCategories: () => apiCall('/skills/categories'),
};

// Contact API
export const contactAPI = {
  getInfo: () => apiCall('/contact/info'),
  sendMessage: (data: any) => apiCall('/contact/messages', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};