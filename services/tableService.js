const tableRepo = require('../repositories/tableRepository');

const fetchAllTables = async () => {
  return await tableRepo.getAllTables();
};

const changeTableStatus = async (id, isOccupied) => {
  if (!id || typeof id !== 'number' || typeof isOccupied !== 'boolean') {
    throw new Error('VALIDATION_ERROR: Invalid table parameters provided.');
  }
  return await tableRepo.updateTableStatus(id, isOccupied);
};

module.exports = { fetchAllTables, changeTableStatus };