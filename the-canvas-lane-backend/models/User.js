const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true, // Clerk's unique userId
    index: true,  // For faster lookups
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    index: true,  // For faster lookups
  },
  emailAddresses: {
    type: [String], // Clerk can provide multiple emails
    required: true,
  },
  bio: {
    type: String,
    trim: true,
    default: '', // Default to an empty string
  },
  skills: {
    type: [String],
    default: [], // Default to an empty array
  },
  profilePicture: {
    type: String, // URL to the uploaded profile image
  },
  portfolios: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Portfolio model
      ref: 'Portfolio',
    },
  ],
  contactDetails: {
    phone: {
      type: String,
      trim: true,
      default: '',
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v); // Example validation for a 10-digit phone number
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
