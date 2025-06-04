// middleware/index.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const config = require('../config/config');
const errorHandler = require('./errorHandler');
const { apiLogger } = require('./requestLogger');

const setupMiddleware = (app) => {
  // Body parser - Parse JSON bodies
  app.use(express.json({ limit: '10kb' })); // Limit body size to 10kb
  
  // Parse URL-encoded bodies
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
  
  // Cookie parser - Parse cookies in requests
  app.use(cookieParser());
  
  // CORS configuration
  app.use(configureCors());
  
  // Security headers
  app.use(helmet());
  
  // Request logging
  if (config.env === 'development') {
    app.use(morgan('dev'));
  }
  
  // Custom request logger
  app.use(apiLogger);
  
  // Data sanitization against NoSQL query injection
  app.use(mongoSanitize());
  
  // Data sanitization against XSS attacks
  app.use(xss());
  
  // Prevent parameter pollution
  app.use(hpp({
    whitelist: ['price', 'rating', 'checkIn', 'checkOut', 'guests']
  }));
  
  // Rate limiting
  app.use('/api', configureRateLimit());
  
  // Compression for responses
  app.use(compression());
  
  // Global error handler
  app.use(errorHandler);
  
  return app;
};

module.exports = setupMiddleware;