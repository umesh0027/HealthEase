

import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
const ReportForm = ({ patientId, onClose }) => {
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const { token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to create a new report
      const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/report/create`,
        { patient: patientId, details },
        { headers: { 'Authorization': `Bearer ${token}` } } // Include authentication token
      );
      console.log('Report created successfully:', response.data.report);
      toast.success('Report created successfully');
      // Close the form
      onClose();
    } catch (error) {
      console.error('Error creating report:', error);
      // setError('An error occurred while creating the report. Please try again.');
      toast.error('An error occurred while creating the report. Please try again.');
      
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none mx-4">
      <form onSubmit={handleSubmit} className="bg-white border-2 rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Create Report</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="details" className="block text-sm font-medium text-gray-700">Report Details</label>
          <textarea id="details" name="details" rows="4" value={details} onChange={(e) => setDetails(e.target.value)} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500" required></textarea>
        </div>
        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="mr-2 bg-pure-greys-300 hover:bg-pure-greys-400 text-gray-800 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Cancel</button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
