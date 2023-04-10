// Require neccessary NPM Packages
const mongoose = require('mongoose');

// Define Card Schema
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    firstName: { type: String},
    lastName: { type: String},
    DOB: { type: Date},
    email: { type: String},
    password: {
      type: String,
      required: true
    },
    profileImg: { data: Buffer, contentType: String},
    bio: { type: String},
    points: {
        type: Number,
        default: 0
      }
  }, {
    timestamps: true
  });
  

// Compile our Model based on the Schema
const User = mongoose.model('User', userSchema);

// Export our Model for use
module.exports = User;