// validation/v1/authValidation.js

import Joi from 'joi';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';

// Registration validation schema
const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters'
    }),
  
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email is required'
    }),
  
  password: Joi.string().min(8).required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base': 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
    }),
  
  passwordConfirm: Joi.string().valid(Joi.ref('password')).required()
    .messages({
      'any.only': 'Passwords do not match',
      'string.empty': 'Please confirm your password'
    }),
  
  phoneNumber: Joi.string().allow('').optional(),
  
  role: Joi.string().valid('user').default('user'),
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email is required'
    }),
  
  password: Joi.string().required()
    .messages({
      'string.empty': 'Password is required'
    })
});

// Middleware to validate registration data
export const validateRegister = catchAsync(async (req, res, next) => {
  try {
    // Validate request body against schema
    const { error, value } = registerSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      const errorMessages = error.details.map(detail => detail.message).join('; ');
      return next(new AppError(errorMessages, 400));
    }
    
    // Update request with validated data
    req.body = value;
    next();
  } catch (err) {
    next(new AppError('Invalid input data', 400));
  }
});

// Middleware to validate login data
export const validateLogin = catchAsync(async (req, res, next) => {
  try {
    // Validate request body against schema
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      const errorMessages = error.details.map(detail => detail.message).join('; ');
      return next(new AppError(errorMessages, 400));
    }
    
    // Update request with validated data
    req.body = value;
    next();
  } catch (err) {
    next(new AppError('Invalid input data', 400));
  }
});