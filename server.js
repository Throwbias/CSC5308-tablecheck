// Make dotenv conditional so it only runs in non-production environments
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const { apiLimiter } = require('./middleware/rateLimiter');
const { CustomError, errorHandler } = require('./middleware/errorHandler');

// 1. Import newly created routes
const tableRoutes = require('./routes/tableRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// === Middleware ===
// Enable CORS before any early-response middleware so error responses include CORS headers
app.use(cors());
app.use(apiLimiter);
app.use(express.json()); // Required to parse JSON in POST/PATCH request bodies

// === API Routes ===
// 2. Mount the table routes to the '/api/tables' path
app.use('/api/tables', tableRoutes);

// === Health Check Endpoint (Deployment Reliability) ===
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// === Root Endpoint ===
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'success', 
        message: 'TableLogic API is running' 
    });
});

// === Global 404 Handler ===
// Handles requests to undefined routes safely to enforce consistent error formatting
app.use((req, res, next) => {
    next(new CustomError('NOT_FOUND', 'Endpoint not found.', 404));
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// === Start Server ===
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// === Graceful Shutdown Handler (Deployment Reliability) ===
const gracefulShutdown = (signal) => {
    console.log(`\n${signal} signal received: closing HTTP server`);
    
    server.close(() => {
        console.log('HTTP server closed. Safe to exit.');
        process.exit(0); // Standard exit code for a successful shutdown
    });

    // Force close if it takes longer than 10 seconds
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1); // Exit code 1 indicates an error/forced shutdown
    }, 10000);
};

// Listen for termination signals from Docker/Linux
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));