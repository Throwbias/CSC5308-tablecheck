const tableRepository = require('../repositories/tableRepository');

const fetchAllTables = async () => {
    return await tableRepository.getAllTables();
};

const getTableById = async (id) => {
    return await tableRepository.getTableById(id);
};

const createTable = async (tableData) => {
    return await tableRepository.createTable(tableData);
};

const updateTableStatus = async (id, status) => {
    return await tableRepository.updateTableStatus(id, status);
};

const changeTableOccupancy = async (id, isOccupied) => {
    // Strictly require id to be a real number type, an integer, and status to be boolean
    if (typeof id !== 'number' || isNaN(id) || !Number.isInteger(id) || typeof isOccupied !== 'boolean') {
        throw new Error('VALIDATION_ERROR: Invalid table parameters provided.');
    }
    return await tableRepository.updateTableStatus(id, isOccupied);
};

const deleteTable = async (id) => {
    return await tableRepository.deleteTable(id);
};

module.exports = {
    fetchAllTables,
    getTableById,
    createTable,
    updateTableStatus,
    changeTableOccupancy,
    deleteTable
};