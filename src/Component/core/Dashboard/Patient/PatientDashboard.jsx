
import React from 'react';
import DashboardHeader from '../DashboardHeader';
import { useSelector } from "react-redux"
import { formattedDate } from "../../../../utils/dateFormatter"
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
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
              <p className="text-sm text-richblack-800"><span className=" text-[18px] font-semibold">Age:</span> {user?.additionalDetails?.Age ?? "Add Age"}</p>
              <p className="text-sm text-richblack-800"><span className=" text-[18px] font-semibold">Gender:</span> {user?.additionalDetails?.gender ?? "Add Gender"}</p>
              <p className="text-sm text-richblack-800"><span className=" text-[18px] font-semibold">Blood Group:</span> {user?.additionalDetails?.BloodGroup ?? "Add Blood Group"}</p>
              <p className="text-sm text-richblack-800"><span className=" text-[18px] font-semibold">Date Of Birth:</span> {formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add Date Of Birth"}</p>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-y-2">
              <p className="text-sm text-richblack-800"><span className="text-[18px] font-semibold">Email:</span> {user?.email}</p>
              <p className="text-sm text-richblack-800"><span className="text-[18px] font-semibold">Address:</span> {user?.additionalDetails?.Address ?? "Enter your Address Here"}</p>
              <p className="text-sm text-richblack-800"><span className="text-[18px] font-semibold">Contact Number:</span> {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
              <p className="text-sm text-richblack-800"><span className="text-[18px] font-semibold">Alternate Contact No.:</span> {user?.additionalDetails?.alternateContactNumber ?? "Add Alternate Contact Number"}</p>
            </div>
          </div>
        </div>

        {/* Medical Information Section */}
        <div className="flex flex-col md:flex-row gap-10 mb-10">
          {/* Appointments */}
          <div className="w-full md:w-1/2 bg-blue-150 rounded-xl p-6">
            <h1 className="text-xl font-semibold mb-4">Appointments</h1>
            <p className="text-blue-700 text-bold text-xl underline"><Link to="/dashboard/my-Appoinment">Your Appointments</Link></p>
          </div>
          
          {/* Reports */}
          <div className="w-full md:w-1/2 bg-blue-150 rounded-xl p-6">
            <h1 className="text-xl font-semibold mb-4">Reports</h1>
            <p className="text-blue-700 text-bold text-xl underline"><Link to="/dashboard/reports">Your Reports</Link></p>
          </div>
        </div>

      </div>
    </>
  );
}

export default PatientDashboard;

