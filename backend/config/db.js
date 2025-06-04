const mongoose = require('mongoose');
const config = require('./config');
const logger = require('../utils/logger');

// MongoDB connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: config.env === 'development', // Disable autoIndex in production for performance
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  maxPoolSize: 10 // Maintain up to 10 socket connections
};

/**
 * Connect to MongoDB using Mongoose
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri, mongooseOptions);
    
    // Log successful connection
    logger.info(
      `MongoDB Connected: ${conn.connection.host} | Database: ${conn.connection.name} | Port: ${conn.connection.port}`
    );
    
    // Initialize database models if needed
    // await initializeModels();
    
    return conn;
  } catch (err) {
    handleConnectionError(err);
  }
};

/**
 * Handle MongoDB connection errors with specific messages
 * @param {Error} err - Connection error
 */
const handleConnectionError = (err) => {
  // Define specific error messages based on error codes/types
  const errorMessages = {
    'MongoServerSelectionError': 'Could not connect to any MongoDB server in your cluster. Please check your network connection and MongoDB URI.',
    'MongoParseError': 'Invalid MongoDB connection string. Check the format of your connection string.',
    'bad auth': 'Authentication failed. Please check your username and password in the MongoDB URI.',
    'ECONNREFUSED': 'Connection refused. MongoDB server may not be running.',
    'PortInUse': 'MongoDB port is already in use by another process.',
    '13': 'Authentication failed due to invalid credentials or incorrect auth database.',
    '18': 'Authentication failed. Check credentials or ensure the user exists in the specified database.',
    '8000': 'Bad connection string format.',
    'querySrv ECONNREFUSED': 'DNS resolution failed for the MongoDB cluster. Check your network or DNS settings.'
  };
  
  // Log appropriate error message
  let errorMessage = 'Unknown MongoDB connection error.';
  
  for (const [errorKey, message] of Object.entries(errorMessages)) {
    if (err.message.includes(errorKey) || (err.code && err.code.toString() === errorKey)) {
      errorMessage = message;
      break;
    }
  }
  
  logger.error(`MongoDB Connection Error: ${errorMessage}`);
  logger.error(`Original Error: ${err.message}`);
  
  // Only exit in production, optionally keep retrying in development
  if (config.env === 'production') {
    logger.error('Cannot connect to database. Exiting process...');
    process.exit(1);
  }
};

/**
 * Set up MongoDB connection event listeners 
 */
const setupMongooseEventListeners = () => {
  const db = mongoose.connection;
  
  // Connection events
  db.on('connecting', () => {
    logger.info('Connecting to MongoDB...');
  });
  
  db.on('connected', () => {
    logger.info('MongoDB connected');
  });
  
  db.on('disconnecting', () => {
    logger.info('Disconnecting from MongoDB...');
  });
  
  db.on('disconnected', () => {
    logger.warn('MongoDB disconnected. Will attempt to reconnect...');
  });
  
  db.on('error', (err) => {
    logger.error(`MongoDB error: ${err.message}`);
    if (err.name === 'MongoNetworkError') {
      logger.error('Network error occurred. Will attempt to reconnect...');
    }
  });
  
  db.on('reconnected', () => {
    logger.info('Reconnected to MongoDB');
  });
};

/**
 * Gracefully close MongoDB connection
 */
const closeConnection = async () => {
  try {
    logger.info('Closing MongoDB connection...');
    await mongoose.connection.close();
    logger.info('MongoDB connection closed successfully');
    return true;
  } catch (err) {
    logger.error(`Error closing MongoDB connection: ${err.message}`);
    return false;
  }
};

// Initialize event listeners
setupMongooseEventListeners();

module.exports = {
  connectDB,
  closeConnection
};