
const express = require('express');
const router = express.Router();
const { auth, isPatient } = require("../middleware/auth");
const {  updatePatient,fetchPatients } = require('../controllers/patient');



// Update an existing patient profile
router.put('/updateprofile', auth, isPatient, updatePatient);


router.get('/patients', fetchPatients);

module.exports = router;
