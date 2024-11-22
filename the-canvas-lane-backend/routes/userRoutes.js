const express = require('express');
const User = require('../models/User'); // User model
const { requireAuth } = require('@clerk/express'); // Clerk middleware
const clerkClient = require('@clerk/clerk-sdk-node'); // Clerk client to fetch user data

const router = express.Router();

/**
 * Route for registering or updating the user in MongoDB
 */
router.post('/register', requireAuth(), async (req, res) => {
  const clerkId = req.auth.userId; // Clerk userId from the auth middleware
  const { bio = '', skills = [], phone = '' } = req.body; // Set defaults

  try {
    const clerkUser = await clerkClient.users.getUser(clerkId);
    const { emailAddresses, username, profileImageUrl } = clerkUser;

    let user = await User.findOne({ clerkId });

    if (user) {
      // Update existing user
      user.emailAddresses = emailAddresses.map(emailObj => emailObj.emailAddress);
      user.username = username || user.username;
      user.profilePicture = profileImageUrl || user.profilePicture;
      user.bio = bio || user.bio;
      user.skills = skills.length > 0 ? skills : user.skills;
      user.contactDetails.phone = phone || user.contactDetails.phone;

      await user.save();
      return res.status(200).json({ message: 'User updated successfully', user });
    }

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

    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering/updating user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

/**
 * Route to get user details by Clerk ID
 */
router.get('/:clerkId', requireAuth(), async (req, res) => {
  const clerkId = req.params.clerkId;

  try {
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Profile Picture URL:', user.profilePicture); // Debug log


    res.status(200).json({
      message: 'User fetched successfully',
      user,
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({
      message: 'Internal server error while fetching user details',
      error: error.message,
    });
  }
});
/**
 * Route to update user details dynamically
 */
router.post('/update', requireAuth(), async (req, res) => {
  const clerkId = req.auth.userId; // Clerk userId from the auth middleware
  const { bio, skills, phone } = req.body;

  console.log("Received Payload:", req.body); // Log the incoming payload
  try {
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Safely update fields only if they are provided
    if (bio !== undefined) user.bio = bio;
    if (skills && Array.isArray(skills)) user.skills = skills;
    if (phone !== undefined) user.contactDetails.phone = phone;

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
