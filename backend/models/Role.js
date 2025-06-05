// models/Role.js
const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  permissions: [{
    type: String,
    required: true
  }],
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Role', RoleSchema);