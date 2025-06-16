// middleware/httpLogger.js
const expressWinston = require('express-winston');
const logger = require('../utils/logger');

// HTTP request logger middleware
const httpLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false,
  ignoreRoute: (req, res) => {
    // Don't log health checks or other specific routes
    return req.url.includes('/health') || req.url.includes('/favicon.ico');
  },
  dynamicMeta: (req, res) => {
    const meta = {
      userId: req.user ? req.user.id : 'unauthenticated',
      requestId: req.id, // If you implement request ID generation
      ip: req.ip,
      userAgent: req.get('User-Agent')
    };
    return meta;
  }
});

module.exports = httpLogger;