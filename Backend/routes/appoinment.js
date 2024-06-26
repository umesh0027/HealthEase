const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/Appoinment');
const { auth, isDoctor } = require("../middleware/auth");
// Fetch all appointments

router.get('/doctor-appointments', auth, appointmentController.getDoctorAppointments);
router.get('/patient-appointments', auth, appointmentController.getPatientAppointments);
router.put('/update-status', appointmentController.updateAppointmentStatus);
router.delete('/appointments/:id', appointmentController.deleteAppointment);
router.post('/doctors/available', appointmentController.getAvailableDoctors);
router.delete('/appointments/:appointmentId', appointmentController.deletePatientAppointment);
// Route to fetch available time slots for a doctor
router.post('/doctors/available-slots', appointmentController.getAvailableTimeSlots);

// Route to book an appointment
router.post('/appointments/book',auth, appointmentController.bookAppointment);
module.exports = router;
