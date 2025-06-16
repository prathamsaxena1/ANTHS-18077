// utils/validateEnv.js
const validateEnv = () => {
    const requiredEnvVars = [
      'NODE_ENV',
      'PORT',
      'MONGO_URI',
      'JWT_SECRET',
      'JWT_EXPIRE'
    ];
  
    const missingVars = requiredEnvVars.filter(
      envVar => process.env[envVar] === undefined
    );
  
    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}`
      );
    }
  
    // Validate specific variable formats if needed
    if (process.env.NODE_ENV === 'production') {
      // Additional production-only validations
      if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
        throw new Error('JWT_SECRET is too short for production use');
      }
    }
  };
  
  module.exports = validateEnv;