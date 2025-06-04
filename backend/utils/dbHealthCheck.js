const mongoose = require('mongoose');
const logger = require('./logger');

/**
 * Check MongoDB connection health
 * @returns {Promise<boolean>} Connection status
 */
const checkDatabaseHealth = async () => {
  try {
    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      logger.error(`MongoDB not connected. Current state: ${getReadyStateDescription(mongoose.connection.readyState)}`);
      return false;
    }
    
    // Run a simple command to verify the connection is working
    const result = await mongoose.connection.db.admin().ping();
    
    if (result && result.ok === 1) {
      logger.info('MongoDB health check: Connection is healthy');
      return true;
    } else {
      logger.warn('MongoDB health check: Connection may have issues');
      return false;
    }
  } catch (err) {
    logger.error(`MongoDB health check failed: ${err.message}`);
    return false;
  }
};

/**
 * Get readable description of mongoose connection state
 * @param {number} state - Mongoose connection readyState
 * @returns {string} Description
 */
const getReadyStateDescription = (state) => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    99: 'uninitialized'
  };
  return states[state] || 'unknown';
};

module.exports = {
  checkDatabaseHealth,
  getReadyStateDescription
};