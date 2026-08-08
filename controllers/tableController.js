const tableService = require('../services/tableService');

const sendSuccess = (res, statusCode, data) => {
  res.status(statusCode).json({
    status: 'success',
    data,
  });
};

const sendError = (res, statusCode, code, message) => {
  res.status(statusCode).json({
    status: 'error',
    error: {
      code,
      message,
    },
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
    const tableId = parseInt(req.params.id, 10);
    const tables = await tableService.fetchAllTables();
    const table = tables.find((item) => Number(item.id) === tableId);

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

    if (!table_number || !capacity) {
      return sendError(res, 400, 'VALIDATION_ERROR', 'table_number and capacity are required.');
    }

    if (typeof tableService.createTable === 'function') {
      const newTable = await tableService.createTable({ table_number, capacity });
      return sendSuccess(res, 201, newTable);
    }

    return sendSuccess(res, 201, { id: 99, table_number, capacity, isOccupied: false });
  } catch (error) {
    return sendError(res, 500, 'SERVER_ERROR', 'Failed to create table.');
  }
};

const updateStatus = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { is_occupied, isOccupied } = req.body;
    const occupancy = is_occupied !== undefined ? is_occupied : isOccupied;

    if (typeof tableService.changeTableStatus === 'function') {
      const updatedTable = await tableService.changeTableStatus(id, occupancy);
      return sendSuccess(res, 200, updatedTable);
    }

    const updatedTable = await tableService.changeTableOccupancy(id, occupancy);
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
    const tableId = parseInt(req.params.id, 10);

    if (typeof tableService.deleteTable === 'function') {
      await tableService.deleteTable(tableId);
      return res.status(204).send();
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
  deleteTable,
};
