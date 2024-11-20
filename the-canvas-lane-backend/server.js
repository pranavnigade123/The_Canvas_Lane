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
    'http://localhost:5173', // Frontend URL
    'https://039e-2401-4900-1c9b-2592-7063-5649-4b37-d6f4.ngrok-free.app', // Current Ngrok URL
];

app.use((req, res, next) => {
    const origin = req.headers.origin;

    // Log the request origin and whether it's allowed
    console.log('Request Origin:', origin);
    console.log('Allowed Origin:', allowedOrigins.includes(origin));

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin); // Dynamically set allowed origin
        res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE'); // Allowed methods
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization, x-requested-with'
        ); // Allowed headers
    }

    if (req.method === 'OPTIONS') {
        // Respond to preflight request
        return res.sendStatus(200);
    }

    next();
});

// Middleware for parsing JSON
app.use(express.json());

// Debugging middleware to log requests
app.use((req, res, next) => {
    console.log(`[Request] ${req.method} ${req.url}`);
    console.log('[Headers]:', req.headers);
    console.log('[Body]:', req.body);
    next();
});

// Routes
app.use('/webhook', webhookRoutes);

app.get('/protected', requireAuth({ signInUrl: '/sign-in' }), (req, res) => {
    console.log('[Protected Route] Accessed by user:', req.auth?.userId);
    return res.json({ message: 'You are signed in!', userId: req.auth?.userId });
});

app.use('/api/users', requireAuth({ signInUrl: '/sign-in' }), userRoutes);
app.use('/api/portfolios', requireAuth(), (req, res, next) => {
    console.log('[Auth Middleware] Token:', req.headers.authorization); // Log token
    console.log('[Auth Middleware] Authenticated User:', req.auth?.userId); // Log authenticated user
    next();
}, portfolioRoutes);

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
