// Arrange: Import the service we are testing and the repository we need to mock
const tableService = require('../../services/tableService');
const tableRepository = require('../../repositories/tableRepository');

// Arrange: Instruct Jest to intercept and mock all functions inside tableRepository
jest.mock('../../repositories/tableRepository');

describe('Table Service Layer', () => {
  
  // Clear mock data before every single test to prevent data leaks
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==========================================
  // FEATURE 1: Fetch All Tables
  // ==========================================
  describe('fetchAllTables', () => {
    
    it('returns an array of tables successfully', async () => {
      // Arrange
      const mockData = [{ id: 1, table_name: 'T1', is_occupied: false }];
      tableRepository.getAllTables.mockResolvedValue(mockData);

      // Act
      const result = await tableService.fetchAllTables();

      // Assert
      expect(tableRepository.getAllTables).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockData);
    });

    it('returns an empty array when no tables exist in the database', async () => {
      // Arrange
      tableRepository.getAllTables.mockResolvedValue([]);

      // Act
      const result = await tableService.fetchAllTables();

      // Assert
      expect(result).toEqual([]);
    });

    it('throws an error when the database query fails', async () => {
      // Arrange
      tableRepository.getAllTables.mockRejectedValue(new Error('Database offline'));

      // Act & Assert
      await expect(tableService.fetchAllTables()).rejects.toThrow('Database offline');
    });
  });

  // ==========================================
  // FEATURE 2: Change Table Occupancy
  // ==========================================
  describe('changeTableOccupancy', () => {
    
    it('returns the updated table when given valid parameters', async () => {
      // Arrange
      const expectedOutput = { id: 2, table_name: 'T2', is_occupied: true };
      tableRepository.updateTableStatus.mockResolvedValue(expectedOutput);

      // Act
      const result = await tableService.changeTableOccupancy(2, true);

      // Assert
      expect(tableRepository.updateTableStatus).toHaveBeenCalledWith(2, true);
      expect(result).toEqual(expectedOutput);
    });

    it('rejects update when the table id is missing', async () => {
      // Act & Assert
      await expect(tableService.changeTableOccupancy(null, true))
        .rejects.toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
      expect(tableRepository.updateTableStatus).not.toHaveBeenCalled();
    });

    it('rejects update when the table id is not a valid number', async () => {
      // Act & Assert
      await expect(tableService.changeTableOccupancy("abc", true))
        .rejects.toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
      expect(tableRepository.updateTableStatus).not.toHaveBeenCalled();
    });

    it('rejects update when the is_occupied parameter is missing', async () => {
      // Act & Assert
      await expect(tableService.changeTableOccupancy(2, undefined))
        .rejects.toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
    });

    it('rejects update when the is_occupied parameter is not a boolean', async () => {
      // Act & Assert
      await expect(tableService.changeTableOccupancy(2, "yes"))
        .rejects.toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
    });

    it('throws an error if the repository cannot find the table to update', async () => {
      // Arrange
      tableRepository.updateTableStatus.mockResolvedValue(null); // DB returned no row

      // Act
      const result = await tableService.changeTableOccupancy(999, true);

      // Assert
      expect(result).toBeNull();
    });

    it('throws an error when the database connection fails during update', async () => {
      // Arrange
      tableRepository.updateTableStatus.mockRejectedValue(new Error('Connection timeout'));

      // Act & Assert
      await expect(tableService.changeTableOccupancy(2, true))
        .rejects.toThrow('Connection timeout');
    });
  });
});