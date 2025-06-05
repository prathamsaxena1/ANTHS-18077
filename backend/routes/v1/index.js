// routes/v1/index.js

import express from 'express';
import authRoutes from './authRoutes.js';
// Import other route files as needed

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
// Mount other routes

export default router;