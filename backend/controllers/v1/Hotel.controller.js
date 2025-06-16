// controllers/v1/hotelController.js

// @desc    Delete hotel listing by ID
// @route   DELETE /api/v1/hotels/:id
// @access  Private (owner of hotel or admin)
exports.deleteHotelListing = catchAsync(async (req, res, next) => {
    // Check if id parameter exists
    if (!req.params.id) {
      return next(new AppError('Hotel ID is required', 400));
    }
  
    // Validate that ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new AppError('Invalid hotel ID format', 400));
    }
  
    // Find hotel by ID - we want to get the hotel data before deletion
    const hotel = await Hotel.findById(req.params.id);
  
    // Check if hotel exists
    if (!hotel) {
      return next(new AppError(`Hotel not found with id of ${req.params.id}`, 404));
    }
  
    // Authorization check - only admin or hotel owner can delete
    if (req.user.role !== 'admin' && hotel.owner.toString() !== req.user.id) {
      return next(
        new AppError(
          `User ${req.user.id} is not authorized to delete this hotel`,
          403
        )
      );
    }
  
    // Check if there are any active bookings for this hotel
    const activeBookings = await Booking.countDocuments({
      hotel: req.params.id,
      bookingStatus: { $in: ['confirmed', 'pending'] }
    });
  
    if (activeBookings > 0) {
      return next(
        new AppError(
          'Cannot delete hotel with active bookings. Cancel all bookings first.',
          400
        )
      );
    }
  
    // Store hotel data before deletion to return in response
    const hotelData = hotel.toObject();
  
    // Delete the hotel
    await hotel.deleteOne();
    
    // If the user is a hotelOwner, remove the hotel from their hotels array
    if (req.user.role === 'hotelOwner') {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { hotels: req.params.id }
      });
    }
  
    // Return success message with deleted hotel data
    res.status(200).json({
      success: true,
      message: 'Hotel listing deleted successfully',
      data: hotelData
    });
  });