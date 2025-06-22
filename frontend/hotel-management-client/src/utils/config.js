// src/utils/config.js
const config = {
    // API configuration
    api: {
      baseUrl: process.env.REACT_APP_API_BASE_URL || 'https://api.yourhotelsite.com/api/v1',
      timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '30000', 10),
    },
    
    // Feature flags
    features: {
      enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
      enableChatSupport: process.env.REACT_APP_ENABLE_CHAT_SUPPORT === 'true',
    },
    
    // External services
    services: {
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      stripePublicKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
    },
    
    // App info
    app: {
      version: process.env.REACT_APP_BUILD_VERSION || '1.0.0',
      environment: process.env.REACT_APP_ENVIRONMENT || 'development',
      isProduction: process.env.NODE_ENV === 'production',
      isDevelopment: process.env.NODE_ENV === 'development',
    }
  };
  
  export default config;