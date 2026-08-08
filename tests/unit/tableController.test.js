const tableController = require('../../controllers/tableController');
const tableService = require('../../services/tableService');

// Mock the table service
jest.mock('../../services/tableService');

describe('Table Controller', () => {
    let req, res;
    const mockTables = [{ id: 1, is_occupied: false }];

    beforeEach(() => {
        // Reset request and response mocks before each test
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    test('should return 200 and all tables when fetchAllTables succeeds', async () => {
        // Arrange
        tableService.fetchAllTables.mockResolvedValue(mockTables);

        // Act
        await tableController.getAllTables(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            data: mockTables
        });
    });

    test('should return 500 when fetchAllTables fails', async () => {
        // Arrange
        tableService.fetchAllTables.mockRejectedValue(new Error('DB Error'));

        // Act
        await tableController.getAllTables(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            error: {
                code: 'SERVER_ERROR',
                message: 'Failed to retrieve tables.'
            }
        });
    });
});