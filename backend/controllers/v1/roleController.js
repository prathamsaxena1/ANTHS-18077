// controllers/v1/roleController.js
const Role = require('../../models/Role');
const User = require('../../models/User');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../utils/catchAsync');

// @desc    Get all roles
// @route   GET /api/v1/roles
// @access  Private (Admin)
exports.getRoles = asyncHandler(async (req, res, next) => {
  const roles = await Role.find();

  res.status(200).json({
    success: true,
    count: roles.length,
    data: roles
  });
});

// @desc    Assign role to user
// @route   PUT /api/v1/users/:userId/role
// @access  Private (Admin)
exports.assignUserRole = asyncHandler(async (req, res, next) => {
  const { role } = req.body;
  
  // Validate role
  if (!role || !['guest', 'hotelOwner', 'admin'].includes(role)) {
    return next(new ErrorResponse('Please provide a valid role', 400));
  }
  
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { role },
    { new: true, runValidators: true }
  );
  
  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.userId}`, 404));
  }
  
  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Get users by role
// @route   GET /api/v1/users/role/:role
// @access  Private (Admin)
exports.getUsersByRole = asyncHandler(async (req, res, next) => {
  const validRoles = ['guest', 'hotelOwner', 'admin'];
  
  if (!validRoles.includes(req.params.role)) {
    return next(new ErrorResponse('Invalid role specified', 400));
  }
  
  const users = await User.find({ role: req.params.role }).select('-password');
  
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});