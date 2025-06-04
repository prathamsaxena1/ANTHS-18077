// middleware/auth.js

const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const config = require('../config/config');

// Protect routes - require authentication
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // Get token from Authorization header or cookies
    if (
      req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'You are not logged in! Please log in to get access.'
      });
    }
    
    // Verify token
    const decoded = await promisify(jwt.verify)(token, config.jwtSecret);
    
    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'error',
        message: 'The user belonging to this token no longer exists.'
      });
    }
    
    // Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: 'error',
        message: 'User recently changed password! Please log in again.'
      });
    }
    
    // Set user in req object
    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

// Restrict access to specific roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};