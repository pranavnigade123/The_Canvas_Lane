const express = require('express');
const dotenv = require('dotenv');
const { requireAuth } = require('@clerk/express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://1427-2401-4900-7fa5-191f-3c35-d3eb-f9ae-203a.ngrok-free.app',
];

// Middleware to handle CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log(`[CORS Middleware] Incoming request from origin: ${origin}`);

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    console.log(`[CORS Middleware] Origin allowed: ${origin}`);
  } else {
    console.warn(`[CORS Middleware] Origin not allowed: ${origin}`);
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-requested-with');

  if (req.method === 'OPTIONS') {
    console.log('[CORS Middleware] Preflight request received, sending 200');
    return res.sendStatus(200);
  }

  next();
});

// Middleware for parsing JSON
app.use(express.json());

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`[Request Logger] ${req.method} ${req.url}`);
  console.log('[Request Logger] Headers:', req.headers);
  console.log('[Request Logger] Body:', req.body);
  next();
});

// Routes
app.use('/webhook', webhookRoutes);

app.get('/protected', requireAuth({ signInUrl: '/sign-in' }), (req, res) => {
  console.log('[Protected Route] Accessed by user:', req.auth.userId);
  return res.json({ message: 'You are signed in!', userId: req.auth.userId });
});

app.use('/api/users', requireAuth({ signInUrl: '/sign-in' }), userRoutes);
app.use('/api/portfolios', portfolioRoutes);

// Catch-all route for undefined endpoints
app.use((req, res, next) => {
  const error = new Error(`Endpoint ${req.originalUrl} not found`);
  error.status = 404;
  next(error);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Error Handler] An error occurred:', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
