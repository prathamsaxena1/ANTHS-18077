// utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8001';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests when available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle common response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle unauthorized errors (token expired, etc.)
    if (response && response.status === 401) {
      // Clear auth data and redirect to login if needed
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // You might want to redirect to login here or handle it in components
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Hotel-related API calls
export const hotelApi = {
  getAll: async () => {
    const response = await apiClient.get('/api/hotels');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/api/hotels/${id}`);
    return response.data;
  },
  
  create: async (hotelData) => {
    const response = await apiClient.post('/api/hotels', hotelData);
    return response.data;
  },
  
  update: async (id, hotelData) => {
    const response = await apiClient.put(`/api/hotels/${id}`, hotelData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await apiClient.delete(`/api/hotels/${id}`);
    return response.data;
  },
  
  search: async (params) => {
    const response = await apiClient.get('/api/hotels/search', { params });
    return response.data;
  }
};

// Auth-related API calls
export const authApi = {
  login: async (credentials) => {
    const response = await apiClient.post('/api/auth/login', credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await apiClient.post('/api/auth/register', userData);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
  },
  
  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true };
  }
};

export default apiClient;