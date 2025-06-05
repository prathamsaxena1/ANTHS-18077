// config/db.js

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Get connection string from environment variables
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      // Log detailed error if MONGO_URI is missing
      console.error('MONGO_URI is not defined in environment variables');
      process.exit(1);
    }
    
    console.log('Attempting to connect to MongoDB...');
    
    // Connect to MongoDB with improved options and error handling
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // If you're using MongoDB Atlas, these can be helpful:
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    // Provide detailed error messages based on error type
    if (error.name === 'MongoNetworkError' || error.message.includes('ECONNREFUSED')) {
      console.error(
        '\x1b[31m%s\x1b[0m', // Red color
        'MongoDB Connection Error: Could not connect to MongoDB. Please check:'
      );
      console.error('  - Is MongoDB running on the specified host and port?');
      console.error('  - If using MongoDB Atlas, check your internet connection and firewall settings');
      console.error('  - Is your connection string correctly formatted?');
      console.error(`Detailed error: ${error.message}`);
    } else if (error.name === 'MongoParseError') {
      console.error(
        '\x1b[31m%s\x1b[0m', // Red color
        'MongoDB Connection String Error: Could not parse connection string'
      );
      console.error('  - Check the format of your MongoDB connection string');
      console.error('  - Ensure special characters in username/password are properly escaped');
      console.error(`Detailed error: ${error.message}`);
    } else {
      console.error(`MongoDB connection error: ${error.message}`);
    }
    
    // Exit with failure in server.js, but in app.js this function might be called elsewhere
    return null;
  }
};

export default connectDB;