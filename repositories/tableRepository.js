const pool = require('../config/db');

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