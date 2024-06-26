

import React from 'react';
import DashboardHeader from '../DashboardHeader';
import { useSelector } from "react-redux"


const DoctorDashboardProfile = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <>
      <DashboardHeader />
      <div className="mt-10 mx-auto px-4 sm:px-6 lg:px-8 ">

        {/* Profile Information Section */}
        <div className="bg-blue-250 rounded-xl p-6 mb-10 w-11/12 max-w-[1000px]">
          <h1 className="text-3xl font-semibold text-richblack-900 mb-5">Profile Information</h1>
          <div className="flex flex-col md:flex-row justify-between gap-y-5 md:gap-x-10">
            {/* Left Column */}
            <div className="flex flex-col gap-y-2">
              <p className="text-sm text-richblack-800"><span className=" text-[18px] font-semibold">First Name:</span> {user?.firstName}</p>
              <p className="text-sm text-richblack-800"><span className=" text-[18px] font-semibold">Last Name:</span> {user?.lastName}</p>
              {/* <p className="text-sm text-richblack-800"><span className=" text-xl font-semibold">Age:</span> {user?.additionalDetails?.Age ?? "Add Age"}</p> */}
              <p className="text-sm text-richblack-800"><span className=" text-[18px] font-semibold">Gender:</span> {user?.additionalDetails?.gender ?? "Add Gender"}</p>
              
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-y-2">
              <p className="text-sm text-richblack-800"><span className="text-[18px] font-semibold">Email:</span> {user?.email}</p>
     
              <p className="text-sm text-richblack-800"><span className="text-[18px] font-semibold">Contact Number:</span> {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
              <p className="text-sm text-richblack-800"><span className="text-[18px] font-semibold">Alternate Contact No.:</span> {user?.additionalDetails?.alternateContactNumber ?? "Add Alternate Contact Number"}</p>
            </div>
          </div>
        </div>


      </div>


     
    </>
  );
}

export default DoctorDashboardProfile;

