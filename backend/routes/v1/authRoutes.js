// routes/v1/authRoutes.js
import express from 'express';
import {
  register,
  login,
  logout
  // other auth controller methods
} from '../../controllers/v1/authController.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

export default router;
