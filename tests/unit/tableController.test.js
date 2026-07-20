const tableController = require('../../controllers/tableController');
const tableService = require('../../services/tableService');

// This line must be here to prevent the test from using the real service
jest.mock('../../services/tableService');

describe('Table Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('should return 200 and all tables when fetchAllTables succeeds', async () => {
        const mockTables = [{ id: 1, is_occupied: false }];
        tableService.fetchAllTables.mockResolvedValue(mockTables);

        // Ensure this matches the function name in tableController.js
        await tableController.getTables(req, res); 

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockTables);
    });

    test('should return 500 when fetchAllTables fails', async () => {
        tableService.fetchAllTables.mockRejectedValue(new Error('DB Error'));

        await tableController.getTables(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
});