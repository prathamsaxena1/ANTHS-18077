// routes/v1/roleRoutes.js
const express = require('express');
const {
  getRoles,
  assignUserRole,
  getUsersByRole
} = require('../../controllers/v1/roleController');

const { protect, adminOnly } = require('../../middleware/auth');

const router = express.Router();

router.get('/', protect, adminOnly, getRoles);
router.put('/users/:userId/role', protect, adminOnly, assignUserRole);
router.get('/users/role/:role', protect, adminOnly, getUsersByRole);

module.exports = router;