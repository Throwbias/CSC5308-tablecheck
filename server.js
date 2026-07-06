require('dotenv').config(); 
const express = require('express');
const cors = require('cors');

// 1. Import newly created routes
const tableRoutes = require('./routes/tableRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// === Middleware ===
app.use(cors());
app.use(express.json()); // Required to parse JSON in POST/PATCH request bodies

// === API Routes ===
// 2. Mount the table routes to the '/api/tables' path
app.use('/api/tables', tableRoutes);

// === Health Check / Root Endpoint ===
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'success', 
        message: 'TableLogic API is running' 
    });
});

// === Global 404 Handler ===
// Handles requests to undefined routes safely to enforce consistent error formatting
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        error: {
            code: 'NOT_FOUND',
            message: 'Endpoint not found.'
        }
    });
});

// === Start Server ===
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});