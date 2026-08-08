const tableController = require('../../controllers/tableController');
const tableService = require('../../services/tableService');

jest.mock('../../services/tableService');

describe('Table Controller Layer', () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        };
    });

    test('getTables should return all tables successfully', async () => {
        const mockTables = [{ id: 1, isOccupied: false }];
        tableService.fetchAllTables.mockResolvedValue(mockTables);

        await tableController.getTables(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockTables);
    });

    test('getTableById should return a specific table', async () => {
        req.params.id = 1;
        const mockTable = { id: 1, isOccupied: false };
        tableService.getTableById.mockResolvedValue(mockTable);

        await tableController.getTableById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockTable);
    });

    test('createTable should create a new table successfully', async () => {
        req.body = { isOccupied: false };
        const mockCreated = { id: 1, isOccupied: false };
        tableService.createTable.mockResolvedValue(mockCreated);

        await tableController.createTable(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockCreated);
    });

    test('updateTableStatus should update the table status', async () => {
        req.params.id = 1;
        req.body = { isOccupied: true };
        const mockUpdated = { id: 1, isOccupied: true };
        tableService.changeTableOccupancy.mockResolvedValue(mockUpdated);

        await tableController.updateTableStatus(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUpdated);
    });

    test('deleteTable should delete the table successfully', async () => {
        req.params.id = 1;
        tableService.deleteTable.mockResolvedValue(true);

        await tableController.deleteTable(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});