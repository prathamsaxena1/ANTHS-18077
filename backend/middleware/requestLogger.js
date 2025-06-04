// middleware/requestLogger.js

const logger = require('../utils/logger');

const apiLogger = (req, res, next) => {
  // Log the request
  logger.info(`${req.method} ${req.originalUrl} [${req.ip}]`);
  
  // Track response time
  const start = Date.now();
  
  // Once the request is processed
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    const statusMessage = res.statusMessage || '';
    
    const logLevel = statusCode >= 500 ? 'error' : 
                     statusCode >= 400 ? 'warn' : 'info';
    
    logger[logLevel](
      `${req.method} ${req.originalUrl} [${req.ip}] - ${statusCode} ${statusMessage} - ${duration}ms`
    );
  });
  
  next();
};

module.exports = { apiLogger };