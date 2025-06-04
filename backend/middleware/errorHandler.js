// middleware/errorHandler.js

const logger = require('../utils/logger');
const config = require('../config/config');

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error(`${err.name}: ${err.message}`, { 
    url: req.originalUrl,
    method: req.method,
    stack: config.env === 'development' ? err.stack : undefined
  });
  
  // Default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    // Format mongoose validation errors
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }
  
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }
  
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value: ${field}. Please use another value!`;
  }
  
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token. Please log in again.';
  }
  
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Your token has expired! Please log in again.';
  }
  
  // Response format
  const errorResponse = {
    status: 'error',
    message: message,
    ...(config.env === 'development' ? { 
      stack: err.stack,
      error: err 
    } : {})
  };

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;