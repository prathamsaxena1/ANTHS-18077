// src/utils/api.js

import axios from 'axios';

// Create an Axios instance with default configurations
const apiClient = axios.create({
  baseURL: 'http://localhost:8001/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from local storage if it exists
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

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with an error status code
      if (error.response.status === 401) {
        // Token expired or invalid - could trigger logout here
        localStorage.removeItem('token');
        // You might want to redirect to login page
        // Example: window.location.href = '/login';
      }
    } else if (error.request) {
      // Request was made but no response received (network issue)
      console.error('Network error. Please check your connection.');
    } else {
      // Something else happened while setting up the request
      console.error('Error creating request:', error.message);
    }
    return Promise.reject(error);
  }
);

// Define API service methods
const api = {
  // Auth endpoints
  auth: {
    login: (credentials) => apiClient.post('auth/login', credentials),
    register: (userData) => apiClient.post('auth/register', userData),
    logout: () => apiClient.post('auth/logout'),
    getProfile: () => apiClient.get('auth/me'),
    updateProfile: (data) => apiClient.put('auth/update-profile', data),
  },
  
  // Hotel listing endpoints
  listing: {
    getAll: (params = {}) => apiClient.get('listing/getListings', { params }),
    getById: (id) => apiClient.get(`listing/${id}`),
    create: (hotelData) => apiClient.post('listing/create', hotelData),
    update: (id, hotelData) => apiClient.put(`listing/${id}`, hotelData),
    delete: (id) => apiClient.delete(`listing/${id}`),
  },
  
  // Other API endpoints can be organized here
  bookings: {
    // Implement booking-related API calls
  },
  
  reviews: {
    // Implement review-related API calls
  },
};

export { api, apiClient };