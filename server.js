<<<<<<< HEAD
require('dotenv').config();
=======
// Make dotenv conditional so it only runs in non-production environments
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

>>>>>>> d449af1a98f726a6185e3e10b1d12218d4ad1321
const express = require('express');
const cors = require('cors');
const tableRoutes = require('./routes/tableRoutes');

// 1. Import newly created routes
const tableRoutes = require('./routes/tableRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// === Middleware ===
app.use(cors());
app.use(express.json()); // Required to parse JSON in POST/PATCH request bodies
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

<<<<<<< HEAD
// Routes
app.use('/api/tables', tableRoutes);

// Server Start
// Only start the server if this file is run directly by Node
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

module.exports = app;
=======
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
>>>>>>> d449af1a98f726a6185e3e10b1d12218d4ad1321
