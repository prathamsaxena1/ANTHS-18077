// src/utils/api.js
import axios from 'axios';

// Create a base axios instance with common configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies in cross-origin requests
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle token expiration - if we get a 401 error and haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh token (if you have a refresh token endpoint)
        // const refreshResponse = await api.post('/auth/refresh-token');
        // const { token } = refreshResponse.data;
        // localStorage.setItem('token', token);
        // originalRequest.headers.Authorization = `Bearer ${token}`;
        // return api(originalRequest);
        
        // If you don't have refresh token functionality, log out the user
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } catch (refreshError) {
        // If refresh fails, log out the user
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    // Create a more user-friendly error message
    const errorMessage = error.response?.data?.error || error.message || 'An unexpected error occurred';
    error.friendlyMessage = errorMessage;
    
    return Promise.reject(error);
  }
);

// API service functions organized by resource/entity

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.get('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/updatedetails', userData),
  updatePassword: (passwordData) => api.put('/auth/updatepassword', passwordData),
  forgotPassword: (email) => api.post('/auth/forgotpassword', { email }),
  resetPassword: (token, passwordData) => api.put(`/auth/resetpassword/${token}`, passwordData),
};

// Hotels API calls
export const hotelAPI = {
  getAll: (params) => api.get('/hotels', { params }),
  get: (id) => api.get(`/hotels/${id}`),
  create: (hotelData) => api.post('/hotels', hotelData),
  update: (id, hotelData) => api.put(`/hotels/${id}`, hotelData),
  delete: (id) => api.delete(`/hotels/${id}`),
  getByRadius: (zipcode, distance) => api.get(`/hotels/radius/${zipcode}/${distance}`),
  getMyHotels: () => api.get('/hotels/myhotels'),
  uploadPhoto: (id, formData) => api.post(`/hotels/${id}/photo`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

// Bookings API calls
export const bookingAPI = {
  getAll: (params) => api.get('/bookings', { params }),
  get: (id) => api.get(`/bookings/${id}`),
  create: (bookingData) => api.post('/bookings', bookingData),
  update: (id, bookingData) => api.put(`/bookings/${id}`, bookingData),
  delete: (id) => api.delete(`/bookings/${id}`),
  getMyBookings: () => api.get('/bookings/me'),
  getHotelBookings: (hotelId) => api.get(`/hotels/${hotelId}/bookings`),
  checkAvailability: (hotelId, dates) => api.post(`/hotels/${hotelId}/availability`, dates),
  cancelBooking: (id) => api.put(`/bookings/${id}/cancel`),
};

// Reviews API calls
export const reviewAPI = {
  getHotelReviews: (hotelId) => api.get(`/hotels/${hotelId}/reviews`),
  create: (hotelId, reviewData) => api.post(`/hotels/${hotelId}/reviews`, reviewData),
  update: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  delete: (id) => api.delete(`/reviews/${id}`),
  getMyReviews: () => api.get('/reviews/me'),
};

// Admin API calls
export const adminAPI = {
  getUsers: (params) => api.get('/users', { params }),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
  createUser: (userData) => api.post('/users', userData),
  getDashboardStats: () => api.get('/admin/stats'),
};

// Export the base api instance for custom calls
export default api;