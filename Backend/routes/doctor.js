const express = require("express");
const router = express.Router();
const { auth, isDoctor } = require("../middleware/auth");
const {
  updateDoctorProfile,
  deleteDoctorProfile,
  getDoctorProfile,
  getDoctors,
  getAllDoctors,
  getAvailableSlots,
  getSpecializations,
  getDoctorsBySpecialization
} = require("../controllers/Doctor");

// Update doctor profile route
router.put("/updateProfile", auth, isDoctor ,updateDoctorProfile);

// Delete doctor profile route
router.delete("/deleteProfile", auth, isDoctor, deleteDoctorProfile);

// Get doctor profile route
router.get("/getProfile", auth, isDoctor, getDoctorProfile);

router.get("/getAllDoctors", getAllDoctors);
router.get('/specialization/:specialization', getDoctorsBySpecialization);
router.get('/specializations', getSpecializations);



module.exports = router;

