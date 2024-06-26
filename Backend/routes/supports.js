const express = require('express');
const router = express.Router();
const supportController = require('../controllers/Supports');

// Get support information
router.get('/', supportController.getSupportInfo);

// Create support information
router.post('/', supportController.createSupportInfo);

// Update support information
router.patch('/:id', supportController.updateSupportInfo);

// Delete support information
router.delete('/:id', supportController.deleteSupportInfo);

module.exports = router;
