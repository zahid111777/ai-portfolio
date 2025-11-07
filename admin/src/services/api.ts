import axios from 'axios';

// Determine API URL with priority order
const API_BASE_URL = (() => {
  // First priority: explicit environment variable
  if (process.env.REACT_APP_API_URL) {
    console.log('Using REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
    return process.env.REACT_APP_API_URL;
  }
  
  // Second priority: production detection
  if (process.env.NODE_ENV === 'production') {
    const prodUrl = 'https://zahidrashid.vercel.app/api';
    console.log('Using production URL:', prodUrl);
    return prodUrl;
  }
  
  // Fallback: development
  const devUrl = 'http://localhost:8000/api';
  console.log('Using development URL:', devUrl);
  return devUrl;
})();

console.log('API Base URL initialized as:', API_BASE_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;