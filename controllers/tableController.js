const tableService = require('../services/tableService');

const getTables = async (req, res) => {
  try {
    const data = await tableService.fetchAllTables();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { is_occupied } = req.body;
    const updatedTable = await tableService.changeTableOccupancy(id, is_occupied);
    res.status(200).json(updatedTable);
  } catch (error) {
    if (error.message.includes('VALIDATION_ERROR')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getTables, updateStatus };