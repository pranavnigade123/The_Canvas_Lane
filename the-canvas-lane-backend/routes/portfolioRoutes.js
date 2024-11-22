const express = require('express');
const { requireAuth } = require('@clerk/express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Portfolio = require('../models/Portfolio');
const fetchUserProfileFromClerk = require('../config/clerk'); // Adjust path if necessary
const mongoose = require('mongoose');


const router = express.Router();

// Ensure the 'uploads' directory exists
const ensureUploadsDir = () => {
  const dir = path.join(__dirname, '../uploads');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

// Configure multer for temporary local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensureUploadsDir();
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Route for creating a portfolio
router.post('/create', requireAuth(), upload.array('media', 10), async (req, res) => {
  const { title, description, tags, toolsUsed } = req.body;
  const clerkUserId = req.auth.userId;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No media files uploaded' });
  }

  try {
    const media = req.files.map((file) => ({
      url: file.path,
      type: file.mimetype.startsWith('image') ? 'image' : 'video',
    }));

    const newPortfolio = new Portfolio({
      title,
      description,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      toolsUsed: toolsUsed ? toolsUsed.split(',').map(tool => tool.trim()) : [],
      media,
      creator: clerkUserId,
    });

    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } catch (error) {
    console.error('Error creating portfolio:', {
      error,
      body: req.body,
      files: req.files,
      userId: clerkUserId,
    });
    res.status(500).json({ message: 'Error creating portfolio', error: error.message });
  }
});


// Route to get all portfolios with Clerk user details, with caching optimization
router.get('/all', requireAuth(), async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    const userProfileCache = {};

    const enrichedPortfolios = await Promise.all(
      portfolios.map(async (portfolio) => {
        const userId = portfolio.creator;

        if (!userId) {
          return {
            ...portfolio.toObject(),
            userName: 'Unknown User',
            userProfilePic: 'https://via.placeholder.com/40',
          };
        }

        if (!userProfileCache[userId]) {
          try {
            const userProfile = await fetchUserProfileFromClerk(userId);
            userProfileCache[userId] = userProfile
              ? { username: userProfile.username, profilePic: userProfile.profile_image_url }
              : { username: 'Unknown User', profilePic: 'https://via.placeholder.com/40' };
          } catch (error) {
            console.error(`Error fetching profile for userId ${userId}:`, error);
            userProfileCache[userId] = { username: 'Unknown User', profilePic: 'https://via.placeholder.com/40' };
          }
        }

        return {
          ...portfolio.toObject(),
          userName: userProfileCache[userId].username,
          userProfilePic: userProfileCache[userId].profilePic,
        };
      })
    );

    res.status(200).json(enrichedPortfolios);
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    res.status(500).json({ message: 'Error fetching portfolios' });
  }
});

// Route to get all portfolios for a specific user
router.get("/user-portfolios", requireAuth(), async (req, res) => {
  const clerkId = req.auth.userId; // Clerk ID of the authenticated user

  try {
    // Fetch portfolios where the 'creator' field matches the Clerk ID
    const portfolios = await Portfolio.find({ "creator": clerkId });
    if (!portfolios || portfolios.length === 0) {
      return res.status(404).json({ message: "No portfolios found for this user." });
    }
    res.status(200).json(portfolios);
  } catch (error) {
    console.error("Error retrieving user portfolios:", error);
    res.status(500).json({ message: "Error retrieving user portfolios" });
  }
});

// Update route for portfolios
router.put('/update/:id', requireAuth(), upload.array('media', 10), async (req, res) => {
  const { id } = req.params;
  const { title, description, tags, toolsUsed } = req.body;

  try {
    let media = [];
    if (req.files && req.files.length > 0) {
      media = req.files.map((file) => ({
        url: file.path,
        type: file.mimetype.startsWith('image') ? 'image' : 'video',
      }));
    }

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      id,
      { title, description, tags, toolsUsed, media },
      { new: true }
    );

    if (!updatedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.error('Error updating portfolio:', error);
    res.status(500).json({ message: 'Error updating portfolio', error });
  }
});

// Delete route for portfolios
router.delete('/delete/:id', requireAuth(), async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPortfolio = await Portfolio.findByIdAndDelete(id);
    if (!deletedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.status(200).json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    res.status(500).json({ message: 'Error deleting portfolio', error });
  }
});

module.exports = router;
