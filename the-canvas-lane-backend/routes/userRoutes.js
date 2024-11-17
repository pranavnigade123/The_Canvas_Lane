const express = require('express');
const User = require('../models/User');
const { requireAuth } = require('@clerk/express');  // Clerk middleware
const router = express.Router();
const clerkClient = require('@clerk/clerk-sdk-node');  // Clerk client to fetch user data

// Route for registering or updating the user in MongoDB
router.post('/register', requireAuth(), async (req, res) => {
  const clerkId = req.auth.userId;  // Clerk userId from the auth middleware

  // Extract additional data from the request body
  const { bio, skills, phone } = req.body;

  try {
    // Fetch the authenticated user's data from Clerk
    const clerkUser = await clerkClient.users.getUser(clerkId);

    // Extract needed fields from the Clerk user object
    const { emailAddresses, username, profileImageUrl } = clerkUser;

    // Check if the user already exists in MongoDB
    let user = await User.findOne({ clerkId });

    if (user) {
      // Update existing user
      user.emailAddresses = emailAddresses.map(emailObj => emailObj.emailAddress);
      user.username = username || user.username;
      user.profilePicture = profileImageUrl || user.profilePicture;
      user.bio = bio || user.bio;
      user.skills = skills || user.skills;
      user.contactDetails.phone = phone || user.contactDetails.phone;

      // Save the updated user to MongoDB
      await user.save();
      res.status(200).json({ message: 'User updated successfully', user });
    } else {
      // Create a new user
      user = new User({
        clerkId,
        emailAddresses: emailAddresses.map(emailObj => emailObj.emailAddress),
        username,
        profilePicture: profileImageUrl,
        bio,
        skills,
        contactDetails: {
          phone,
        },
        role: 'user',
      });

      // Save the new user to MongoDB
      await user.save();
      res.status(201).json({ message: 'User registered successfully', user });
    }
  } catch (error) {
    console.error('Error registering/updating user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;

