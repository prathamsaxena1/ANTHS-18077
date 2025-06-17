// src/config.js

// Determine which environment variables to use based on build system
const getEnvVariable = (key) => {
    // Check if using Vite
    if (import.meta && import.meta.env) {
      return import.meta.env[`VITE_${key}`] || import.meta.env[key];
    }
    // Fallback to CRA pattern
    return process.env[`REACT_APP_${key}`] || process.env[key];
  };
  
  // Config object to use throughout the application
  const config = {
    apiUrl: getEnvVariable('API_URL'),
    environment: getEnvVariable('APP_ENV') || 'development',
    appName: getEnvVariable('APP_NAME') || 'Hotel Manager',
    isProd: (getEnvVariable('APP_ENV') || 'development') === 'production',
    isDev: (getEnvVariable('APP_ENV') || 'development') === 'development',
    
    // You can add more configuration options here
    authConfig: {
      tokenKey: 'hotel_auth_token',
      refreshTokenKey: 'hotel_refresh_token',
      tokenExpiry: 3600 // in seconds
    },
    
    // Feature flags
    features: {
      enableBookingHistory: true,
      enableReviews: true,
      enableChat: getEnvVariable('ENABLE_CHAT') === 'true'
    },
    
    // API endpoints
    endpoints: {
      login: '/auth/login',
      register: '/auth/register',
      hotels: '/hotels',
      bookings: '/bookings',
      users: '/users',
    }
  };
  
  export default config;