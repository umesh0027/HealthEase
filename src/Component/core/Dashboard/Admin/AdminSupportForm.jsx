


import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";

const AdminSupportForm = ({ supportInfo, onSubmit }) => {
    const [hospitalNumber, setHospitalNumber] = useState(supportInfo ? supportInfo.hospitalNumber : '');
    const [emergencyNumber, setEmergencyNumber] = useState(supportInfo ? supportInfo.emergencyNumber : '');
    const [email, setEmail] = useState(supportInfo ? supportInfo.email : '');

    const baseURL = process.env.REACT_APP_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { hospitalNumber, emergencyNumber, email };
        onSubmit(data);
        toast.success('Support updated successfully');
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${baseURL}/support/${supportInfo._id}`);
            window.location.reload(); // Refresh page to reflect changes
            toast.success('Support deleted successfully');
        } catch (error) {
            console.log(error);
            toast.error('Error deleting support');
        }
    };

    return (
        <div className="mt-8 mx-auto w-10/12 flex flex-col bg-blue-250 rounded-xl mb-10">
            <h2 className="text-2xl text-richblack-900 text-center  p-8">{supportInfo ? 'Update Support Information' : 'Create Support Information'}</h2>

           <div className='mx-auto mb-10 bg-blue-250 rounded-xl p-8 md:mx-10 lg:mx-auto bg-white w-9/12'>
           <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col space-y-2">
                    <label className="text-richblack-800" htmlFor="hospitalNumber">Hospital Contact Numbers:</label>
                    <input 
                        type="text" 
                        id="hospitalNumber" 
                        value={hospitalNumber} 
                        onChange={(e) => setHospitalNumber(e.target.value)} 
                        className="form-style p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-richblack-800" htmlFor="emergencyNumber">Emergency Ward Contact Numbers:</label>
                    <input 
                        type="text" 
                        id="emergencyNumber" 
                        value={emergencyNumber} 
                        onChange={(e) => setEmergencyNumber(e.target.value)} 
                        className="form-style p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-richblack-800" htmlFor="email">Email Id:</label>
                    <input 
                        type="text" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="form-style p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                    <button 
                        type="submit" 
                        className="rounded-md bg-blue-500 text-white px-6 py-3 text-center text-[13px] font-bold shadow-md hover:bg-blue-600 transition duration-200"
                    >
                        {supportInfo ? 'Update' : 'Create'}
                    </button>
                    {supportInfo && (
                        <button 
                            type="button" 
                            onClick={handleDelete} 
                            className="rounded-md bg-pink-500 text-white px-6 py-3 text-center text-[13px] font-bold shadow-md hover:bg-pink-600 transition duration-200"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </form>
           </div>
        </div>
    );
};

export default AdminSupportForm;
