// middleware/morganLogger.js

const morgan = require('morgan');
const logger = require('../utils/logger');
const config = require('../config/config');

// Create a custom token for response time in a more readable format
morgan.token('response-time-pretty', (req, res) => {
  const time = res['responseTime'];
  if (!time) return '';
  
  if (time < 10) return `${time.toFixed(2)}ms`;
  if (time < 100) return `${time.toFixed(1)}ms`;
  if (time < 1000) return `${Math.round(time)}ms`;
  return `${(time/1000).toFixed(2)}s`;
});

// Create a custom token for colored status code
morgan.token('status-colored', (req, res) => {
  const status = res.statusCode;
  let color = '\x1b[32m'; // green
  
  if (status >= 500) color = '\x1b[31m'; // red
  else if (status >= 400) color = '\x1b[33m'; // yellow
  else if (status >= 300) color = '\x1b[36m'; // cyan
  
  return `${color}${status}\x1b[0m`; // add color, then reset color
});

// Create a custom token for request body (sanitized)
morgan.token('request-body', (req) => {
  if (!req.body || Object.keys(req.body).length === 0) return '-';
  
  // Create a sanitized copy of the request body
  const sanitizedBody = { ...req.body };
  
  // Remove sensitive fields
  ['password', 'passwordConfirm', 'token', 'jwt', 'creditCard'].forEach(field => {
    if (sanitizedBody[field]) sanitizedBody[field] = '[FILTERED]';
  });
  
  return JSON.stringify(sanitizedBody);
});

// Create a custom format for development
const developmentFormat = ':method :url :status-colored :response-time-pretty';

// Create a detailed format for debugging
const debugFormat = ':method :url :status-colored :response-time-pretty :remote-addr - :referrer - :user-agent - body: :request-body';

// Create a stream that writes to our winston logger
const stream = {
  write: (message) => logger.http(message.trim()),
};

// Set up different morgan configurations based on environment
const setupMorgan = (app) => {
  // Always track response time
  app.use((req, res, next) => {
    const start = Date.now();
    
    // Once the request is processed
    res.on('finish', () => {
      res['responseTime'] = Date.now() - start;
    });
    
    next();
  });
  
  // Use different formats based on environment and verbosity
  if (config.env === 'development') {
    if (config.logLevel === 'debug') {
      app.use(morgan(debugFormat, { stream }));
    } else {
      app.use(morgan(developmentFormat, { stream }));
    }
    
    // Log request body for specific routes that need extra debugging
    app.use((req, res, next) => {
      // Add routes that need detailed logging here
      const sensitiveRoutes = ['/api/v1/auth/login', '/api/v1/bookings'];
      
      if (sensitiveRoutes.some(route => req.url.includes(route))) {
        logger.debug(`Request details for ${req.url}`, {
          method: req.method,
          query: req.query,
          params: req.params,
          body: req.body ? { ...req.body, password: req.body.password ? '[FILTERED]' : undefined } : {},
          headers: {
            ...req.headers,
            authorization: req.headers.authorization ? '[FILTERED]' : undefined
          }
        });
      }
      
      next();
    });
  } else {
    // For production, use a more concise format
    app.use(morgan(':method :url :status :response-time-pretty', { 
      stream,
      skip: (req, res) => res.statusCode < 400 // Only log errors in production
    }));
  }
};

module.exports = setupMorgan;