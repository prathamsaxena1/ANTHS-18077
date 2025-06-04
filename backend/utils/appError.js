// utils/appError.js

/**
 * Custom error class for application errors
 * @extends Error
 */
class AppError extends Error {
    /**
     * Create an application error
     * @param {string} message - Error message
     * @param {number} statusCode - HTTP status code
     */
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true; // Operational errors are expected errors
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // Specific error types
  class BadRequestError extends AppError {
    constructor(message = 'Bad request') {
      super(message, 400);
    }
  }
  
  class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized access') {
      super(message, 401);
    }
  }
  
  class ForbiddenError extends AppError {
    constructor(message = 'Forbidden access') {
      super(message, 403);
    }
  }
  
  class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
      super(message, 404);
    }
  }
  
  class ValidationError extends AppError {
    constructor(message = 'Validation failed') {
      super(message, 422);
    }
  }
  
  module.exports = {
    AppError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ValidationError
  };