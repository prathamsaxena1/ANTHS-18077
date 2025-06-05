// controllers/v1/authController.js

import User from '../../models/User.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';

/**
 * Register a new user
 * @route POST /api/v1/auth/register
 * @access Public
 */
export const register = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, phoneNumber } = req.body;

  // Check if user already exists with the provided email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('Email already in use', 400));
  }

  // Create a new user (password will be hashed by the pre-save hook in the User model)
  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    phoneNumber
  });

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

/**
 * Log in a user
 * @route POST /api/v1/auth/login
 * @access Public
 */
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Check if user exists and password is correct
  // Note: We need to explicitly select the password as it's excluded by default
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // Update last login timestamp
  user.lastLogin = Date.now();
  await user.save({ validateBeforeSave: false });

  // Generate token
  const token = user.generateAuthToken();

  // Hide password from output
  user.password = undefined;

  // Send response
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
});