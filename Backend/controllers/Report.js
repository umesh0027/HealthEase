
const Report = require('../models/Report');
const Doctor = require('../models/doctor');
const User = require("../models/User")
const Patient = require("../models/patient");
exports.createReport = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User is not authenticated' });
        }

        // Get the authenticated user's ID
        const userId = req.user.id;

        // Find the user by ID to get the associated doctor ID
        const user = await User.findById(userId);

        // Check if the user is a doctor
        if (!user || user.accountType !== 'Doctor') {
            return res.status(403).json({ success: false, message: 'User is not authorized to create a report' });
        }
 
     // Find the doctor document based on the user ID stored in req.user.id
     const doctor = await Doctor.findOne({ user: req.user.id });

     if (!doctor) {
       return res.status(404).json({ success: false, message: 'Doctor not found' });
     }
    console.log('Doctor ID:', doctor._id);
        // Get the doctor ID from the user
       
        console.log("doctorId:", doctor._id)

        // Create a new report with the patient, doctor, and details
        const { patient, details } = req.body;
        const newReport = new Report({ patient, doctor: doctor._id, details,appointmentId });
        console.log("newreport" ,newReport)
        await newReport.save();

        // Return success response
        res.status(201).json({ success: true, message: 'Report created successfully', report: newReport });
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};



exports.getPatientReports = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User is not authenticated' });
        }

        const userId = req.user.id;
        const patient = await Patient.findOne({ user: userId });

        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        const patientId = patient._id;
        const reports = await Report.find({ patient: patientId })
        .populate({
            path: 'doctor',
            populate: {
              path: 'user', // Populate the user field of the doctor model
              select: 'firstName lastName email' // Select only the first name and last name
            }
          })
          .populate('patient', 'user'); // Populate patient details
        if (!reports) {
            return res.status(404).json({ success: false, message: 'No reports found for this patient' });
        }

        res.status(200).json({ success: true, reports });
    } catch (error) {
        console.error('Error fetching patient reports:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


// Define the updateReport controller function
exports.updateReport = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User is not authenticated' });
        }

        // Get the authenticated user's ID
        const userId = req.user.id;

        // Find the user by ID to get the associated doctor ID
        const user = await User.findById(userId);

        // Check if the user is a doctor
        if (!user || user.accountType !== 'Doctor') {
            return res.status(403).json({ success: false, message: 'User is not authorized to update a report' });
        }

        // Get the doctor ID from the user
        const doctorId = user._id;

        // Extract report details from request body
        const { reportId, details } = req.body;

        // Find the report by ID
        const report = await Report.findById(reportId);

        // Check if the report exists and if the doctor is authorized to update it
        if (!report || report.doctor.toString() !== doctorId.toString()) {
            return res.status(404).json({ success: false, message: 'Report not found or you are not authorized to update it' });
        }

        // Update the report details
        report.details = details;
        await report.save();

        // Return success response
        res.status(200).json({ success: true, message: 'Report updated successfully', report });
    } catch (error) {
        console.error('Error updating report:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};




// Controller function to handle report download
exports.downloadReport = async (req, res) => {
    try {
      const report = await Report.findById(req.params.reportId);
  
      if (!report) {
        return res.status(404).json({ success: false, message: 'Report not found' });
      }
  
      // Here you would typically fetch the report data from your database or file storage
      // For demonstration purposes, let's assume the report data is stored as a string
      const reportData = `Patient: ${report.patient}\nDoctor: ${report.doctor}\nDetails: ${report.details}\nDate: ${report.date}`;
  
      // Set the response headers for file download
      res.setHeader('Content-disposition', 'attachment; filename=report.txt');
      res.setHeader('Content-type', 'text/plain');
  
      // Send the report data as the response
      res.send(reportData);
    } catch (error) {
      console.error('Error downloading report:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };