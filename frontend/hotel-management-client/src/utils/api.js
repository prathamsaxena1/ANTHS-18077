// src/utils/api.js

import axios from 'axios';

// Create an Axios instance with default configurations
const apiClient = axios.create({
  baseURL: 'http://localhost:8001/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

// Request interceptor to add auth token
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

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Add specific error handling here
    return Promise.reject(error);
  }
);

// Helper function to build query params from filters
const buildListingQueryParams = (filters = {}) => {
  const params = {};
  
  // Text search
  if (filters.search) {
    params.search = filters.search;
  }
  
  // Price range
  if (filters.minPrice !== undefined && filters.minPrice !== '') {
    params.minPrice = filters.minPrice;
  }
  if (filters.maxPrice !== undefined && filters.maxPrice !== '') {
    params.maxPrice = filters.maxPrice;
  }
  
  // Bedrooms range
  if (filters.minBedrooms !== undefined && filters.minBedrooms !== '') {
    params.minBedrooms = filters.minBedrooms;
  }
  if (filters.maxBedrooms !== undefined && filters.maxBedrooms !== '') {
    params.maxBedrooms = filters.maxBedrooms;
  }
  
  // Bathrooms range
  if (filters.minBathrooms !== undefined && filters.minBathrooms !== '') {
    params.minBathrooms = filters.minBathrooms;
  }
  if (filters.maxBathrooms !== undefined && filters.maxBathrooms !== '') {
    params.maxBathrooms = filters.maxBathrooms;
  }
  
  // Boolean filters - only include if specifically set to true or false
  if (filters.furnished !== null && filters.furnished !== undefined) {
    params.furnished = filters.furnished;
  }
  if (filters.parking !== null && filters.parking !== undefined) {
    params.parking = filters.parking;
  }
  
  // Status filter (isSold)
  // If isSold is false, we're filtering to only show available listings
  if (filters.isSold === false) {
    params.isSold = false;
  }
  // If isSold is true, we're not filtering by status, so we don't add it to params
  
  // Date filters
  if (filters.createdAfter) {
    params.createdAfter = filters.createdAfter instanceof Date 
      ? filters.createdAfter.toISOString() 
      : filters.createdAfter;
  }
  if (filters.createdBefore) {
    params.createdBefore = filters.createdBefore instanceof Date 
      ? filters.createdBefore.toISOString() 
      : filters.createdBefore;
  }
  if (filters.updatedAfter) {
    params.updatedAfter = filters.updatedAfter instanceof Date 
      ? filters.updatedAfter.toISOString() 
      : filters.updatedAfter;
  }
  if (filters.updatedBefore) {
    params.updatedBefore = filters.updatedBefore instanceof Date 
      ? filters.updatedBefore.toISOString() 
      : filters.updatedBefore;
  }
  
  // Owner search
  if (filters.ownerSearch) {
    params.ownerSearch = filters.ownerSearch;
  }
  
  // Pagination
  if (filters.page) {
    params.page = filters.page;
  }
  if (filters.limit) {
    params.limit = filters.limit;
  }
  
  // Sorting
  if (filters.sort) {
    const [field, direction] = filters.sort.split('_');
    params.sortField = field;
    params.sortOrder = direction;
  }
  
  return params;
};

// API service with methods for interacting with backend
const api = {
  auth: {
    // Auth methods
    login: (credentials) => apiClient.post('auth/login', credentials),
    register: (userData) => apiClient.post('auth/register', userData),
    logout: () => apiClient.post('auth/logout'),
    getProfile: () => apiClient.get('auth/me'),
  },
  
  listings: {
    // Get all listings with optional filters
    getAll: (filters = {}) => {
      const params = buildListingQueryParams(filters);
      return apiClient.get('listing/getListings', { params });
    },
    
    // Get a listing by ID
    getById: (id) => apiClient.get(`listing/${id}`),
    
    // Create a new listing
    create: (listingData) => apiClient.post('listing/create', listingData),
    
    // Update a listing
    update: (id, listingData) => apiClient.put(`listing/${id}`, listingData),
    
    // Delete a listing
    delete: (id) => apiClient.delete(`listing/${id}`),
    
    // Get owner's listings
    getMyListings: () => apiClient.get('listing/my-listings'),
  },
};

export { api, apiClient };