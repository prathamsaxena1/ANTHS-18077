// routes/v1/hotelRoutes.js

const express = require('express');
const hotelController = require('../../controllers/hotelController');
const { protect, restrictTo } = require('../../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(hotelController.getAllHotels)
  .post(
    protect,
    restrictTo('admin'),
    hotelController.createHotel
  );

router
  .route('/:id')
  .get(hotelController.getHotel)
  .patch(
    protect,
    restrictTo('admin'),
    hotelController.updateHotel
  )
  .delete(
    protect,
    restrictTo('admin'),
    hotelController.deleteHotel
  );

module.exports = router;