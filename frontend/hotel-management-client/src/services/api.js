// src/services/api.js
import config from '../config';

const createApiService = () => {
  // Base headers for all requests
  const headers = {
    'Content-Type': 'application/json'
  };

  const get = async (endpoint) => {
    try {
      const response = await fetch(`${config.apiUrl}${endpoint}`, {
        method: 'GET',
        headers
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  };

  const post = async (endpoint, data) => {
    try {
      const response = await fetch(`${config.apiUrl}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      throw error;
    }
  };

  // Add other methods like PUT, DELETE, etc.
  
  return {
    get,
    post,
    // Additional methods here
    
    // Convenience methods for specific API endpoints
    getHotels: () => get(config.endpoints.hotels),
    getHotel: (id) => get(`${config.endpoints.hotels}/${id}`),
    login: (credentials) => post(config.endpoints.login, credentials),
    register: (userData) => post(config.endpoints.register, userData)
  };
};

export default createApiService();