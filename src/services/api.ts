import { 
  fallbackAboutInfo, 
  fallbackHighlights, 
  fallbackExperiences, 
  fallbackProjects, 
  fallbackSkills,
  fallbackSkillCategories,
  fallbackSpecializations
} from '../data/fallbackData';

const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (typeof window !== 'undefined' && !window.location.hostname.includes('localhost') ? '/api' : 'http://localhost:8000/api');
const USE_FALLBACK = process.env.REACT_APP_USE_FALLBACK === 'true' || false;

// Simple fetch wrapper for API calls with fallback support
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  // Return fallback data if enabled
  if (USE_FALLBACK) {
    return getFallbackData(endpoint);
  }

  try {
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
  } catch (error) {
    console.warn(`API call failed for ${endpoint}, using fallback data:`, error);
    return getFallbackData(endpoint);
  }
};

// Helper function to get fallback data based on endpoint
const getFallbackData = (endpoint: string) => {
  // Handle projects with query parameters
  if (endpoint.startsWith('/projects')) {
    return fallbackProjects;
  }
  // Handle skills endpoints
  if (endpoint.startsWith('/skills/grouped')) {
    return fallbackSkillCategories;
  }
  if (endpoint.startsWith('/skills/categories')) {
    return fallbackSpecializations;
  }
  if (endpoint.startsWith('/skills')) {
    return fallbackSkills;
  }
  
  switch (endpoint) {
    case '/about/info':
      return fallbackAboutInfo;
    case '/about/highlights':
      return fallbackHighlights;
    case '/experience':
      return fallbackExperiences;
    default:
      return [];
  }
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