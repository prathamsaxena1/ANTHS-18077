// middleware/responseLogger.js

const logger = require('../utils/logger');
const config = require('../config/config');

/**
 * Log response data for debugging purposes
 */
const responseLogger = (req, res, next) => {
  // Only in development and for specific debugging needs
  if (config.env !== 'development' || config.logLevel !== 'debug') {
    return next();
  }

  // Store the original send method
  const originalSend = res.send;
  
  // Override the send method
  res.send = function(body) {
    // Log the response
    let logBody = body;
    
    // Handle different body types
    if (typeof body === 'object') {
      try {
        logBody = JSON.stringify(body);
      } catch (err) {
        logBody = '[Complex Object]';
      }
    }
    
    // Don't log large responses fully
    const maxLength = 500;
    if (logBody && logBody.length > maxLength) {
      logBody = logBody.substring(0, maxLength) + '... [truncated]';
    }

    logger.debug(`Response for ${req.method} ${req.url}`, {
      statusCode: res.statusCode,
      responseBody: logBody
    });
    
    // Call the original send method
    originalSend.call(this, body);
    return this;
  };
  
  next();
};

module.exports = responseLogger;