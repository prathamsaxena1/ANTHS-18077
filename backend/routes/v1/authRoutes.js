// routes/v1/authRoutes.js
import express from 'express';
import { 
  register, 
  login, 
  logout, 
  getMe 
} from '../../controllers/v1/authController.js';
import { protect } from '../../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

// Protected routes
router.get('/me', protect, getMe);

export default router;