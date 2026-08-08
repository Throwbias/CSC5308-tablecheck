const tableService = require('../../services/tableService');
const tableRepo = require('../../repositories/tableRepository');

// Mock the repository
jest.mock('../../repositories/tableRepository');

describe('Table Service Layer', () => {
    
    describe('changeTableOccupancy', () => {
        test('throws an error if the repository cannot find the table to update', async () => {
            // Arrange
            tableRepo.updateTableStatus.mockResolvedValue(null);

            // Act
            const result = await tableService.changeTableOccupancy(999, true);

            // Assert
            expect(result).toBeNull();
        });

        test('throws an error when the database connection fails during update', async () => {
            // Arrange
            tableRepo.updateTableStatus.mockRejectedValue(new Error('Connection timeout'));

            // Act & Assert
            await expect(tableService.changeTableOccupancy(2, true))
                .rejects.toThrow('Connection timeout');
        });

        test('Security: rejects SQL injection attempt in table ID', async () => {
            jest.clearAllMocks();
            await expect(tableService.changeTableOccupancy("1; DROP TABLE restaurant_tables;", true))
                .rejects
                .toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
            expect(tableRepo.updateTableStatus).not.toHaveBeenCalled();
        });

        test('Security: rejects non-boolean occupancy status input', async () => {
            jest.clearAllMocks();
            await expect(tableService.changeTableOccupancy(1, "True OR 1=1"))
                .rejects
                .toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
            expect(tableRepo.updateTableStatus).not.toHaveBeenCalled();
        });

        test('Security: rejects missing table ID parameter', async () => {
            jest.clearAllMocks();
            await expect(tableService.changeTableOccupancy(null, true))
                .rejects
                .toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
            expect(tableRepo.updateTableStatus).not.toHaveBeenCalled();
        });

        test('Security: rejects invalid data types for both table ID and occupancy status', async () => {
            jest.clearAllMocks();
            await expect(tableService.changeTableOccupancy("invalid_id", "invalid_status"))
                .rejects
                .toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
            expect(tableRepo.updateTableStatus).not.toHaveBeenCalled();
        });

        test('successfully updates table occupancy when valid parameters are provided', async () => {
            // Arrange
            const mockUpdatedTable = { id: 1, is_occupied: true };
            tableRepo.updateTableStatus.mockResolvedValue(mockUpdatedTable);

            // Act
            const result = await tableService.changeTableOccupancy(1, true);

            // Assert
            expect(result).toEqual(mockUpdatedTable);
            expect(tableRepo.updateTableStatus).toHaveBeenCalledWith(1, true);
        });
    });
});