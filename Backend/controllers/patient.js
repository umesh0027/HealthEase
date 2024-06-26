

const Patient = require("../models/patient");
const User = require("../models/User");
const Profile = require("../models/Profile")


exports.updatePatient = async (req, res) => {
    try {
      const { diseases, medicalHistory } = req.body;
  
      // Check if required fields are provided
      if (!diseases) {
        return res.status(400).json({ success: false, message: "Please provide diseases" });
      }
  
      // Retrieve user ID from the authenticated request
      const userId = req.user.id;
  
      // Check if the user is a patient
      const user = await User.findById(userId);
      if (!user || user.accountType !== 'Patient') {
        return res.status(403).json({ success: false, message: "Only patients can update their profiles" });
      }

      // Update patient's profile
      let patientProfile = await Patient.findOne({ user: userId });
  
      if (!patientProfile) {
        // If the patient profile doesn't exist, create a new one
        patientProfile = new Patient({
          user: userId,
          // profile: Profile._id,
          diseases,
          medicalHistory
        });
      } else {
        // If the patient profile exists, update it
        patientProfile.diseases = diseases;
        patientProfile.medicalHistory = medicalHistory;
      }
  
      await patientProfile.save();
  
      return res.status(200).json({ success: true, message: "Patient profile updated successfully" });
    } catch (error) {
      console.error("Error updating patient profile:", error);
      return res.status(500).json({ success: false, error: "An error occurred while updating the patient profile" });
    }
  };


  exports.fetchPatients = async (req, res) => {
    try {
      // Fetch all patients from the database
      const patients = await Patient.find();
      res.status(200).json({ success: true, patients });
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };