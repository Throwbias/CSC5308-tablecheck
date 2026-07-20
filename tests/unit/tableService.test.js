const tableService = require('../../services/tableService');
const tableRepo = require('../../repositories/tableRepository');

// Mock the repository
jest.mock('../../repositories/tableRepository');

describe('Table Service Layer', () => {
    
    // ... other tests ...

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
    });
});