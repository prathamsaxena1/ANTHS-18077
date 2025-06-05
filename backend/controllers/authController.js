// controllers/v1/authController.js - Add debugging

import User from '../models/User.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

/**
 * Register a new user
 * @route POST /api/v1/auth/register
 * @access Public
 */
export const register = catchAsync(async (req, res, next) => {
  console.log('Register endpoint hit with body:', req.body);
  
  const { name, email, password, passwordConfirm, phoneNumber } = req.body;

  // Check if user already exists with the provided email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('Email already in use', 400));
  }

  console.log('Creating new user for:', email);
  
  // Create a new user (password will be hashed by the pre-save hook)
  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    phoneNumber
  });

  console.log('User created successfully with ID:', user._id);
  
  // Generate JWT token
  const token = user.generateAuthToken();

  // Remove password from output
  user.password = undefined;

  // Send response
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
});