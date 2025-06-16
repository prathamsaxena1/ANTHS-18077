const logger = require('../config/logger');

// Logger utility functions for common operations
const loggerUtils = {
  // User activity logging
  userActivity: (userId, action, details = {}) => {
    logger.info(`User Activity: ${action}`, {
      userId,
      action,
      details,
      timestamp: new Date().toISOString()
    });
  },

  // Log database operations
  dbOperation: (operation, model, data = {}, userId = null) => {
    logger.debug(`DB Operation: ${operation} on ${model}`, {
      operation,
      model,
      data: typeof data === 'object' ? data : { data },
      userId,
      timestamp: new Date().toISOString()
    });
  },

  // Log successful bookings
  booking: (bookingId, userId, hotelId, roomId, amount) => {
    logger.info(`New booking created`, {
      bookingId,
      userId,
      hotelId,
      roomId,
      amount,
      timestamp: new Date().toISOString()
    });
  },

  // Log payment events
  payment: (status, transactionId, amount, userId, bookingId) => {
    logger.info(`Payment ${status}`, {
      status,
      transactionId,
      amount,
      userId,
      bookingId,
      timestamp: new Date().toISOString()
    });
  },

  // Log security events
  security: (event, userId, ip, userAgent, details = {}) => {
    logger.warn(`Security Event: ${event}`, {
      event,
      userId,
      ip,
      userAgent,
      details,
      timestamp: new Date().toISOString()
    });
  }
};

module.exports = loggerUtils;