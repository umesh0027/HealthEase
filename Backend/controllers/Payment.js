const Razorpay = require('razorpay');
const Appointment = require('../models/Appoinment');
const Doctor = require('../models/doctor');
const User = require('../models/User');
const Patient = require("../models/patient");
const Bill = require("../models/Bill");
const mailSender = require('../utils/mailSender');
const mongoose = require("mongoose");
// Initialize Razorpay with your API keys
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

// Controller to create a Razorpay order for appointment fee payment
exports.createPaymentOrder = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    if (!appointmentId ) {
      return res.status(400).json({ success: false, message: 'Appointment ID is required' });
    }

// Validate appointmentId
if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
  return res.status(400).json({ success: false, message: 'Invalid appointment ID' });
}

    // Fetch appointment details

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

     // Fetch patient details from the appointment
     const patient = await Patient.findById(appointment.patient);

     if (!patient) {
       return res.status(404).json({ success: false, message: 'Patient not foundddd' });
     }
    
     // Fetch doctor details
     const doctor = await Doctor.findById(appointment.doctor);
 
     if (!doctor) {
       return res.status(404).json({ success: false, message: 'Doctor not found' });
     }
 

    // Create an order on Razorpay
    const orderOptions = {
      amount: doctor.Fee * 100, // Fee is in paisa (multiply by 100)
      currency: 'INR',
      receipt: `appointment_${appointment._id}`,
      notes: {
        appointmentId: appointment._id.toString(), // Store appointment ID in notes
        doctorName: `${doctor.user.firstName} ${doctor.user.lastName}`,
        patientName: `${patient.user.firstName} ${patient.user.lastName}`,
        appointmentDate: appointment.AppointmentDate.toString(),
        appointmentTime: appointment.AppointmentTime,
      }
    };

    const razorpayOrder = await razorpay.orders.create(orderOptions);

    // Return the Razorpay order details to the client
    res.status(200).json({ success: true, order: razorpayOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Controller to capture the payment and update appointment status

exports.capturePayment = async (req, res) => {
  try {
    const { razorpay_payment_id,appointmentId } = req.body; // Remove appointmentId as it's not needed here


    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Fetch doctor details
    const doctor = await Doctor.findById(appointment.doctor);

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    // Fetch patient details from the appointment
    const patient = await Patient.findById(appointment.patient);

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    // Verify the payment with Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (payment.status !== 'captured') {
      return res.status(400).json({ success: false, message: 'Payment not captured' });
    }

    // Update appointment status to 'Confirmed' and paymentStatus to 'Paid'
    appointment.status = 'Confirmed';
    appointment.paymentStatus = 'Paid';
    await appointment.save();
    const patientId = patient._id;
    const patients = await Patient.findById(patientId).populate('user'); 
    const doctorId = doctor._id;
    const doctors = await Doctor.findById(doctorId).populate('user');
    // Send payment success email to the patient
    const emailTitle = 'Appointment Payment Success';
    const emailBody = `Your payment for the appointment with Dr. ${doctors.user.firstName} ${doctors.user.lastName} has been successfully processed.`;
    await mailSender(patients.user.email, emailTitle, emailBody);

    // Return success response
    res.status(200).json({ success: true, message: 'Payment captured successfully', appointment });
  } catch (error) {
    console.error(error);

    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getBill = async (req, res) => {
  try {
    const { billId } = req.params;

    // Validate billId
    if (!mongoose.Types.ObjectId.isValid(billId)) {
      return res.status(400).json({ success: false, message: 'Invalid bill ID' });
    }

    // Find the bill by ID
    const bill = await Bill.findById(billId)
      .populate('appointment')
      .populate({
        path: 'doctor',
        populate: { path: 'user' }
      })
      .populate({
        path: 'patient',
        populate: { path: 'user' }
      });

    if (!bill) {
      return res.status(404).json({ success: false, message: 'Bill not found' });
    }

    // Format the response with relevant details
    const billDetails = {
      billId: bill._id,
      appointmentId: bill.appointment._id,
      doctor: {
        name: `${bill.doctor.user.firstName} ${bill.doctor.user.lastName}`,
        specialization: bill.doctor.specialization,
      },
      patient: {
        name: `${bill.patient.user.firstName} ${bill.patient.user.lastName}`,
        patientId: bill.patient._id
      },
      fee: bill.fee,
      paymentStatus: bill.paymentStatus,
      paymentId: bill.paymentId,
      createdAt: bill.createdAt,
      appointmentDate: bill.appointment.date,
      appointmentTime: bill.appointment.time,
      description: bill.appointment.description
    };

    res.status(200).json({ success: true, bill: billDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
