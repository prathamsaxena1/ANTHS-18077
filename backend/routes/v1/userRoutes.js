// routes/v1/userRoutes.js
const express = require('express');
const {
  getUserProfile,
  updateProfile,
  updatePassword,
  uploadProfilePhoto
} = require('../../controllers/v1/userController');

const { protect } = require('../../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// User profile routes
router.get('/profile', getUserProfile);
router.put('/profile', updateProfile);
router.put('/updatepassword', updatePassword);
router.put('/profile/photo', uploadProfilePhoto);

module.exports = router;