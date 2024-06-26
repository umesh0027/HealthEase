
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { updateProfile } from "../../../../../services/operations/SettingsAPI"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../../../Common/IconBtn"
const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]
const EditProfile = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onSubmit = async (data) => {
    try {
      dispatch(updateProfile(token, data))
      const response = await axios.put(
       `${process.env.REACT_APP_BASE_URL}/doctor/updateProfile`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
      // Handle success response
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="my-10 flex flex-col gap-y-6 rounded-md bg-blue-250 p-8 px-12 mx-auto w-11/12 ">
      <h2 className="text-lg font-semibold text-richblack-800">Update Profile</h2>
     
        <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="text-richblack-700 ">
                First Name
              </label>
               <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-richblack-800">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="text-richblack-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                className="form-style"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-richblack-800">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="text-richblack-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="text-richblack-700">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-700">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="text-richblack-700">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="text-richblack-700">
               Alternate Contact Number
              </label>
              <input
                type="tel"
                name="AlternatecontactNumber"
                id="AlternatecontactNumber"
                placeholder="Enter Contact Number"
                className="form-style"
                {...register("AlternatecontactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.AlternatecontactNumber}
              />
              {errors.AlternatecontactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.AlternatecontactNumber.message}
                </span>
              )}
            </div>
          
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="text-richblack-700">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
            </div>
            
          </div>
         

         <div className="flex flex-col gap-5 lg:flex-row ">
          
         <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="specialization" className="text-richblack-700">Specialization:</label>
          <input
            type="text"
            id="specialization"
            placeholder="Enter specialization"
            className="form-style"
            {...register('specialization', { required: true })}
          />
         
          {errors.specialization && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Specialization.
                </span>
              )}
        </div>

        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="qualifications" className="text-richblack-700">Qualifications:</label>
          <input
            type="text"
            id="qualifications"
            className="form-style"
            placeholder="Enter qualification"
            {...register('qualifications', { required: true })}
          />
          {errors.qualifications && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Qualification.
                </span>
              )}
        </div>

        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="experience" className="text-richblack-700">Experience (in years):</label>
          <input
            type="text"
            id="experience"
            className="form-style"
            placeholder="Enter your Experience"
            {...register('experienceYears', { required: true })}
          />
          
          {errors.experienceYears && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your ExperienceYear.
                </span>
              )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="Fee" className="text-richblack-700">Fees:</label>
          <input
            type="text"
            id="Fee"
            className="form-style"
            placeholder="Enter your Fees"
            {...register('Fee', { required: true })}
          />
          
          {errors.Fee && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Fee.
                </span>
              )}
        </div>
         </div>
        </div>

           <div className="flex justify-end gap-2 mr-10">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
   
  );
};

export default EditProfile;


