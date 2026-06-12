require('dotenv').config();
const express = require('express');
const tableRoutes = require('./routes/tableRoutes');

const app = express();
app.use(express.json());

// Tell the app to use our new routes
app.use('/api/tables', tableRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});