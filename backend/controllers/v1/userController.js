// controllers/v1/userController.js
const User = require('../../models/User');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../utils/catchAsync');

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  // The user is already available in req.user from the protect middleware
  // Fetch a fresh copy from the database with any populated fields you might need
  const user = await User.findById(req.user.id).populate({
    path: 'hotels',
    select: 'name address rating'
  });
  
  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  // Fields to update
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
    // Add any other fields you want to allow updating
    // Exclude fields like password, role that need special handling
  };
  
  // Remove undefined values to avoid overwriting with undefined
  Object.keys(fieldsToUpdate).forEach(
    key => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
  );
  
  // Find and update the user
  const user = await User.findByIdAndUpdate(
    req.user.id, 
    fieldsToUpdate, 
    {
      new: true,
      runValidators: true
    }
  );
  
  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user password
// @route   PUT /api/v1/users/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  
  // Validate input
  if (!currentPassword || !newPassword) {
    return next(new ErrorResponse('Please provide current and new password', 400));
  }
  
  // Get user with password (password is normally excluded from queries)
  const user = await User.findById(req.user.id).select('+password');
  
  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }
  
  // Check if current password matches
  const isMatch = await user.matchPassword(currentPassword);
  
  if (!isMatch) {
    return next(new ErrorResponse('Current password is incorrect', 401));
  }
  
  // Set new password - will trigger the pre-save hook to hash it
  user.password = newPassword;
  await user.save();
  
  // Send token response with new JWT
  sendTokenResponse(user, 200, res);
});

// Helper function to send token response (reuse from authController)
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  // Remove password from output
  user.password = undefined;

  res
    .status(statusCode)
    .cookie('token', token, cookieOptions)
    .json({
      success: true,
      token,
      user
    });
};

// @desc    Upload user profile photo
// @route   PUT /api/v1/users/profile/photo
// @access  Private
exports.uploadProfilePhoto = asyncHandler(async (req, res, next) => {
  // This assumes you're using express-fileupload middleware
  if (!req.files || !req.files.file) {
    return next(new ErrorResponse('Please upload a file', 400));
  }

  const file = req.files.file;

  // Make sure the file is an image
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please upload an image file', 400));
  }

  // Check file size
  const maxSize = 1024 * 1024; // 1 MB
  if (file.size > maxSize) {
    return next(new ErrorResponse(`Please upload an image less than ${maxSize / 1024} KB`, 400));
  }

  // Create custom filename
  file.name = `photo_${req.user.id}${path.parse(file.name).ext}`;

  // Upload file
  file.mv(`${process.env.FILE_UPLOAD_PATH}/users/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse('Problem with file upload', 500));
    }

    // Update user with photo URL
    await User.findByIdAndUpdate(req.user.id, {
      photo: file.name
    });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});