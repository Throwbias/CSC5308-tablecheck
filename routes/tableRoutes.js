const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');
<<<<<<< HEAD
const { authenticate } = require('../middleware/auth'); // Import your middleware

router.get('/', authenticate, tableController.getTables);
router.put('/:id', authenticate, tableController.updateStatus);
=======

// Map endpoints to controller functions
router.get('/', tableController.getAllTables);
router.get('/:id', tableController.getTableById);
router.post('/', tableController.createTable);
router.patch('/:id', tableController.updateTableStatus);
router.delete('/:id', tableController.deleteTable);
>>>>>>> d449af1a98f726a6185e3e10b1d12218d4ad1321

module.exports = router;