// utils/seedDB.js
const mongoose = require('mongoose');
const config = require('../config/config');
const logger = require('../utils/logger');
const Hotel = require('../models/Hotel');
const User = require('../models/User');
const Room = require('../models/Room');
const Booking = require('../models/Booking');

// Sample data
const sampleData = {
  // Your sample data here
};

// Check if --clear flag was passed
const clearDatabase = process.argv.includes('--clear');

// Connect to MongoDB
mongoose.connect(config.mongoUri)
  .then(async () => {
    logger.info('Connected to MongoDB for seeding');
    
    try {
      if (clearDatabase) {
        logger.info('Clearing database...');
        // Delete all records
        await Promise.all([
          Hotel.deleteMany({}),
          User.deleteMany({}),
          Room.deleteMany({}),
          Booking.deleteMany({})
        ]);
        logger.info('Database cleared');
      } else {
        // Seed database with sample data
        logger.info('Seeding database...');
        // Insert sample data
        // ...
        logger.info('Database seeded successfully');
      }
    } catch (error) {
      logger.error('Error seeding database:', error);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch(err => {
    logger.error('Could not connect to MongoDB:', err);
    process.exit(1);
  });