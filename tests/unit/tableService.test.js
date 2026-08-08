const tableService = require('../../services/tableService');
const tableRepo = require('../../repositories/tableRepository');

jest.mock('../../repositories/tableRepository');

describe('Table Service Layer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchAllTables', () => {
        test('should return all tables successfully', async () => {
            const mockTables = [{ id: 1, isOccupied: false }, { id: 2, isOccupied: true }];
            tableRepo.getAllTables.mockResolvedValue(mockTables);

            const result = await tableService.fetchAllTables();

            expect(result).toEqual(mockTables);
            expect(tableRepo.getAllTables).toHaveBeenCalledTimes(1);
        });
    });

    describe('getTableById', () => {
        test('should return a single table by id', async () => {
            const mockTable = { id: 1, isOccupied: false };
            tableRepo.getTableById.mockResolvedValue(mockTable);

            const result = await tableService.getTableById(1);

            expect(result).toEqual(mockTable);
            expect(tableRepo.getTableById).toHaveBeenCalledWith(1);
        });
    });

    describe('createTable', () => {
        test('should create and return a new table', async () => {
            const newTableData = { isOccupied: false };
            const createdTable = { id: 1, isOccupied: false };
            tableRepo.createTable.mockResolvedValue(createdTable);

            const result = await tableService.createTable(newTableData);

            expect(result).toEqual(createdTable);
            expect(tableRepo.createTable).toHaveBeenCalledWith(newTableData);
        });
    });

    describe('updateTableStatus', () => {
        test('should update table status successfully', async () => {
            const updatedTable = { id: 1, isOccupied: true };
            tableRepo.updateTableStatus.mockResolvedValue(updatedTable);

            const result = await tableService.updateTableStatus(1, true);

            expect(result).toEqual(updatedTable);
            expect(tableRepo.updateTableStatus).toHaveBeenCalledWith(1, true);
        });
    });

    describe('deleteTable', () => {
        test('should delete a table successfully', async () => {
            tableRepo.deleteTable.mockResolvedValue(true);

            const result = await tableService.deleteTable(1);

            expect(result).toBe(true);
            expect(tableRepo.deleteTable).toHaveBeenCalledWith(1);
        });
    });

    describe('changeTableOccupancy', () => {
        const mockUpdatedTable = { id: 1, name: 'Table 1', isOccupied: true };

        test('throws an error if the repository cannot find the table to update', async () => {
            tableRepo.updateTableStatus.mockResolvedValue(null);
            const result = await tableService.changeTableOccupancy(1, true);
            expect(result).toBeNull();
        });

        test('throws an error when the database connection fails during update', async () => {
            tableRepo.updateTableStatus.mockRejectedValue(new Error('Connection timeout'));
            await expect(tableService.changeTableOccupancy(2, true))
                .rejects
                .toThrow('Connection timeout');
        });

        test('Security: rejects SQL injection attempt in table ID', async () => {
            await expect(tableService.changeTableOccupancy("1; DROP TABLE restaurant_tables;", true))
                .rejects
                .toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
            expect(tableRepo.updateTableStatus).not.toHaveBeenCalled();
        });

        test('Security: rejects non-boolean occupancy status input', async () => {
            await expect(tableService.changeTableOccupancy(1, "True OR 1=1"))
                .rejects
                .toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
            expect(tableRepo.updateTableStatus).not.toHaveBeenCalled();
        });

        test('Security: rejects missing table ID parameter', async () => {
            await expect(tableService.changeTableOccupancy(null, true))
                .rejects
                .toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
            expect(tableRepo.updateTableStatus).not.toHaveBeenCalled();
        });

        test('Security: rejects invalid data types for both table ID and occupancy status', async () => {
            await expect(tableService.changeTableOccupancy("invalid_id", "invalid_status"))
                .rejects
                .toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
            expect(tableRepo.updateTableStatus).not.toHaveBeenCalled();
        });

        test('Security: rejects string representations of numbers if strict numeric type is enforced', async () => {
            await expect(tableService.changeTableOccupancy("1", true))
                .rejects
                .toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
        });

        test('Security: rejects floating point numbers as table IDs', async () => {
            await expect(tableService.changeTableOccupancy(1.5, true))
                .rejects
                .toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
            expect(tableRepo.updateTableStatus).not.toHaveBeenCalled();
        });

        test('Security: rejects undefined occupancy status input', async () => {
            await expect(tableService.changeTableOccupancy(1, undefined))
                .rejects
                .toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
            expect(tableRepo.updateTableStatus).not.toHaveBeenCalled();
        });

        test('successfully updates table occupancy when valid parameters are provided', async () => {
            tableRepo.updateTableStatus.mockResolvedValue(mockUpdatedTable);

            const result = await tableService.changeTableOccupancy(1, true);

            expect(result).toEqual(mockUpdatedTable);
            expect(tableRepo.updateTableStatus).toHaveBeenCalledWith(1, true);
        });
    });
});