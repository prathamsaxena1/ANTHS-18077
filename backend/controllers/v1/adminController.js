// controllers/v1/adminController.js
const User = require('../../models/User');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../utils/catchAsync');

// @desc    Update user role
// @route   PUT /api/v1/admin/users/:id/role
// @access  Private (Admin only)
exports.updateUserRole = asyncHandler(async (req, res, next) => {
  const { role } = req.body;
  
  if (!role || !['guest', 'hotelOwner', 'admin'].includes(role)) {
    return next(new ErrorResponse('Please provide a valid role', 400));
  }
  
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true, runValidators: true }
  );
  
  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }
  
  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Get all hotel owners
// @route   GET /api/v1/admin/hotel-owners
// @access  Private (Admin only)
exports.getHotelOwners = asyncHandler(async (req, res, next) => {
  const hotelOwners = await User.find({ role: 'hotelOwner' })
    .select('-password')
    .populate('hotels');
  
  res.status(200).json({
    success: true,
    count: hotelOwners.length,
    data: hotelOwners
  });
});
