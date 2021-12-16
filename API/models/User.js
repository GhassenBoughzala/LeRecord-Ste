const mongoose = require('mongoose');
const crypto = require('crypto');
// user schema
const userScheama = new mongoose.Schema(
  {

    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: String,
      default: 'subscriber'
    },
    resetPasswordLink: {
      data: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model('User', userScheama);