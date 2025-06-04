const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Explicitly set retryWrites if needed
      retryWrites: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    
    // More detailed error handling
    if (error.message.includes('bad auth')) {
      console.error('Authentication failed - please check your username and password');
      console.error('If your password contains special characters, ensure they are URL encoded');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;