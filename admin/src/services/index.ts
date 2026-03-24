import api from './api';
import { 
  AboutInfo, 
  AboutInfoForm, 
  Highlight,
  Experience,
  ExperienceForm,
  Project,
  ProjectForm,
  Skill,
  SkillForm,
  ContactInfo,
  ContactInfoForm,
  ContactMessage
} from '../types';

// Authentication
export const authService = {
  login: async (username: string, password: string) => {
    try {
      // Use URLSearchParams instead of FormData for proper form encoding
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
      
      console.log('Attempting login...');
      console.log('API URL:', api.defaults.baseURL);
      console.log('Username:', username);
      console.log('Sending request with URLSearchParams');
      
      const response = await api.post('/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      
      const { access_token } = response.data;
      
      console.log('Login successful, token received:', access_token);
      localStorage.setItem('token', access_token);
      return access_token;
    } catch (error: any) {
      console.error('Login error full details:', error);
      console.error('Error response:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// About
export const aboutService = {
  getInfo: async (): Promise<AboutInfo> => {
    const response = await api.get('/about/info');
    return response.data;
  },

  updateInfo: async (data: AboutInfoForm): Promise<AboutInfo> => {
    const response = await api.put('/about/info', data);
    return response.data;
  },

  createInfo: async (data: AboutInfoForm): Promise<AboutInfo> => {
    const response = await api.post('/about/info', data);
    return response.data;
  },

  getHighlights: async (): Promise<Highlight[]> => {
    const response = await api.get('/about/highlights');
    return response.data;
  },

  createHighlight: async (data: { icon: string; text: string; order_index: number }): Promise<Highlight> => {
    const response = await api.post('/about/highlights', data);
    return response.data;
  },

  updateHighlight: async (id: number, data: { icon: string; text: string; order_index: number }): Promise<Highlight> => {
    const response = await api.put(`/about/highlights/${id}`, data);
    return response.data;
  },

  deleteHighlight: async (id: number): Promise<void> => {
    await api.delete(`/about/highlights/${id}`);
  }
};

// Experience
export const experienceService = {
  getAll: async (): Promise<Experience[]> => {
    const response = await api.get('/experience');
    return response.data;
  },

  getById: async (id: number): Promise<Experience> => {
    const response = await api.get(`/experience/${id}`);
    return response.data;
  },

  create: async (data: ExperienceForm): Promise<Experience> => {
    const response = await api.post('/experience', data);
    return response.data;
  },

  update: async (id: number, data: Partial<ExperienceForm>): Promise<Experience> => {
    const response = await api.put(`/experience/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/experience/${id}`);
  }
};

// Projects
export const projectService = {
  getAll: async (featured?: boolean): Promise<Project[]> => {
    const response = await api.get('/projects', { params: { featured } });
    return response.data;
  },

  getById: async (id: number): Promise<Project> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  create: async (data: ProjectForm): Promise<Project> => {
    const response = await api.post('/projects', data);
    return response.data;
  },

  update: async (id: number, data: Partial<ProjectForm>): Promise<Project> => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/projects/${id}`);
  }
};

// Skills
export const skillService = {
  getAll: async (category?: string): Promise<Skill[]> => {
    const response = await api.get('/skills', { params: { category } });
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get('/skills/categories');
    return response.data;
  },

  getById: async (id: number): Promise<Skill> => {
    const response = await api.get(`/skills/${id}`);
    return response.data;
  },

  create: async (data: SkillForm): Promise<Skill> => {
    const response = await api.post('/skills', data);
    return response.data;
  },

  update: async (id: number, data: Partial<SkillForm>): Promise<Skill> => {
    const response = await api.put(`/skills/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/skills/${id}`);
  }
};

// Contact
export const contactService = {
  getInfo: async (): Promise<ContactInfo> => {
    const response = await api.get('/contact/info');
    return response.data;
  },

  updateInfo: async (data: ContactInfoForm): Promise<ContactInfo> => {
    const response = await api.put('/contact/info', data);
    return response.data;
  },

  createInfo: async (data: ContactInfoForm): Promise<ContactInfo> => {
    const response = await api.post('/contact/info', data);
    return response.data;
  },

  getMessages: async (unreadOnly = false): Promise<ContactMessage[]> => {
    const response = await api.get('/contact/messages', { params: { unread_only: unreadOnly } });
    return response.data;
  },

  markMessageAsRead: async (id: number): Promise<void> => {
    await api.put(`/contact/messages/${id}/read`);
  },

  deleteMessage: async (id: number): Promise<void> => {
    await api.delete(`/contact/messages/${id}`);
  }
};

// File Upload
export const uploadService = {
  uploadImage: async (file: File): Promise<{ filename: string; url: string; size: number; content_type: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteFile: async (filename: string): Promise<void> => {
    await api.delete(`/upload/files/${filename}`);
  },

  listFiles: async (): Promise<{ filename: string; url: string; size: number; created_at: number }[]> => {
    const response = await api.get('/upload/files');
    return response.data;
  }
};