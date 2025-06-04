// routes/v1/index.js

const express = require('express');
const hotelRoutes = require('./hotelRoutes');
const roomRoutes = require('./roomRoutes');
const bookingRoutes = require('./bookingRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

// Mount the resource routers
router.use('/hotels', hotelRoutes);
router.use('/rooms', roomRoutes);
router.use('/bookings', bookingRoutes);
router.use('/auth', authRoutes);

module.exports = router;