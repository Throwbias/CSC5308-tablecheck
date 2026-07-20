require('dotenv').config();
const express = require('express');
const cors = require('cors');
const tableRoutes = require('./routes/tableRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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