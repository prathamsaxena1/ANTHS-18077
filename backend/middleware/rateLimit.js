// middleware/rateLimit.js

const rateLimit = require('express-rate-limit');
const config = require('../config/config');

const configureRateLimit = () => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: config.env === 'production' ? 100 : 300, // Limit each IP to 100 requests per windowMs in production
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
      status: 'error',
      message: 'Too many requests, please try again later.'
    },
    // Store to track request counts
    // You can use Redis or other stores for production
    // Example: store: new RedisStore({...})
  });
  
  return limiter;
};

module.exports = configureRateLimit;