const dotenv = require('dotenv');
const path = require('path');

// Load env vars based on NODE_ENV
dotenv.config({ 
  path: path.resolve(process.cwd(), `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`) 
});

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  mongoUri: process.env.MONGO_URI,
  mongoDebug: process.env.MONGO_DEBUG === 'true',
  // MongoDB replica set name if you're using one
  mongoReplicaSet: process.env.MONGO_REPLICA_SET || '',
  // Retry connection configuration
  mongoRetryAttempts: parseInt(process.env.MONGO_RETRY_ATTEMPTS || '5', 10),
  mongoRetryInterval: parseInt(process.env.MONGO_RETRY_INTERVAL || '5000', 10),
  
  // ... other configuration properties
};