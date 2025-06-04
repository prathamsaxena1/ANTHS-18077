const mongoose = require('mongoose');
const logger = require('./logger');

/**
 * Ensure all model indexes are created
 * @returns {Promise<void>}
 */
const createIndexes = async () => {
  const models = mongoose.modelNames();
  logger.info('Creating indexes for all models...');
  
  for (const modelName of models) {
    const model = mongoose.model(modelName);
    try {
      await model.createIndexes();
      logger.info(`Indexes created for ${modelName}`);
    } catch (err) {
      logger.error(`Error creating indexes for ${modelName}: ${err.message}`);
    }
  }
};

/**
 * Drop all indexes - useful in development
 * @returns {Promise<void>}
 */
const dropAllIndexes = async () => {
  const models = mongoose.modelNames();
  logger.info('Dropping all indexes...');
  
  for (const modelName of models) {
    const model = mongoose.model(modelName);
    try {
      await model.collection.dropIndexes();
      logger.info(`Indexes dropped for ${modelName}`);
    } catch (err) {
      logger.error(`Error dropping indexes for ${modelName}: ${err.message}`);
    }
  }
};

module.exports = {
  createIndexes,
  dropAllIndexes
};