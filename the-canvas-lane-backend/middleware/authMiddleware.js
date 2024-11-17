const { requireAuth } = require('@clerk/express');

// Middleware to protect routes
module.exports = requireAuth();
