// Require neccessary NPM Packages
const mongoose = require('mongoose');

// Define Card Schema
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30
    },
    firstName: { type: String, required: false },
    sureName: { type: String, required: false },
    DOB: { type: Date, required: false },
    email: { type: String, required: true },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    profileImg: { data: Buffer, contentType: String, required: false },
    bio: { type: String, required: false },
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