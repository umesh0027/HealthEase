


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import DashboardHeader from '../DashboardHeader';
import { formattedDate } from '../../../../utils/dateFormatter';
import NavBarImg from "../../../../assests/WeCare-main/WeCare Img/Health EaseLogo.png";

const Modal = ({ isOpen, onClose, description }) => {
  if (!isOpen) return null;

  return (
   
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50  ">
    <div className="bg-white rounded-lg p-8 w-full items-center justify-center mx-60 my-20  ">
    <div className="flex justify-between items-center mb-4 overflow-y-visible">
      <h2 className="text-xl font-bold mb-4">Full Description</h2>
      <button onClick={onClose}  className="text-gray-500 hover:text-gray-800 ml-10">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        </div>
      <p className='mb-4 text-[12px] w-full text-gray-800 leading-relaxed overflow-y-visible max-w-full max-h-full'>{description}</p>
     
    </div>
  </div>

  );
};


const PatientAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [paymentStatus, setPaymentStatus] = useState('Pending');

  const apiBaseUrl = process.env.REACT_APP_BASE_URL;
  const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY;
  
  const fetchPatientAppointments = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/appointment/patient-appointments`, { headers: { 'Authorization': `Bearer ${token}` } });
      console.log('Appointments:', response.data.appointments); 
      setAppointments(response.data.appointments);
      
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching patient appointments:', error);
      // setError('Error fetching patient appointments. Please try again later.');
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientAppointments();
  }, []);



  const handleViewMore = (description) => {
    setSelectedDescription(description);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`${apiBaseUrl}/appointment/appointments/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Remove the deleted appointment from the state
      setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment._id !== appointmentId));
      toast.success('Appointment deleted successfully');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error('Failed to delete appointment');
    }
  };

  const handlePayment = async (appointmentId) => {
    try {
      if (!appointmentId) {
        console.error('Appointment ID is required');
        return;
      }
   
  
      // Make an API call to create a payment order
      const response = await axios.post(`${apiBaseUrl}/payments/create-order`, { appointmentId });
  
      // Extract the order details from the response
      const { order } = response.data;
  
      // Initialize Razorpay with order details
      const options = {
        key: razorpayKey, // Replace with your Razorpay key
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'Health Ease',
        description: 'Appointment Fee',
        image: NavBarImg,
        handler: async function (response) {
          try {
            // Capture payment on successful transaction
            const captureResponse = await axios.post(`${apiBaseUrl}/payments/capture-payment`, { appointmentId, razorpay_payment_id: response.razorpay_payment_id });
            if (captureResponse.data.success) {
              // Update appointment status to 'Paid'
              setPaymentStatus('Paid');
              toast.success('Your payment was successful');
            } else {
              toast.error('Your payment failed');
            }
          } catch (error) {
            console.error('Error capturing payment:', error);
            toast.error('Failed to capture payment');
          }
        },
        prefill: {
          name: user ? `${user.firstName} ${user.lastName}` : '',
          email: user ? user.email : '',
          contact: user ? user.additionalDetails.contactNumber : ''
        },
        notes: {
          address: 'Razorpay Corporate Office'
        },
        theme: {
          // color: '#3399cc'
          color: '#000814'
        }
      };
      // const razorpayInstance = new Razorpay(options);
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Failed to process payment');
    }
  };
  
  // Call handlePayment with the appointmentId when handling payment
  const handlePayAppointment = async (appointmentId) => {
    try {
      await handlePayment(appointmentId);
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Failed to process payment');
    }
  };
  

  return (
    <>
    <DashboardHeader/>
      <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center p-4 text-white">My Appointments </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-6">
        {appointments.map(appointment => (
          <div key={appointment._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Doctor: {appointment.doctor ? `${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}` : 'Unknown'}</div>
              <p className="text-gray-700 text-base mb-2">Date: {formattedDate(appointment.AppointmentDate)}</p>
              <p className="text-gray-700 text-base mb-2">Time: {appointment.AppointmentTime}</p>
              <div className="text-gray-700 text-base mb-2">
                Description: {`${appointment.description.split(' ').slice(0, 1).join(' ')}${appointment.description.split(' ').length > 1 ? '...' : ''}`}
                {appointment.description.split(' ').length > 1 && (
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleViewMore(appointment.description)}
                  >
                    View More
                  </button>
                )}
              </div>
              {/* <p className="text-gray-700 text-base mb-2">Appointment Status: <span className='text-caribbeangreen-400  text-semibold'>{appointment.status}</span></p> */}

              <p className="text-gray-700 text-base mb-2">Appointment Status: <span className='text-caribbeangreen-400  text-semibold'>{appointment.status}</span></p>
                {!appointment.isPaid && (
                  <button
                    className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 mr-2"
                    onClick={() => handlePayAppointment(appointment._id)}
                  >
                    Pay
                  </button>
                )}
              <button
                className="bg-pink-500 text-white rounded px-4 py-2 hover:bg-pink-600"
                onClick={() => handleDeleteAppointment(appointment._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} description={selectedDescription} />
    </div>
    </>
  );
};

export default PatientAppointment;
