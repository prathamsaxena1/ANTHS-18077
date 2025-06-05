
// middleware/auth.js - Enhanced with permissions
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/catchAsync');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const Hotel = require('../models/Hotel');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

// Role-based authorization
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

// Permission-based authorization (more granular)
exports.hasPermission = (permission) => {
  return asyncHandler(async (req, res, next) => {
    const hasAccess = await req.user.hasPermission(permission);
    
    if (!hasAccess) {
      return next(
        new ErrorResponse(
          `User does not have permission: ${permission}`,
          403
        )
      );
    }
    
    next();
  });
};

// Check if a user is the owner of a hotel
exports.checkHotelOwnership = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.hotelId);
  
  if (!hotel) {
    return next(
      new ErrorResponse(`Hotel not found with id of ${req.params.hotelId}`, 404)
    );
  }
  
  // Admin bypass or ownership check
  if (req.user.role === 'admin' || hotel.owner.toString() === req.user.id) {
    next();
  } else {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to modify this hotel`,
        403
      )
    );
  }
});

// Admin-only middleware
exports.adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse('Only administrators can perform this action', 403)
    );
  }
  
  next();
});