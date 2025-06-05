// server.js

import app from './app.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Define a graceful startup procedure
const startServer = async () => {
  try {
    // Connect to MongoDB
    const conn = await connectDB();
    
    if (!conn) {
      console.error('Failed to connect to MongoDB. Server cannot start.');
      process.exit(1);
    }
    
    // Start server only after successful database connection
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
      console.log(`MongoDB connected to ${conn.connection.host}`);
    });
    
    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.log('UNHANDLED REJECTION! 💥 Shutting down...');
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });
    
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

// Add to server.js before startServer()
function printRoutes() {
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log(middleware.route.path);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        console.log(handler.route?.path);
      });
    }
  });
}

printRoutes()

// Start the server
startServer();