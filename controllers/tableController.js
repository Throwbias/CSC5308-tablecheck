const tableService = require('../services/tableService');
const { CustomError } = require('../middleware/errorHandler');

// Helper function for consistent success responses
const sendSuccess = (res, statusCode, data) => {
    res.status(statusCode).json({
        status: 'success',
        data: data
    });
};

// 1. GET /api/tables (Read All)
const getAllTables = async (req, res, next) => {
    try {
        const tables = await tableService.fetchAllTables();
        sendSuccess(res, 200, tables);
    } catch (error) {
        next(new CustomError('INTERNAL_ERROR', 'Failed to retrieve tables.', 500));
    }
};

// 2. GET /api/tables/:id (Read One)
const getTableById = async (req, res, next) => {
    try {
        // TODO: Implement fetch logic in tableService
        const tableId = parseInt(req.params.id);
        sendSuccess(res, 200, { id: tableId, isOccupied: false }); 
    } catch (error) {
        next(new CustomError('NOT_FOUND', 'Table not found.', 404));
    }
};

// 3. POST /api/tables (Create)
const createTable = async (req, res, next) => {
    try {
        const { table_number, capacity } = req.body;
        if (!table_number || !capacity) {
            return next(new CustomError('VALIDATION_ERROR', 'table_number and capacity are required.', 400));
        }
        // TODO: Implement create logic in tableService
        sendSuccess(res, 201, { id: 99, table_number, capacity, isOccupied: false });
    } catch (error) {
        next(new CustomError('INTERNAL_ERROR', 'Failed to create table.', 500));
    }
};

// 4. PATCH /api/tables/:id (Update)
const updateTableStatus = async (req, res, next) => {
    try {
        const tableId = parseInt(req.params.id);
        const { isOccupied } = req.body;
        
        const updatedTable = await tableService.changeTableStatus(tableId, isOccupied);
        sendSuccess(res, 200, updatedTable);
    } catch (error) {
        if (error.message.includes('VALIDATION_ERROR')) {
            return next(new CustomError('VALIDATION_ERROR', error.message, 400));
        }
        next(new CustomError('INTERNAL_ERROR', 'Failed to update table.', 500));
    }
};

// 5. DELETE /api/tables/:id (Delete)
const deleteTable = async (req, res, next) => {
    try {
        const tableId = parseInt(req.params.id);
        // TODO: Implement delete logic in tableService
        res.status(204).send(); // 204 No Content does not need a JSON body
    } catch (error) {
        next(new CustomError('INTERNAL_ERROR', 'Failed to delete table.', 500));
    }
};

module.exports = {
    getAllTables,
    getTableById,
    createTable,
    updateTableStatus,
    deleteTable
};