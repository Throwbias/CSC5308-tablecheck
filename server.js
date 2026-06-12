require('dotenv').config(); 
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==========================================
// ROUTES (Valerie will import her new files here)
// ==========================================
// Example: 
// const tableRoutes = require('./routes/tableRoutes');
// app.use('/api/tables', tableRoutes);


// ==========================================
// SERVER START
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`TableLogic API Server running on port ${PORT}`);
});