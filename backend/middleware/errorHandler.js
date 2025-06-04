// middleware/errorHandler.js

const logger = require('../utils/logger');
const config = require('../config/config');
const { AppError } = require('../utils/appError');

/**
 * Development error response
 * Includes more details for debugging
 */
const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

/**
 * Production error response
 * Sends limited information for operational errors
 * Generic message for programming errors
 */
const sendProdError = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } 
  // Programming or other unknown error: don't leak error details
  else {
    // Log error
    logger.error('ERROR 💥', err);

    // Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  }
};

/**
 * Handle Mongoose validation errors
 */
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

/**
 * Handle Mongoose cast errors (invalid IDs)
 */
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

/**
 * Handle duplicate key errors
 */
const handleDuplicateFieldsError = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

/**
 * Handle JWT errors
 */
const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401);

/**
 * Handle JWT expiration
 */
const handleJWTExpiredError = () => new AppError('Your token has expired. Please log in again!', 401);

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log all errors regardless of type
  logger.error(`${err.name}: ${err.message}`, { 
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    stack: err.stack
  });

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (config.env === 'development') {
    sendDevError(err, res);
  } else if (config.env === 'production') {
    // Create a hard copy of the error to avoid mutation issues
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;

    // Handle specific error types
    if (error.name === 'CastError') error = handleCastError(error);
    if (error.name === 'ValidationError') error = handleValidationError(error);
    if (error.code === 11000) error = handleDuplicateFieldsError(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendProdError(error, res);
  }
};

module.exports = errorHandler;