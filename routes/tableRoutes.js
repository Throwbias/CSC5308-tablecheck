const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');
const { authenticate } = require('../middleware/auth'); // Import your middleware

router.get('/', authenticate, tableController.getTables);
router.put('/:id', authenticate, tableController.updateStatus);

module.exports = router;