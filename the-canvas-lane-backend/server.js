const express = require('express');
const dotenv = require('dotenv');
const { requireAuth } = require('@clerk/express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
    'http://localhost:5173', // Frontend URL
    'https://c684-2401-4900-560f-7752-508a-ccf6-a2c4-ad94.ngrok-free.app', // Current Ngrok URL
];

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin); // Dynamically allow the requesting origin
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization, x-requested-with'
        );
    }

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Handle preflight requests
    }

    next();
});
// Middleware for parsing JSON
app.use(express.json());

// Debugging Middleware for All Requests
app.use((req, res, next) => {
    console.log('[Request Middleware] Request received');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// Routes
app.use('/webhook', webhookRoutes);

// Protected Route with Clerk Auth
app.get('/protected', requireAuth({ signInUrl: '/sign-in' }), (req, res) => {
    console.log('[Protected Route] Accessed by user:', req.auth?.userId);
    return res.json({ message: 'You are signed in!', userId: req.auth?.userId });
});
app.use('/api', requireAuth(), portfolioRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// API Route with Auth Middleware Logs
app.use('/api/portfolios', requireAuth(), (req, res, next) => {
    console.log('[API Route] Auth Middleware triggered');
    console.log('Authorization Header:', req.headers.authorization);
    console.log('Authenticated User:', req.auth?.userId);
    next();
}, portfolioRoutes);

//
app.use('/api/users', userRoutes); // Add the route prefix here

// Catch-all Route
app.use((req, res, next) => {
    const error = new Error(`Endpoint ${req.originalUrl} not found`);
    console.log('[Catch-all Middleware] Unknown endpoint accessed:', req.originalUrl);
    error.status = 404;
    next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('[Error Handler] An error occurred:', err.message);
    console.error('Stack:', err.stack);
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
