// middleware/cors.js

const cors = require('cors');
const config = require('../config/config');

const configureCors = () => {
  const corsOptions = {
    origin: function (origin, callback) {
      // Define allowed origins based on environment
      const allowedOrigins = config.env === 'production' 
        ? ['https://yourbookingapp.com', config.frontendUrl]
        : ['http://localhost:3000', 'http://127.0.0.1:3000'];
        
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies to be sent with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'X-Rate-Limit'],
    maxAge: 86400 // Cache preflight request results for 24 hours (in seconds)
  };

  return cors(corsOptions);
};

module.exports = configureCors;