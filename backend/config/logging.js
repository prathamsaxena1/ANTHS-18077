// config/logging.js

const setupMorgan = require('../middleware/morganLogger');
const responseLogger = require('../middleware/responseLogger');
const { setupMongooseDebug } = require('../utils/dbLogger');
const config = require('./config');

/**
 * Configure all logging for the application
 * @param {Express.Application} app - Express application
 */
const configureLogging = (app) => {
  // Set up HTTP request logging
  setupMorgan(app);
  
  // Set up response logging (if in development debug mode)
  app.use(responseLogger);
  
  // Set up mongoose query debugging
  setupMongooseDebug();
  
  // Log application startup
  const logger = require('../utils/logger');
  logger.info(`Application starting in ${config.env} mode on port ${config.port}`);
};

module.exports = configureLogging;