const tableRepository = require('../repositories/tableRepository');

const fetchAllTables = async () => {
  return await tableRepository.getAllTables();
};

const changeTableOccupancy = async (id, isOccupied) => {
  // This is the specific business rule your tests are checking for!
  if (!id || typeof id !== 'number' || typeof isOccupied !== 'boolean') {
    throw new Error('VALIDATION_ERROR: Invalid table parameters provided.');
  }
  return await tableRepository.updateTableStatus(id, isOccupied);
};

module.exports = { fetchAllTables, changeTableOccupancy };