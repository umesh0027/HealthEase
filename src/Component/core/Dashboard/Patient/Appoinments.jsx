
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../../../../slices/authSlice';
import { setPatientId } from '../../../../slices/profileSlice';
import DashboardHeader from '../DashboardHeader';
import { toast } from 'react-hot-toast';
import NavBarImg from "../../../../assests/WeCare-main/WeCare Img/Health EaseLogo.png";

const Appointments = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [disease, setDisease] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [description, setDescription] = useState('');
  const [patientId, setPatientIdLocally] = useState(null);
  const [appointmentId, setAppointmentId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Pending');

  useEffect(() => {
    if (user) {
      setPatientIdLocally(user.patientId);
      dispatch(setPatientId(user.patientId));
    }
  }, [user, dispatch]);

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/appointment/doctors/available`, { disease })
      .then(response => {
        setDoctors(response.data.doctors);
      })
      .catch(error => {
        console.error('Error fetching available doctors:', error);
      });
  }, [disease]);

  const handleDoctorChange = async (event) => {
    setSelectedDoctor(event.target.value);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/appointment/doctors/available-slots`, { doctorId: event.target.value, date });
      setTimeSlots(response.data.slots);
    } catch (error) {
      console.error('Error fetching available time slots:', error);
    }
  };
  
  const handlePayment = async () => {
    try {
      if (!appointmentId) {
        console.error('Appointment ID is required');
        return;
      }
       
      
      // Make an API call to create a payment order
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/payments/create-order`, { appointmentId });
  
      // Extract the order details from the response
      const { order } = response.data;
  
      // Initialize Razorpay with order details
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY, // Replace with your Razorpay key
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'Health Ease',
        description: 'Appointment Fee',
        image: NavBarImg,
        handler: async function (response) {
          try {
            // Capture payment on successful transaction
            const captureResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/payments/capture-payment`, { appointmentId:appointmentId, razorpay_payment_id: response.razorpay_payment_id });
            if (captureResponse.data.success) {
              // Update appointment status to 'Paid'
              setPaymentStatus('Paid');
              toast.success('your Payment successfully');
            } else {
              toast.error('your Payment  failed');
            }
          } catch (error) {
            console.error('Error capturing payment:', error);
            toast.error('Failed to capture payment');
          }
        },
        prefill: {
          name: user ? `${user.firstName} ${user.lastName}` : '',
          email: user ? user.email : '',
          contact:user ? user. additionalDetails.contactNumber : ''
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
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = user ?  user.additionalDetails : null;
      if (!userId) {
        console.error('User ID not found');
        return;
      }
      if (!selectedDoctor || !date || !selectedTime || !description) {
        // Display an error toast if any field is missing
        toast.error('Please fill in all fields');
        return;
      }
      dispatch(setToken(token));
      dispatch(setPatientId(userId));
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/appointment/appointments/book`, {
        patientId: userId,
        doctorId: selectedDoctor,
        date,
        time: selectedTime,
        description,
        paymentStatus,
       
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
       // Update payment status based on the response from the server
       if (response.data.success) {
        const { appointmentId } = response.data;
        setAppointmentId(appointmentId);
        console.log('Appointment booked successfully. Appointment ID:', appointmentId);
        setPaymentStatus('Paid');
        toast.success('Appointment booked successfully');
      } else {
        toast.error('Appointment booking failed');
      }
      // toast.success('Appointment booked successfully');
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Available Time slot is not Available. Please select another time');
    }
  };

  return (
    <>
      <DashboardHeader />
      <div className="mt-10 mx-auto w-11/12  flex flex-col bg-blue-250 rounded-md">
        <div className=" lg:w-6/12 mt-8 p-6 bg-white rounded-xl shadow-md mb-10 mx-auto md:w-10/12 md:mx-auto ">
          <h2 className="text-2xl font-bold mb-4 text-center">Book Appointment</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="disease">Disease:</label>
              {/* <input className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" type="text" id="disease" placeholder="ENT , DIABETES , CARDIALOGY ..." value={disease} onChange={(e) => setDisease(e.target.value)} /> */}

              <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" id="doctor" value={selectedDoctor} onChange={handleDoctorChange}>
                <option value="">Select Disease</option>
                {doctors.map(doctor => (
                  <option key={doctor._id} value={doctor._id}>{doctor?.specialization} </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="doctor">Doctor:</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" id="doctor" value={selectedDoctor} onChange={handleDoctorChange}>
                <option value="">Select Doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor._id} value={doctor._id}>{doctor.user.firstName} {doctor.user.lastName}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="date">Date:</label>
              <input className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="time">Time:</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" id="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                <option value="">Select Time</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="description">Description:</label>
              <textarea className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button className="mx-auto bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600" type="submit">Book Appointment</button>
           
          </form>
          
          <button className= " mx-auto bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 mt-4" onClick={handlePayment}>
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Appointments;


