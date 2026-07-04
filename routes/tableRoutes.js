const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

// Map endpoints to controller functions
router.get('/', tableController.getAllTables);
router.get('/:id', tableController.getTableById);
router.post('/', tableController.createTable);
router.patch('/:id', tableController.updateTableStatus);
router.delete('/:id', tableController.deleteTable);

module.exports = router;