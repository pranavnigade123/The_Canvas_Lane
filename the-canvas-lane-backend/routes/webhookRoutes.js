const express = require('express');  // Import express only once
const router = express.Router();
const User = require('../models/User');  // Import the User model

// Webhook route to receive Clerk events
router.post('/', express.json(), async (req, res) => {
  const event = req.body;

  try {
    switch (event.type) {
      case 'user.created': {
        const { id, email_addresses, username, profile_image_url } = event.data;

        // Check if the user already exists in MongoDB
        let user = await User.findOne({ clerkId: id });
        if (!user) {
          // Create a new user in MongoDB
          user = new User({
            clerkId: id,
            emailAddresses: email_addresses.map(e => e.email_address),
            username,
            profilePicture: profile_image_url,
          });
          await user.save();
        }
        console.log('New user created and saved to MongoDB:', user);
        break;
      }
      case 'user.updated': {
        const { id, email_addresses, username, profile_image_url } = event.data;

        // Update the user in MongoDB
        await User.findOneAndUpdate(
          { clerkId: id },
          {
            emailAddresses: email_addresses.map(e => e.email_address),
            username,
            profilePicture: profile_image_url,
          }
        );
        console.log('User updated in MongoDB');
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).send('Webhook event received and processed');
  } catch (error) {
    console.error('Error processing webhook event:', error);
    res.status(500).send('Error processing webhook event');
  }
});

module.exports = router;

