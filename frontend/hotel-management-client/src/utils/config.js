// src/utils/config.js

// Default to development API URL
let apiBaseUrl = 'http://localhost:8001/api/v1';

// For production builds, use the environment variable
if (process.env.NODE_ENV === 'production') {
  apiBaseUrl = process.env.REACT_APP_API_URL || 'https://your-api-domain.com/api/v1';
}

const config = {
  // API configuration
  api: {
    baseURL: apiBaseUrl,
    timeout: 20000, // 20 seconds
  },

  // Other configuration
  auth: {
    tokenStorageKey: 'hotel_auth_token',
    userStorageKey: 'hotel_user',
  },

  // Feature flags
  features: {
    enableMaps: process.env.REACT_APP_ENABLE_MAPS === 'true',
    enablePayments: process.env.REACT_APP_ENABLE_PAYMENTS === 'true',
  },
};

export default config;