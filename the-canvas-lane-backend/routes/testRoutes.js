const express = require('express');
const router = express.Router();

// Test route to check connection with the frontend
router.get('/test', (req, res) => {
  res.json({ message: 'Backend connected successfully!' });
});

module.exports = router;
