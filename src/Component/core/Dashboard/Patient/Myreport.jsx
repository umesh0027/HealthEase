


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import ReportImg from "../../../../assests/WeCare-main/WeCare Img/Health EaseLogo.png";
import DashboardHeader from '../DashboardHeader';

const PatientDashboard = () => {
  const [currentReportIndex, setCurrentReportIndex] = useState(0); // Add report index state
  const [reports, setReports] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const patientId = user._id;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/report/report/patient`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setReports(response.data.reports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, [token, patientId]);

  
  const handleReportDownload = async (reportId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/report/download/${reportId}`, {
        responseType: 'blob', // Set the response type to blob
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf'); // Set the filename for download
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };


  return (
    <>
      <DashboardHeader />
      <div className="container mx-auto px-40 py-8">
      
        <div className="space-y-10">
          {reports.length > 0 && (
            <div key={reports[currentReportIndex]._id} className="bg-white p-6 shadow rounded-lg">

              <div>
                <img src={ReportImg} alt="Health Ease" className="h-14 mx-auto" />
              </div>
              <div className="flex flex-row">
                <div className="ml-4">
                  <p className="text-lg"><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                  <p className="text-lg"><strong>Email:</strong> {user.email}</p>
                  <p className="text-lg"><strong>Sex:</strong> {user.additionalDetails.gender}</p>
                  <p className="text-lg"><strong>Age:</strong> {user.additionalDetails.Age}</p>
                  <p className="text-lg"><strong>Patient ID:</strong> {patientId}</p>
                </div>
                <div className='mx-auto'>
                  <p className="text-lg"><strong>Date:</strong> {new Date(reports[currentReportIndex].date).toLocaleDateString()}</p>
                  <p className="text-lg"><strong>Doctor:</strong> {reports[currentReportIndex].doctor && reports[currentReportIndex].doctor.user ? `${reports[currentReportIndex].doctor.user.firstName} ${reports[currentReportIndex].doctor.user.lastName}` : 'Unknown'}</p>
                  <p className="text-lg"><strong>Specialization:</strong> {reports[currentReportIndex].doctor ? reports[currentReportIndex].doctor.specialization : 'Unknown'}</p>
                </div>
              </div>
              <p className=" p-6"><strong>Reports:</strong><span className='text-sm'> {reports[currentReportIndex].details}</span></p>
              <button onClick={() => handleReportDownload(reports[currentReportIndex]._id)} className="bg-blue-500 text-white py-2 px-4 rounded-lg">Download Report</button>
            </div>
          )}
          {reports.length === 0 && (
            <p className="text-lg text-center font-semibold">No reports found.</p>
          )}
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          {reports.map((report, index) => (
            <button key={index} onClick={() => setCurrentReportIndex(index)} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${currentReportIndex === index ? 'bg-blue-700' : ''}`}>{index + 1}</button>
          ))}
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;

