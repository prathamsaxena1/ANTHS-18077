// utils/logger.js

const winston = require('winston');
const path = require('path');
const fs = require('fs');
const config = require('../config/config');

// Create logs directory if it doesn't exist
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define level based on environment
const level = () => {
  const env = config.env || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Add colors to winston
winston.addColors(colors);

// Define the format for console output
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Define the format for file output
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.json()
);

// Define transports
const transports = [
  // Console transport
  new winston.transports.Console({
    format: consoleFormat,
  }),
  
  // Error log file
  new winston.transports.File({
    filename: path.join(logDir, 'error.log'),
    level: 'error',
    format: fileFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),
  
  // Combined log file
  new winston.transports.File({ 
    filename: path.join(logDir, 'combined.log'),
    format: fileFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),
  
  // HTTP log file (for requests logged manually, not via Morgan)
  new winston.transports.File({ 
    filename: path.join(logDir, 'http.log'),
    level: 'http',
    format: fileFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),
];

// Create the logger
const logger = winston.createLogger({
  level: level(),
  levels,
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.splat()
  ),
  transports,
  exitOnError: false,
});

/**
 * Log a message with context object
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {Object} [context] - Additional context information
 */
logger.logWithContext = (level, message, context = {}) => {
  // Filter out sensitive data
  const safeContext = { ...context };
  
  // Mask sensitive data if present
  ['password', 'token', 'authorization', 'cookie', 'jwt'].forEach(key => {
    if (safeContext[key]) safeContext[key] = '[FILTERED]';
    
    // Also check nested objects
    if (safeContext.headers && safeContext.headers[key]) {
      safeContext.headers[key] = '[FILTERED]';
    }
  });

  // Add additional context for development
  if (config.env === 'development') {
    // Add stack trace for errors if available and not already included
    if (level === 'error' && context.stack && typeof message === 'string' && !message.includes('\n')) {
      logger.log(level, `${message}\n${context.stack}`);
      return;
    }
  }
  
  if (Object.keys(safeContext).length === 0) {
    logger.log(level, message);
  } else {
    logger.log(level, `${message} ${JSON.stringify(safeContext, null, 2)}`);
  }
};

module.exports = logger;