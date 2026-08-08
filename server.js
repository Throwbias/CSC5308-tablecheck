require('dotenv').config();
const express = require('express');
const cors = require('cors');
const tableRoutes = require('./routes/tableRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// === Middleware ===
app.use(cors());
app.use(express.json()); // Required to parse JSON in POST/PATCH request bodies

// Routes
app.use('/api/tables', tableRoutes);

// Server Start
// Only start the server if this file is run directly by Node
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;