// app.js

const express = require('express');
const configureLogging = require('./config/logging');
const setupMiddleware = require('./middleware');
const notFoundHandler = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Create Express app
const app = express();

// Configure logging - IMPORTANT: this should be before other middleware
configureLogging(app);

// Apply other middleware
setupMiddleware(app);

// Handle 404 routes - must come after all routes
app.use(notFoundHandler);

// Global error handler - must come last
app.use(errorHandler);

module.exports = app;