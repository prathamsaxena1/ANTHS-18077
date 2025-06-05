// routes/v1/authRoutes.js

import express from 'express';
import { register, login } from '../controllers/v1/authController.js';
import { validateRegister, validateLogin } from '../validation/v1/authValidation.js';

const router = express.Router();

// Check these paths for errors
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// If you have routes with parameters, check them carefully
// Example of a correct parameter route:
// router.post('/verify/:token', verifyEmail);

export default router;