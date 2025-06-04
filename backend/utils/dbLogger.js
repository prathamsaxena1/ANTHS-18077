// utils/dbLogger.js

const mongoose = require('mongoose');
const logger = require('./logger');
const config = require('../config/config');

/**
 * Set up Mongoose debug logging for development
 */
const setupMongooseDebug = () => {
  if (config.env === 'development' && config.mongoDebug) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
      logger.debug(`Mongoose: ${collectionName}.${method}`, {
        query,
        doc: method === 'find' ? '[results omitted]' : doc
      });
    });
    
    logger.info('Mongoose query debugging enabled');
  }
};

module.exports = { setupMongooseDebug };