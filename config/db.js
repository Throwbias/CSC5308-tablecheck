// config/db.js
const { Pool } = require('pg');
require('dotenv').config();

// Initialize the shared connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for NeonDB cloud connections
  }
});

module.exports = pool;