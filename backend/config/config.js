const dotenv = require('dotenv');
const path = require('path');

// Load env vars based on NODE_ENV
dotenv.config({ 
  path: path.resolve(process.cwd(), `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`) 
});

// Required environment variables
const requiredEnvVars = [
  'MONGO_URI',
  'JWT_SECRET'
];

// Check for required env vars
requiredEnvVars.forEach(variable => {
  if (!process.env[variable]) {
    console.error(`Error: Environment variable ${variable} is missing`);
    process.exit(1);
  }
});

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  jwtCookieExpire: parseInt(process.env.JWT_COOKIE_EXPIRE || '30', 10),
  emailFrom: process.env.EMAIL_FROM,
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  },
  stripeConfig: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
  },
  cloudinaryConfig: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
};