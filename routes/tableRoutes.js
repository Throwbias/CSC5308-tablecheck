const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');
const { authenticate } = require('../middleware/auth'); // Import authentication middleware

router.get('/', authenticate, tableController.getAllTables);
router.get('/:id', authenticate, tableController.getTableById);
router.post('/', authenticate, tableController.createTable);
router.patch('/:id', authenticate, tableController.updateTableStatus);
router.delete('/:id', authenticate, tableController.deleteTable);

module.exports = router;