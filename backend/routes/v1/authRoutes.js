// routes/v1/authRoutes.js

import express from 'express';
import { register, login } from '../../controllers/v1/authController.js';
import { validateRegister, validateLogin } from '../../validation/v1/authValidation.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Additional auth routes would go here (forgot-password, reset-password, etc.)

export default router;