// routes/v1/authRoutes.js
const express = require('express');
const {
  register,
  login,
  logout,
  getMe
  // other auth controller methods
} = require('../../controllers/v1/authController');

const { protect } = require('../../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;