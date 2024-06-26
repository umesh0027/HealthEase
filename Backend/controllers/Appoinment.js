const Appointment = require("../models/Appoinment");
const User = require("../models/User");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const mailSender = require('../utils/mailSender');

// Controller to fetch available doctors based on patient's disease
const generateAvailableSlots = (workingHours) => {
  
  // Example: Working hours for a doctor (9 AM to 5 PM)
  const startHour = 9;
  const endHour = 17;

  // Initialize an array to hold available slots
  const availableSlots = [];

  // Loop through each hour slot within working hours
  for (let hour = startHour; hour < endHour; hour++) {
    // Generate time in 12-hour format (AM/PM)
    const formattedHour = hour % 12 || 12;
    const timeSlot = `${formattedHour}:00 ${hour < 12 ? 'AM' : 'PM'}`;

    // Add the time slot to the available slots array
    availableSlots.push(timeSlot);
  }

  return availableSlots;
};

exports.getAvailableDoctors = async (req, res) => {
  try {
      const { disease } = req.body;
      // Find doctors based on the specialization or any other criteria related to patient's disease
      const doctors = await Doctor.find({ specialization: { $regex: new RegExp(disease, "i") } }).populate('user');
      return res.status(200).json({ success: true, doctors });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Controller to fetch available time slots for a doctor
exports.getAvailableTimeSlots = async (req, res) => {
  try {
      const { doctorId, date } = req.body;
      // Fetch doctor's appointments for the given date
      const appointments = await Appointment.find({ doctor: doctorId, AppointmentDate: date });
      // Fetch doctor's working hours or any other criteria to determine available time slots
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
          return res.status(404).json({ success: false, message: 'Doctor not found' });
      }
      // Implement logic to generate available time slots based on doctor's working hours and booked appointments
      // For demonstration, let's assume we have a function generateAvailableSlots()
      const availableSlots = generateAvailableSlots(doctor.workingHours, appointments);
      res.status(200).json({ success: true, slots: availableSlots });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Controller to book an appointment
exports.bookAppointment = async (req, res) => {
  try {
    const {doctorId, date, time, description } = req.body;
    const patient = await Patient.findOne({ user: req.user.id });

if (!patient) {
    return res.status(404).json({ success: false, message: 'Patient not found' });
}

const patientId = patient._id;
    if ( !doctorId || !date || !time || !description) {
      return res.status(400).json({ success: false, message: 'All fields are required for booking the appointment' });
    }

      // Check if the selected time slot is available
      const existingAppointment = await Appointment.findOne({ doctor: doctorId, AppointmentDate: date, AppointmentTime: time });
      if (existingAppointment) {
          return res.status(400).json({ success: false, message: 'Selected time slot is not available' });
      }
      // Create a new appointment
      const newAppointment = new Appointment({
          patient: patientId,
          doctor: doctorId,
          AppointmentDate: date,
          AppointmentTime: time,
          description,
          paymentStatus: 'Pending',
          status: 'Pending' // Set appointment status to 'Pending'
          
      });
      await newAppointment.save();

      // Send confirmation email to the patient
      const patients = await Patient.findById(patientId).populate('user'); 
    const selectedDoctor = await Doctor.findById(doctorId).populate('user');
    const patientEmailTitle = 'Appointment Confirmation';
    const patientEmailBody = `Your appointment has been successfully booked with ${selectedDoctor.user.firstName} ${selectedDoctor.user.lastName} on ${date} at ${time}.`;
    await mailSender(patients.user.email, patientEmailTitle, patientEmailBody);

    
    await newAppointment.save();

    // Notify the doctor about the confirmed appointment
    const doctorEmail = selectedDoctor.user.email;
    const doctorEmailTitle = 'Appointment Confirmed';
    const doctorEmailBody = `Your appointment with patient ${patients.user.firstName} ${patients.user.lastName} on ${date} at ${time} has been confirmed.`;
    await mailSender(doctorEmail, doctorEmailTitle, doctorEmailBody);

        // Log appointment details
    console.log(`Appointment booked for Doctor ID: ${doctorId}, Patient ID: ${patientId}`);
    console.log('Appointment Details:', newAppointment);
      
        
          console.log(`Appointment booked for ${selectedDoctor.user.firstName} ${selectedDoctor.user.lastName}`);
          console.log('Appointment Details:', newAppointment);
     
     
   res.status(201).json({ success: true, message: 'Appointment booked successfully', appointmentId: newAppointment._id });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


exports.getDoctorAppointments = async (req, res) => {
  try {

    
     // Find the doctor document based on the user ID stored in req.user.id
     const doctor = await Doctor.findOne({ user: req.user.id });

     if (!doctor) {
       return res.status(404).json({ success: false, message: 'Doctor not found' });
     }
    console.log('Doctor ID:', doctor._id);
      // Fetch appointments for the selected doctor only
      const appointments = await Appointment.find({ doctor: doctor._id  })
          .populate({
              path: 'patient',
              populate: {
                path: 'user',
                select: 'firstName lastName '
              },
             
          // Select patient fields to display
          })
          .populate('doctor');
          
          if (!appointments || appointments.length === 0) {
            return res.status(404).json({ success: false, message: 'No appointments found for the doctor' });
          }
        console.log('Populated Appointments:', appointments); 

      res.status(200).json({ success: true, appointments });
  } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


exports.getPatientAppointments = async (req, res) => {
  try {

    const patient = await Patient.findOne({ user: req.user.id });
    
if (!patient) {
  return res.status(404).json({ success: false, message: 'Patient not found' });
}

const patientId = patient._id;
    
    const appointments = await Appointment.find({ patient: patientId })
    .populate({
      path: 'doctor',
      populate: {
        path: 'user', // Populate the user field of the doctor model
        select: 'firstName lastName' // Select only the first name and last name
      }
    }) // Populate the doctor's details
      .sort({ createdAt: -1 }); // Sort appointments by creation date in descending order

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
      const { appointmentId, status ,paymentStatus} = req.body;
      const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status ,paymentStatus}, { new: true });

      if (!appointment) {
          return res.status(404).json({ success: false, message: 'Appointment not found' });
      }
    
 
    // Retrieve the patient's email from the patient model
    const patientId = appointment.patient;
    const patient = await Patient.findById(patientId).populate('user'); // Populate the user field to get the email
    const patientEmail = patient.user.email;

    // Send a notification to the patient about the status change
    const emailTitle = 'Appointment Status Update';
    const emailBody = `Your appointment status has been : ${status}`;
   
    if (patientEmail) {
      await mailSender(patientEmail, emailTitle, emailBody, paymentLink);
    }
      res.status(200).json({ success: true, appointment });
  } catch (error) {
      console.error('Error updating appointment status:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


exports.deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    // Find the appointment by ID
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Remove the appointment from the database
    await Appointment.findByIdAndDelete(appointmentId);

    res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Controller to delete a patient's appointment by a doctor
exports.deletePatientAppointment = async (req, res) => {
  try {
    // Extract appointment ID from request parameters
    const appointmentId = req.params.appointmentId;

    // Check if the appointment exists
    const appointment = await Appointment.findById(appointmentId);

    // If appointment does not exist, return error response
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Check if the logged-in user is a doctor and the appointment belongs to them
    const doctorId = req.user.id;
    if (appointment.doctor.toString() !== doctorId) {
      // If the appointment does not belong to the logged-in doctor, return unauthorized response
      return res.status(403).json({ success: false, message: 'You are not authorized to delete this appointment' });
    }

    // Delete the appointment
    await Appointment.findByIdAndDelete(appointmentId);

    // Return success response
    res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    // If an error occurs, return internal server error response
    console.error('Error deleting appointment:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
