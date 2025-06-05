// routes/v1/authRoutes.js - Verify it looks like this

import express from 'express';
import { register } from '../../controllers/authController.js';
import { validateRegister } from '../../validation/v1/authValidation.js';

const router = express.Router();

// Ensure these routes don't have any auth middleware
router.post('/register', validateRegister, register);

export default router;