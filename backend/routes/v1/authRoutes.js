// routes/v1/authRoutes.js - Verify it looks like this

import express from 'express';
import { register, login } from '../../controllers/v1/authController.js';
import { validateRegister, validateLogin } from '../../validation/v1/authValidation.js';

const router = express.Router();

// Ensure these routes don't have any auth middleware
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;