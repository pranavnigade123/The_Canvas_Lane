const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String], // Store tags as an array of strings
    default: [],    // Ensure it defaults to an empty array if not provided
  },
  toolsUsed: {
    type: [String], // Store tools used as an array of strings
    default: [],    // Ensure it defaults to an empty array if not provided
  },
  media: [
    {
      url: {
        type: String,
        required: true, // Each media object must have a URL
      },
      type: {
        type: String,
        enum: ['image', 'video'], // Only 'image' or 'video' types are allowed
        required: true,           // Type is required
      },
    },
  ],
  creator: {
    type: String, // Store Clerk userId as a string
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set creation date
  },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
