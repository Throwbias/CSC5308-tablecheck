require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Keep this
const tableRoutes = require('./routes/tableRoutes'); // Keep your routes

const app = express();

// Middleware
app.use(cors()); // Keep this
app.use(express.json());

// Routes
app.use('/api/tables', tableRoutes); // Keep your route setup

// ... the rest of the file (SERVER START section) remains as it is