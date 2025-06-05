const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const { connectDB, closeConnection } = require('./config/db');
const logger = require('./utils/logger');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Hotel Booking API' });
});

// Define PORT
const PORT = 5000;

// Connect to database and start server
let server;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Start Express server
    server = app.listen(PORT, () => {
      logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
    
    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      logger.error(`Unhandled Rejection: ${err.message}`);
      // Keep server running, but log the error
    });
    
    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      logger.error(`Uncaught Exception: ${err.message}`);
      // Graceful shutdown
      shutdownGracefully();
    });
    
    // Handle termination signals
    ['SIGTERM', 'SIGINT'].forEach(signal => {
      process.on(signal, () => {
        logger.info(`${signal} received. Starting graceful shutdown...`);
        shutdownGracefully();
      });
    });
    
  } catch (err) {
    logger.error(`Server initialization failed: ${err.message}`);
    process.exit(1);
  }
};

// Graceful shutdown function
const shutdownGracefully = async () => {
  logger.info('Shutting down gracefully...');
  
  // Close server first, stop accepting new connections
  if (server) {
    server.close(async () => {
      logger.info('HTTP server closed');
      
      // Then close database connection
      await closeConnection();
      
      // Finally exit process
      logger.info('Graceful shutdown completed');
      process.exit(0);
    });
    
    // Force close after timeout
    setTimeout(() => {
      logger.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  }
};

// Start the server
startServer();