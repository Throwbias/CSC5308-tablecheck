const tableService = require('../services/tableService');

<<<<<<< HEAD
const getTables = async (req, res) => {
  try {
    const data = await tableService.fetchAllTables();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { is_occupied } = req.body;
    const updatedTable = await tableService.changeTableOccupancy(id, is_occupied);
    res.status(200).json(updatedTable);
  } catch (error) {
    if (error.message.includes('VALIDATION_ERROR')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getTables, updateStatus };
=======
// Helper function for consistent success responses
const sendSuccess = (res, statusCode, data) => {
    res.status(statusCode).json({
        status: 'success',
        data: data
    });
};

// Helper function for consistent error responses
const sendError = (res, statusCode, code, message) => {
    res.status(statusCode).json({
        status: 'error',
        error: {
            code: code,
            message: message
        }
    });
};

// 1. GET /api/tables (Read All)
const getAllTables = async (req, res) => {
    try {
        const tables = await tableService.fetchAllTables();
        sendSuccess(res, 200, tables);
    } catch (error) {
        sendError(res, 500, 'SERVER_ERROR', 'Failed to retrieve tables.');
    }
};

// 2. GET /api/tables/:id (Read One)
const getTableById = async (req, res) => {
    try {
        // TODO: Implement fetch logic in tableService
        const tableId = parseInt(req.params.id);
        sendSuccess(res, 200, { id: tableId, isOccupied: false }); 
    } catch (error) {
        sendError(res, 404, 'NOT_FOUND', 'Table not found.');
    }
};

// 3. POST /api/tables (Create)
const createTable = async (req, res) => {
    try {
        const { table_number, capacity } = req.body;
        if (!table_number || !capacity) {
            return sendError(res, 400, 'VALIDATION_ERROR', 'table_number and capacity are required.');
        }
        // TODO: Implement create logic in tableService
        sendSuccess(res, 201, { id: 99, table_number, capacity, isOccupied: false });
    } catch (error) {
        sendError(res, 500, 'SERVER_ERROR', 'Failed to create table.');
    }
};

// 4. PATCH /api/tables/:id (Update)
const updateTableStatus = async (req, res) => {
    try {
        const tableId = parseInt(req.params.id);
        const { isOccupied } = req.body;
        
        const updatedTable = await tableService.changeTableStatus(tableId, isOccupied);
        sendSuccess(res, 200, updatedTable);
    } catch (error) {
        if (error.message.includes('VALIDATION_ERROR')) {
            return sendError(res, 400, 'VALIDATION_ERROR', error.message);
        }
        sendError(res, 500, 'SERVER_ERROR', 'Failed to update table.');
    }
};

// 5. DELETE /api/tables/:id (Delete)
const deleteTable = async (req, res) => {
    try {
        const tableId = parseInt(req.params.id);
        // TODO: Implement delete logic in tableService
        res.status(204).send(); // 204 No Content does not need a JSON body
    } catch (error) {
        sendError(res, 500, 'SERVER_ERROR', 'Failed to delete table.');
    }
};

module.exports = {
    getAllTables,
    getTableById,
    createTable,
    updateTableStatus,
    deleteTable
};
>>>>>>> d449af1a98f726a6185e3e10b1d12218d4ad1321
