const { Pool } = require('pg');

// Create the connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { 
    rejectUnauthorized: false,
    sslmode: 'require' // Adding this tells the library exactly what you want
  }
});

// Define the database queries
const getAllTables = async () => {
  const result = await pool.query('SELECT * FROM restaurant_tables ORDER BY id ASC');
  return result.rows;
};

const updateTableStatus = async (id, isOccupied) => {
  const updateQuery = `
    UPDATE restaurant_tables 
    SET is_occupied = $1, last_updated = CURRENT_TIMESTAMP 
    WHERE id = $2 
    RETURNING *;
  `;
  const result = await pool.query(updateQuery, [isOccupied, id]);
  return result.rows[0];
};

module.exports = { getAllTables, updateTableStatus };