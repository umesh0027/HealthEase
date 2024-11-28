
const Report = require('../models/Report');
const Doctor = require('../models/doctor');
const User = require("../models/User")
const Patient = require("../models/patient");
const PDFDocument = require('pdfkit');
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
        const newReport = new Report({ patient, doctor: doctor._id, details });
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
// exports.downloadReport = async (req, res) => {
//     try {
//       const report = await Report.findById(req.params.reportId);
  
//       if (!report) {
//         return res.status(404).json({ success: false, message: 'Report not found' });
//       }
  
//       // Here you would typically fetch the report data from your database or file storage
//       // For demonstration purposes, let's assume the report data is stored as a string
//       const reportData = `Patient: ${report.patient}\nDoctor: ${report.doctor}\nDetails: ${report.details}\nDate: ${report.date}`;
  
//       // Set the response headers for file download
//       res.setHeader('Content-disposition', 'attachment; filename=report.txt');
//       res.setHeader('Content-type', 'text/plain');
  
//       // Send the report data as the response
//       res.send(reportData);
//     } catch (error) {
//       console.error('Error downloading report:', error);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
//   };

// exports.downloadReport = async (req, res) => {
//     try {
//       const report = await Report.findById(req.params.reportId);
  
//       if (!report) {
//         return res.status(404).json({ success: false, message: 'Report not found' });
//       }
  
//       // Create a new PDF document
//       const doc = new PDFDocument();
  
//       // Set the response headers for file download
//       res.setHeader('Content-disposition', 'attachment; filename=report.pdf');
//       res.setHeader('Content-type', 'application/pdf');
  
//       // Pipe the PDF to the response
//       doc.pipe(res);
  
//       // Add content to the PDF
//       doc
//         .fontSize(20)
//         .text('Health Ease Report', { align: 'center' })
//         .moveDown();
  
//       doc
//         .fontSize(14)
//         .text(`Patient: ${report.patient}`, { lineGap: 10 })
//         .text(`Doctor: ${report.doctor}`, { lineGap: 10 })
//         .text(`Details: ${report.details}`, { lineGap: 10 })
//         .text(`Date: ${new Date(report.date).toLocaleDateString()}`, { lineGap: 10 });
  
//       // Finalize the PDF and end the stream
//       doc.end();
//     } catch (error) {
//       console.error('Error downloading report:', error);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
//   };

exports.downloadReport = async (req, res) => {
  try {
    // Fetch the report and populate patient and doctor details
    const report = await Report.findById(req.params.reportId)
      .populate({
        path: "patient",
        populate: {
          path: "user",
          model: "User",
          populate: {
            path: "additionalDetails",
            model: "Profile",
          },
        },
      })
      .populate("doctor");

    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    // Extract necessary information from the populated data
    const { patient, doctor, details, date } = report;

    // Patient Information
    const patientUser = patient?.user;
    const doctorUser = patient?.user;
    const patientProfile = patientUser?.additionalDetails;

    const patientName = `${patientUser?.firstName || "N/A"} ${patientUser?.lastName || "N/A"}`;
    const patientAge = patientProfile?.Age || "N/A";
    const patientGender = patientProfile?.gender || "N/A";
    const patientContact = patientProfile?.contactNumber || "N/A";
    const patientBloodGroup = patientProfile?.BloodGroup || "N/A";

    // Doctor Information
    const doctorName = doctor ? `${doctorUser.firstName || "N/A"} ${doctorUser.lastName || "N/A"}` : "N/A";
    const doctorSpecialization = doctor?.specialization || "N/A";

    // Update this path to the actual logo file

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set the response headers for file download
    res.setHeader("Content-disposition", "attachment; filename=report.pdf");
    res.setHeader("Content-type", "application/pdf");

    // Pipe the PDF to the response
    doc.pipe(res);

   

    // Add content to the PDF
    doc
      .fontSize(20)
      .text("Health Ease Report", { align: "center" })
      .moveDown();

    // Patient Details
    doc
      .fontSize(14)
      .text("Patient Details:", { underline: true })
      .moveDown()
      .fontSize(12)
      .text(`Name: ${patientName}`)
      .text(`Age: ${patientAge}`)
      .text(`Gender: ${patientGender}`)
      .text(`Contact: ${patientContact}`)
      .text(`Blood Group: ${patientBloodGroup}`)
      .moveDown();

    // Doctor Details
    doc
      .fontSize(14)
      .text("Doctor Details:", { underline: true })
      .moveDown()
      .fontSize(12)
      .text(`Name: ${doctorName}`)
      .text(`Specialization: ${doctorSpecialization}`)
      .moveDown();

    // Report Details
    doc
      .fontSize(14)
      .text("Report Details:", { underline: true })
      .moveDown()
      .fontSize(12)
      .text(`Date: ${new Date(date).toLocaleDateString()}`)
      .text(`Details: ${details || "N/A"}`)
      .moveDown();

    // Finalize the PDF and end the stream
    doc.end();
  } catch (error) {
    console.error("Error downloading report:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
