const tableRepo = require('../repositories/tableRepository');

// Business logic for fetching tables
const fetchAllTables = async () => {
  return await tableRepo.getAllTables();
};

// Business logic for updating a table
const changeTableStatus = async (id, isOccupied) => {
  // You could add validation here, for example:
  // if (isOccupied === undefined) throw new Error("Status is required");
  return await tableRepo.updateTableStatus(id, isOccupied);
};

module.exports = { fetchAllTables, changeTableStatus };