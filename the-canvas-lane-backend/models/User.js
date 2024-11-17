const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,  // Clerk's unique userId
  },
  username: {
    type: String,
    trim: true,
    unique: true,
  },
  emailAddresses: {
    type: [String],  // Clerk can provide multiple emails
    required: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  skills: [String],
  profilePicture: {
    type: String,  // URL to the uploaded profile image
  },
  portfolios: [
    {
      type: mongoose.Schema.Types.ObjectId,  // Reference to the Portfolio model
      ref: 'Portfolio',
    }
  ],
  contactDetails: {
    phone: {
      type: String,
      trim: true,
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
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

