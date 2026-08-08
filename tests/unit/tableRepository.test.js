const tableRepository = require('../../repositories/tableRepository');
const db = require('../../config/db');

jest.mock('../../config/db', () => ({
    query: jest.fn()
}));

describe('Table Repository Layer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getAllTables should return all table records', async () => {
        const mockRows = [{ id: 1, is_occupied: false }];
        db.query.mockResolvedValue([mockRows]);

        const result = await tableRepository.getAllTables();
        expect(result).toEqual(mockRows);
        expect(db.query).toHaveBeenCalled();
    });

    test('getTableById should return a single table record', async () => {
        const mockRows = [{ id: 1, is_occupied: false }];
        db.query.mockResolvedValue([mockRows]);

        const result = await tableRepository.getTableById(1);
        expect(result).toEqual(mockRows[0]);
        expect(db.query).toHaveBeenCalled();
    });

    test('createTable should insert and return the new table', async () => {
        const mockResult = { insertId: 1 };
        db.query.mockResolvedValue([mockResult]);

        const result = await tableRepository.createTable({ is_occupied: false });
        expect(result).toBeDefined();
        expect(db.query).toHaveBeenCalled();
    });

    test('updateTableStatus should update table status', async () => {
        const mockResult = { affectedRows: 1 };
        db.query.mockResolvedValue([mockResult]);

        const result = await tableRepository.updateTableStatus(1, true);
        expect(result).toBeDefined();
        expect(db.query).toHaveBeenCalled();
    });

    test('deleteTable should remove a table record', async () => {
        const mockResult = { affectedRows: 1 };
        db.query.mockResolvedValue([mockResult]);

        const result = await tableRepository.deleteTable(1);
        expect(result).toBeDefined();
        expect(db.query).toHaveBeenCalled();
    });
});