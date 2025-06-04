// app.js

const express = require('express');
const configureLogging = require('./config/logging');
const setupMiddleware = require('./middleware');
const versionControl = require('./middleware/versionControl');
const apiRoutes = require('./routes');
const notFoundHandler = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

// Create Express app
const app = express();

// Configure logging
configureLogging(app);

// Apply middleware
setupMiddleware(app);

// Version control middleware
app.use('/api', versionControl);

// API routes with versioning
app.use('/api', apiRoutes);

// API Documentation
app.use('/docs', express.static('public/docs'));

// Handle 404 routes
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

module.exports = app;