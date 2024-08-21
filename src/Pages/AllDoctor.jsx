

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors } from '../slices/doctorSlices'; // Import your action creator
import NavBar from '../Component/Common/NavBar';
import Footer from '../Component/Common/Footer';
import { Link } from 'react-router-dom';
const DoctorList = () => {
  const dispatch = useDispatch();
  const { doctors, loading } = useSelector((state) => state.doctors); // Assuming you have a slice called 'doctors' in your Redux store
  const [showAllDoctors, setShowAllDoctors] = useState(false);
  const initialCardCount = 3;
  const { token } = useSelector((state) => state.auth)
  useEffect(() => {
    dispatch(getAllDoctors()); // Fetch all doctors when the component mounts
  }, [dispatch]);

  const toggleShowAllDoctors = () => {
    setShowAllDoctors(!showAllDoctors);
  };

  const visibleDoctors = showAllDoctors ? doctors : doctors.slice(0, initialCardCount);

  return (
   <>
   <NavBar/>
     <div className="h-full container w-full bg-blue-150">
      <h2 className="text-3xl font-semibold mb-8 text-center p-4 text-white">Our Doctors</h2>
      {loading ? (
          <div className="flex justify-center items-center spinner ml-60 "></div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-10 p-4">
            {visibleDoctors.map((doctor) => (
              <div key={doctor._id} className=" p-4 bg-white shadow-md rounded-xl overflow-hidden">
                <img
                  src={doctor.user?.image} // Check if user and image exist before accessing
                  alt={`profile-${doctor.user?.firstName}`}
                  className=" h-[400px] w-full object-cover object-center rounded-xl "
                />
                <p className="text-lg font-semibold text-richblack-800">
                 Dr. {doctor.user?.firstName} {doctor.user?.lastName}
                </p>
                <h3 className="text-lg font-semibold mb-2"> Specialist - {doctor.specialization}</h3>
                <p className="text-sm mb-2">Appointment Fees : {doctor.Fee} Rs.</p>
                <p className="text-sm mb-2">Experience: {doctor.experienceYears} years</p>
                {/* You can add more details here */}
              
              {token !== null ? (<button className='bg-blue-600 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2'><Link className={`flex gap-2 `} to="/dashboard/my-Appoinment">Make Appoinment </Link></button>) :(<button className='bg-blue-600 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2'><Link className={`flex gap-2`} to="/Login">Make Appointment </Link></button>) }
              </div>
            ))}

            
          </div>
        <div className='p-4'>
            
        {!showAllDoctors && doctors.length > initialCardCount && (
            <button
              onClick={toggleShowAllDoctors}
              className="block mx-auto mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            >
              View more
            </button>
          )}
          {showAllDoctors && (
            <button
              onClick={toggleShowAllDoctors}
              className="block mx-auto mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            >
              View less
            </button>
          )}
        </div>
        </>
      )}
    </div>
    <Footer/>
   </>
  );
};

export default DoctorList;
