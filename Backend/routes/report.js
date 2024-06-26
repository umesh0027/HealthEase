// routes/reports.js

const express = require('express');
const router = express.Router();
const { createReport, getReportsForPatient, updateReport, getPatientReports ,downloadReport} = require('../controllers/Report');
const { auth } = require("../middleware/auth");

// Route to create a report
router.post('/create', auth,createReport);

// Route to get reports for a patient
// router.get('/reports/patient', getReportsForPatient);
router.put('/report/:reportId', auth, updateReport);
router.get('/report/patient', auth, getPatientReports);

router.get('/download/:reportId', downloadReport);
module.exports = router;
