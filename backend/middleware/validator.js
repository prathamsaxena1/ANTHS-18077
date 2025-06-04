// middleware/validators.js

const { ValidationError } = require('../utils/appError');
const Joi = require('joi');

/**
 * Validate request body against schema
 * @param {Joi.Schema} schema - Validation schema
 */
exports.validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return next(new ValidationError(errorMessage));
    }
    
    next();
  };
};

/**
 * Validate request params against schema
 * @param {Joi.Schema} schema - Validation schema
 */
exports.validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params, { abortEarly: false });
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return next(new ValidationError(errorMessage));
    }
    
    next();
  };
};

/**
 * Validate request query against schema
 * @param {Joi.Schema} schema - Validation schema
 */
exports.validateQuery = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query, { abortEarly: false });
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return next(new ValidationError(errorMessage));
    }
    
    next();
  };
};