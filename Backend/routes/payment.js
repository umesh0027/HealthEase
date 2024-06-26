// Import necessary modules
const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");

const{ createPaymentOrder,capturePayment,getBill} = require('../controllers/Payment');

// Define route for making payments

router.post('/create-order', createPaymentOrder);

// Route to capture the payment and update appointment status
router.post('/capture-payment' ,capturePayment);
router.get('/:billId',getBill);

// Export the router
module.exports = router;
