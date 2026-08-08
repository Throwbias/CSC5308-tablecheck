const tableService = require('../../services/tableService');
const tableRepository = require('../../repositories/tableRepository');

// Mock the repository so we don't need a real database connection for unit tests
jest.mock('../../repositories/tableRepository');

describe('Table Service Layer', () => {
  
  // Clear any mock data before each test runs to prevent overlap
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =========================================================================
  // GROUP 1: fetchAllTables() Business Logic
  // =========================================================================

  test('1. Logic: fetchAllTables should return an array of tables on success', async () => {
    // ARRANGE: Mock the repository to return dummy data
    const mockTables = [{ id: 1, table_number: 1, is_occupied: false }];
    tableRepository.getAllTables.mockResolvedValue(mockTables);

    // ACT
    const result = await tableService.fetchAllTables();

    // ASSERT
    expect(result).toEqual(mockTables);
    expect(tableRepository.getAllTables).toHaveBeenCalledTimes(1);
  });

  test('2. Logic: fetchAllTables should handle an empty database safely', async () => {
    // ARRANGE: Mock the repository returning an empty array
    tableRepository.getAllTables.mockResolvedValue([]);

    // ACT
    const result = await tableService.fetchAllTables();

    // ASSERT
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });

  test('3. Logic: fetchAllTables should throw an error if the database connection fails', async () => {
    // ARRANGE: Simulate a database crash
    tableRepository.getAllTables.mockRejectedValue(new Error('DB Connection Lost'));

    // ACT & ASSERT
    await expect(tableService.fetchAllTables()).rejects.toThrow('DB Connection Lost');
  });


  // =========================================================================
  // GROUP 2: changeTableOccupancy() Business Logic (Happy Paths)
  // =========================================================================

  test('4. Logic: changeTableOccupancy successfully marks a table as occupied', async () => {
    // ARRANGE
    const mockUpdatedTable = { id: 5, is_occupied: true };
    tableRepository.updateTableStatus.mockResolvedValue(mockUpdatedTable);

    // ACT
    const result = await tableService.changeTableOccupancy(5, true);

    // ASSERT
    expect(result).toEqual(mockUpdatedTable);
    expect(tableRepository.updateTableStatus).toHaveBeenCalledWith(5, true);
  });

  test('5. Logic: changeTableOccupancy successfully marks a table as available (unoccupied)', async () => {
    // ARRANGE
    const mockUpdatedTable = { id: 2, is_occupied: false };
    tableRepository.updateTableStatus.mockResolvedValue(mockUpdatedTable);

    // ACT
    const result = await tableService.changeTableOccupancy(2, false);

    // ASSERT
    expect(result).toEqual(mockUpdatedTable);
    expect(tableRepository.updateTableStatus).toHaveBeenCalledWith(2, false);
  });

  test('6. Logic: changeTableOccupancy passes database errors up the chain', async () => {
    // ARRANGE
    tableRepository.updateTableStatus.mockRejectedValue(new Error('Deadlock detected'));

    // ACT & ASSERT
    await expect(tableService.changeTableOccupancy(3, true)).rejects.toThrow('Deadlock detected');
  });


  // =========================================================================
  // GROUP 3: changeTableOccupancy() Missing Input Validation
  // =========================================================================

  test('7. Validation: changeTableOccupancy throws error if ID is completely missing', async () => {
    // ACT & ASSERT: Pass only one argument
    await expect(tableService.changeTableOccupancy(undefined, true))
      .rejects
      .toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
  });

  test('8. Validation: changeTableOccupancy throws error if isOccupied is completely missing', async () => {
    // ACT & ASSERT: Pass only the ID
    await expect(tableService.changeTableOccupancy(5))
      .rejects
      .toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
  });


  // =========================================================================
  // GROUP 4: changeTableOccupancy() SECURITY / Injection Tests
  // =========================================================================

  test('9. Security: changeTableOccupancy rejects non-numeric IDs (SQL Injection prevention)', async () => {
    // ARRANGE: Provide a malicious string instead of a valid numeric ID
    const maliciousId = "1; DROP TABLE restaurant_tables;"; 
    const isOccupied = true;

    // ACT & ASSERT
    await expect(tableService.changeTableOccupancy(maliciousId, isOccupied))
      .rejects
      .toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
    
    // Security check: Ensure the database was never actually called
    expect(tableRepository.updateTableStatus).not.toHaveBeenCalled();
  });

  test('10. Security: changeTableOccupancy rejects non-boolean occupancy status', async () => {
    // ARRANGE: Provide a valid ID, but a malicious/invalid status
    const validId = 5;
    const maliciousStatus = "True OR 1=1"; // Not a boolean

    // ACT & ASSERT
    await expect(tableService.changeTableOccupancy(validId, maliciousStatus))
      .rejects
      .toThrow('VALIDATION_ERROR: Invalid table parameters provided.');
      
    // Security check: Ensure the database was never actually called
    expect(tableRepository.updateTableStatus).not.toHaveBeenCalled();
  });

});