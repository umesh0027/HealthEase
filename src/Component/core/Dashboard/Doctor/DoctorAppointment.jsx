

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { formattedDate } from "../../../../utils/dateFormatter";
import DashboardHeader from '../DashboardHeader';
import ReportForm from './ReportForm';
import Pagination from '../../../Common/Pagination'; 

const Modal = ({ isOpen, onClose, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 md:mx-auto">
      <div className="bg-white rounded-lg p-8 w-full items-center justify-center mx-60 my-20">
        <div className="flex justify-between items-center mb-4 overflow-y-visible">
          <h2 className="text-xl font-bold mb-4">Full Description</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 ml-10">
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

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/appointment/doctor-appointments`, { headers: { 'Authorization': `Bearer ${token}` } });
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Error fetching doctor appointments:', error);
      }
    };

    fetchAppointments();
  }, [token]);

  const handleViewMore = (description) => {
    setSelectedDescription(description);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateReport = (patientId) => {
    setSelectedPatientId(patientId);
    setShowReportForm(true);
  };

  const handleReportFormClose = () => {
    setShowReportForm(false);
  };

  const handleUpdateReport = async (reportId, updatedDetails) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/report/report/${reportId}`,
        { details: updatedDetails },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      // Handle success response, maybe update UI or show a notification
    } catch (error) {
      console.error('Error updating report:', error);
      // Handle error
    }
  };

  const handleStatusChange = async (appointmentId, newStatus,newPaymentStatus) => {
    try {
      const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/appointment/update-status`,
        { appointmentId, status: newStatus,paymentStatus: newPaymentStatus },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      // Update the appointment status in the state
      const updatedAppointments = appointments.map(appointment =>
        appointment._id === appointmentId ? { ...appointment, status: newStatus ,paymentStatus: newPaymentStatus} : appointment
      );
      setAppointments(updatedAppointments);
      
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-200';
      case 'Confirmed':
        return 'bg-caribbeangreen-200';
      case 'Cancelled':
        return 'bg-pink-200';
      default:
        return '';
    }
  };
  const getStatusColors = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-200';
      case 'Paid':
        return 'bg-caribbeangreen-200';
      case 'Failed':
        return 'bg-pink-200';
      default:
        return '';
    }
  };

  // Get current appointments
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <DashboardHeader />
      <h2 className="text-2xl font-bold mb-4 text-center p-4 text-white">Doctor Appointments</h2>
      <div className="  overflow-x-auto">
        {/* <h2 className="text-2xl font-bold mb-4 text-center p-4 text-white">Doctor Appointments</h2> */}
        <div className="">
          <table className=" w-12/12  bg-blue-250 rounded-xl border-2  mx-10">
            {/* Table header */}
            <thead>
              <tr>
                <th className="border-b-2 border-gray-400 px-4 py-2 ">Patient</th>
                <th className="border-b-2 border-gray-400 px-4 py-2">PatientID</th>
                <th className="border-b-2 border-gray-400 px-4 py-2">Description</th>
                <th className="border-b-2 border-gray-400 px-4 py-2">Date</th>
                <th className="border-b-2 border-gray-400 px-4 py-2">Time</th>
                <th className="border-b-2 border-gray-400 px-4 py-2">Status</th>
                <th className="border-b-2 border-gray-400 px-4 py-2">Actions</th>
                <th className="border-b-2 border-gray-400 px-4 py-2">Reports</th>
                <th className="border-b-2 border-gray-400 px-4 py-2">Payment Status</th>
                <th className="border-b-2 border-gray-400 px-4 py-2">Payment Action</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className='mx-10'>
              {currentAppointments.map(appointment => (
                <tr key={appointment._id}>
                  {/* Patient */}
                  <td className="border-b text-center border-gray-300 px-4 py-2">
                    {appointment.patient && appointment.patient.user ? `${appointment.patient.user.firstName} ${appointment.patient.user.lastName}` : 'Unknown'}
                  </td>
                  {/* Patient ID */}
                  <td className="border-b text-center border-gray-300 px-4 py-2">
                    {appointment.patient ? appointment.patient._id : 'Unknown'}
                  </td>
                  {/* Description */}
                  <td className="border-b text-center border-gray-300 px-4 py-2">
                    {`${appointment.description.split(' ').slice(0, 2).join(' ')}${appointment.description.split(' ').length > 2 ? '...' : ''}`}
                    {appointment.description.split(' ').length > 2 && (
                      <button className="text-blue-500 hover:underline" onClick={() => handleViewMore(appointment.description)}>
                        View More
                      </button>
                    )}
                  </td>
                  {/* Date */}
                  <td className="border-b text-center border-gray-300 px-4 py-2">{formattedDate(appointment.AppointmentDate)}</td>
                  {/* Time */}
                  <td className="border-b text-center border-gray-300 px-4 py-2 p-4">{appointment.AppointmentTime}</td>
                  {/* Status */}
                  <td className='border-b'>
                    <button className={`text-center border-gray-300 px-4 py-2 mt-1 mb-1 rounded-md ${getStatusColor(appointment.status)}`}>{appointment.status}</button>
                  </td>
                  {/* Status Change */}
                  <td className="border-b text-center border-gray-300 px-4 py-2">
                    <select className="px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 text-center text-richblack-800" onChange={(e) => handleStatusChange(appointment._id, e.target.value)}>
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  {/* Create Report */}
                  <td className="border-b text-center border-gray-300 px-4 py-2">
                    <button onClick={() => handleCreateReport(appointment.patient._id)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Create Report</button>
                  </td>
                  {/* Update Report */}
                  {/* <td className="border-b text-center border-gray-300 px-4 py-2">
                    {appointment.report ? (
                      <button onClick={() => handleUpdateReport(appointment.report._id, 'Updated details')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Update Report</button>
                    ) : (
                      <button disabled className="bg-pure-greys-300 text-white font-bold py-2 px-4 rounded cursor-not-allowed">Update Report</button>
                    )}
                  </td> */}

      <td className='border-b'>
                    <button className={`text-center border-gray-300 px-4 py-2 mt-1 mb-1 rounded-md ${getStatusColors(appointment.paymentStatus)}`}>{appointment.paymentStatus}</button>
                  </td>
      <td className="border-b text-center border-gray-300 px-4 py-2">
        {/* Dropdown for updating payment status */}
        <select
          className="px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 text-center text-richblack-800"
          onChange={(e) => handleStatusChange(appointment._id, appointment.status, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Failed">Failed</option>
        </select>
      </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
      
        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} description={selectedDescription} />
        {/* Report Form */}
        {showReportForm && <ReportForm onClose={handleReportFormClose} patientId={selectedPatientId} />}
      </div>
      <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={appointments.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
    </>
  );
};

export default DoctorDashboard;



// this code for a doctor can delete appointment 

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { formattedDate } from "../../../../utils/dateFormatter";
// import DashboardHeader from '../DashboardHeader';
// import ReportForm from './ReportForm';
// import Pagination from '../../../Common/Pagination'; 
// import toast from 'react-hot-toast';


// const Modal = ({ isOpen, onClose, description }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50  ">
//       <div className="bg-white rounded-lg p-8 w-full items-center justify-center mx-60 my-20  ">
//         <div className="flex justify-between items-center mb-4 overflow-y-visible">
//           <h2 className="text-xl font-bold mb-4">Full Description</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-800 ml-10">
//             <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//             </svg>
//           </button>
//         </div>
//         <p className='mb-4 text-[12px] w-full text-gray-800 leading-relaxed overflow-y-visible max-w-full max-h-full'>{description}</p>
//       </div>
//     </div>
//   );
// };

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const { token } = useSelector((state) => state.auth);
//   const [selectedDescription, setSelectedDescription] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPatientId, setSelectedPatientId] = useState(null);
//   const [showReportForm, setShowReportForm] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);


//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/v1/appointment/doctor-appointments', { headers: { 'Authorization': `Bearer ${token}` } });
//         setAppointments(response.data.appointments);
//       } catch (error) {
//         console.error('Error fetching doctor appointments:', error);
//       }
//     };

//     fetchAppointments();
//   }, [token]);

//   const handleViewMore = (description) => {
//     setSelectedDescription(description);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleCreateReport = (patientId) => {
//     setSelectedPatientId(patientId);
//     setShowReportForm(true);
//   };

//   const handleReportFormClose = () => {
//     setShowReportForm(false);
//   };

//   const handleStatusChange = async (appointmentId, newStatus) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:4000/api/v1/appointment/update-status`,
//         { appointmentId, status: newStatus },
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       // Update the appointment status in the state
//       const updatedAppointments = appointments.map(appointment =>
//         appointment._id === appointmentId ? { ...appointment, status: newStatus } : appointment
//       );
//       setAppointments(updatedAppointments);
//     } catch (error) {
//       console.error('Error updating appointment status:', error);
//     }
//   };

//   const handleDeleteAppointment = async (appointmentId) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:4000/api/v1/appointment/appointments/${appointmentId}`,
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       // Filter out the deleted appointment from the state
//       const updatedAppointments = appointments.filter(appointment =>
//         appointment._id !== appointmentId
//       );
//       setAppointments(updatedAppointments);
//       toast.success("Appointment delete succeefully")
//     } catch (error) {
//       console.error('Error deleting appointment:', error);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Pending':
//         return 'bg-yellow-200';
//       case 'Confirmed':
//         return 'bg-caribbeangreen-200';
//       case 'Cancelled':
//         return 'bg-pink-200';
//       default:
//         return '';
//     }
//   };

//   // Get current appointments
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentAppointments = appointments.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <>
//       <DashboardHeader />
//       <div className="flex flex-col justify-center items-center mx-auto w-10/12">
//         <h2 className="text-2xl font-bold mb-4 text-center p-4">Doctor Appointments</h2>
//         <div className="flex justify-center items-center">
//           <table className="bg-white border mb-10 w-12/12 max-w-[1000px] ">
//             {/* Table header */}
//             <thead>
//               <tr>
//                 <th className="border-b-2 border-gray-400 px-4 py-2">Patient</th>
//                 <th className="border-b-2 border-gray-400 px-4 py-2">PatientID</th>
//                 <th className="border-b-2 border-gray-400 px-4 py-2">Description</th>
//                 <th className="border-b-2 border-gray-400 px-4 py-2">Date</th>
//                 <th className="border-b-2 border-gray-400 px-4 py-2">Time</th>
//                 <th className="border-b-2 border-gray-400 px-4 py-2">Status</th>
//                 <th className="border-b-2 border-gray-400 px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             {/* Table body */}
//             <tbody className='mx-10'>
//               {currentAppointments.map(appointment => (
//                 <tr key={appointment._id} >
//                   {/* Patient */}
//                   <td className="border-b text-center border-gray-300 px-4 py-2">
//                     {appointment.patient && appointment.patient.user ? `${appointment.patient.user.firstName} ${appointment.patient.user.lastName}` : 'Unknown'}
//                   </td>
//                   {/* Patient ID */}
//                   <td className="border-b text-center border-gray-300 px-4 py-2">
//                     {appointment.patient ? appointment.patient._id : 'Unknown'}
//                   </td>
//                   {/* Description */}
//                   <td className="border-b text-center border-gray-300 px-4 py-2">
//                     {`${appointment.description.split(' ').slice(0, 2).join(' ')}${appointment.description.split(' ').length > 2 ? '...' : ''}`}
//                     {appointment.description.split(' ').length > 2 && (
//                       <button
//                         className="text-blue-500 hover:underline"
//                         onClick={() => handleViewMore(appointment.description)}
//                       >
//                         View More
//                       </button>
//                     )}
//                   </td>
//                   {/* Date */}
//                   <td className="border-b text-center border-gray-300 px-4 py-2">{formattedDate(appointment.AppointmentDate)}</td>
//                   {/* Time */}
//                   <td className="border-b text-center border-gray-300 px-4 py-2 p-4">{appointment.AppointmentTime}</td>
//                   {/* Status */}
//                   <td className='border-b'>
//                     <button className={`text-center border-gray-300 px-4 py-2 mt-1 mb-1 rounded-md ${getStatusColor(appointment.status)}`}>{appointment.status}</button>
//                   </td>
//                   {/* Status Change */}
//                   <td className="border-b text-center border-gray-300 px-4 py-2 ">
//                     <select className="px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 text-center text-richblack-800 " onChange={(e) => handleStatusChange(appointment._id, e.target.value)}>
//                       <option value="Pending">Pending</option>
//                       <option value="Confirmed">Confirmed</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                   </td>
//                   {/* Delete Appointment */}
//                   <td className="border-b text-center border-gray-300 px-4 py-2 ">
//                     <button onClick={() => handleDeleteAppointment(appointment._id)} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {/* Pagination */}
//         <Pagination
//           itemsPerPage={itemsPerPage}
//           totalItems={appointments.length}
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//         />
//         {/* Modal */}
//         <Modal isOpen={isModalOpen} onClose={handleCloseModal} description={selectedDescription} />
//         {/* Report Form */}
//         {showReportForm && <ReportForm onClose={handleReportFormClose} patientId={selectedPatientId} />}
//       </div>
//     </>
//   );
// };

// export default DoctorDashboard;  
