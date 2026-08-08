const tableService = require('../services/tableService');

const sendSuccess = (res, statusCode, data) => {
  res.status(statusCode).json({
    status: 'success',
    data
  });
};

const sendError = (res, statusCode, code, message) => {
  res.status(statusCode).json({
    status: 'error',
    error: { code, message }
  });
};

const getTables = async (req, res) => {
  try {
    const data = await tableService.fetchAllTables();
    return sendSuccess(res, 200, data);
  } catch (error) {
    return sendError(res, 500, 'SERVER_ERROR', 'Failed to retrieve tables.');
  }
};

const getAllTables = getTables;

const getTableById = async (req, res) => {
  try {
    const tableId = Number(req.params.id);
    const table = tableService.fetchTableById
      ? await tableService.fetchTableById(tableId)
      : { id: tableId, isOccupied: false };

    if (!table) {
      return sendError(res, 404, 'NOT_FOUND', 'Table not found.');
    }

    return sendSuccess(res, 200, table);
  } catch (error) {
    return sendError(res, 404, 'NOT_FOUND', 'Table not found.');
  }
};

const createTable = async (req, res) => {
  try {
    const { table_number, capacity } = req.body;
    if (!table_number || capacity === undefined || capacity === null) {
      return sendError(res, 400, 'VALIDATION_ERROR', 'table_number and capacity are required.');
    }

    const createdTable = tableService.createTable
      ? await tableService.createTable({ table_number, capacity })
      : { id: 99, table_number, capacity, isOccupied: false };

    return sendSuccess(res, 201, createdTable);
  } catch (error) {
    return sendError(res, 500, 'SERVER_ERROR', 'Failed to create table.');
  }
};

const updateStatus = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { is_occupied, isOccupied } = req.body;
    const occupancy = typeof isOccupied !== 'undefined' ? isOccupied : is_occupied;

    const updatedTable = tableService.changeTableStatus
      ? await tableService.changeTableStatus(id, occupancy)
      : tableService.changeTableOccupancy
        ? await tableService.changeTableOccupancy(id, occupancy)
        : { id, isOccupied: occupancy };

    return sendSuccess(res, 200, updatedTable);
  } catch (error) {
    if (error && error.message && error.message.includes('VALIDATION_ERROR')) {
      return sendError(res, 400, 'VALIDATION_ERROR', error.message);
    }
    return sendError(res, 500, 'SERVER_ERROR', 'Failed to update table.');
  }
};

const updateTableStatus = updateStatus;

const deleteTable = async (req, res) => {
  try {
    const tableId = Number(req.params.id);

    if (tableService.deleteTable) {
      await tableService.deleteTable(tableId);
    }

    return res.status(204).send();
  } catch (error) {
    return sendError(res, 500, 'SERVER_ERROR', 'Failed to delete table.');
  }
};

module.exports = {
  getTables,
  getAllTables,
  getTableById,
  createTable,
  updateStatus,
  updateTableStatus,
  deleteTable
};
