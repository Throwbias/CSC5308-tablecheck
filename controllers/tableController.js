const tableService = require('../services/tableService');

const getTables = async (req, res) => {
  try {
    const data = await tableService.fetchAllTables();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_occupied } = req.body;
    
    const updatedTable = await tableService.changeTableStatus(id, is_occupied);
    
    if (!updatedTable) {
      return res.status(404).json({ error: "Table not found" });
    }
    
    res.status(200).json(updatedTable);
  } catch (error) {
    console.error("Error updating table:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getTables, updateStatus };