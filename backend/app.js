// app.js

const express = require('express');
const path = require('path');
const setupMiddleware = require('./middleware');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Create Express app
const app = express();

// Apply middleware
setupMiddleware(app);

// Set security HTTP headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/hotels', hotelRoutes);
app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/bookings', bookingRoutes);

// Serve static assets in production
if (config.env === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// Handle 404 routes
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

module.exports = app;