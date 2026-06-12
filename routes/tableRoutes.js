const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

// Define the routes
// GET /api/tables
router.get('/', tableController.getTables);

// PATCH /api/tables/:id
router.patch('/:id', tableController.updateStatus);

module.exports = router;