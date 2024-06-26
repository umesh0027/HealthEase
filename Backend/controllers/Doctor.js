const Doctor = require("../models/doctor");
const User =require("../models/User")
const Appointment = require("../models/Appoinment");

exports.updateDoctorProfile = async (req, res) => {
  try {
    const {Fee, specialization, qualifications, experienceYears } = req.body;

    // Check if required fields are provided
    if (!Fee || !specialization || !qualifications || !experienceYears) {
      return res.status(400).json({ success: false, message: "Please provide specialization, qualifications, and experienceYears" });
    }

    // Retrieve user ID from the authenticated request
    const userId = req.user.id;

    // Check if the user is a doctor
    const user = await User.findById(userId);
    if (!user || user.accountType !== 'Doctor') {
      return res.status(403).json({ success: false, message: "Only doctors can update their profiles" });
    }
    // Update doctor's profile
    let doctorProfile = await Doctor.findOne({ user: userId });

    if (!doctorProfile) {
      // If the doctor profile doesn't exist, create a new one
      doctorProfile = new Doctor({
        user: userId,
        specialization,
        qualifications,
        experienceYears,
        Fee
      });
    } else
     {
      // If the doctor profile exists, update it
      doctorProfile.specialization = specialization;
      doctorProfile.qualifications = qualifications;
      doctorProfile.experienceYears = experienceYears;
      doctorProfile.Fee = Fee;
      

    }

    await doctorProfile.save();

    return res.status(200).json({ success: true, message: "Doctor profile updated successfully" });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    return res.status(500).json({ success: false, error: "An error occurred while updating the doctor profile" });
  }
};

// Controller for deleting doctor profile
exports.deleteDoctorProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find and delete doctor's profile by user ID
    await Doctor.findOneAndDelete({ user: userId });

    return res.status(200).json({ success: true, message: "Doctor profile deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Controller for fetching doctor profile
exports.getDoctorProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find doctor's profile by user ID
    const doctor = await Doctor.findOne({ user: userId });

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor profile not found" });
    }

    return res.status(200).json({ success: true, doctor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Controller for fetching list of doctors with user details
exports.getAllDoctors = async (req, res) => {
  try {
    // Fetch all doctors with user details
    const doctors = await Doctor.find().populate({
      path: 'user',
      select: 'firstName lastName image', // Select the user details you need
    });
    return res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Controller for fetching list of doctors filtered by specialization
exports.getDoctorsBySpecialization = async (req, res) => {
  try {
    const { specialization } = req.params;

    // Fetch doctors filtered by specialization with user details
    const doctors = await Doctor.find({ specialization }).populate({
      path: 'user',
      select: 'firstName lastName image', // Select the user details you need
    });

    return res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


exports.getSpecializations = async (req, res) => {
  try {
    const specializations = await Doctor.distinct('specialization');
    res.status(200).json({ success: true, specializations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};