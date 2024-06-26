
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../../../services/operations/SettingsAPI"
import IconBtn from "../../../../Common/IconBtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]
const EditProfile = () => {
  // const [diseases, setDiseases] = useState('');
  // const [medicalHistory, setMedicalHistory] = useState('');
  const { token } = useSelector((state) => state.auth)
   const { user } = useSelector((state) => state.profile)
//   const { token } = useSelector((state) => state.auth)

  
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      dispatch(updateProfile(token, data))
      const response = await axios.put(
     `${process.env.REACT_APP_BASE_URL}/patients/updateprofile`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
     
    } catch (error) {
      console.error('Error updating profile:', error);
    
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
              <label htmlFor="Age" className="text-richblack-700">
               Age
               </label>
               <input
                type="Number"
                name="Age"
                id="Age"
                placeholder="Enter Age"
                className="form-style"
                {...register("Age", {
                  required: {
                    value: true,
                    message: "Please enter your Age.",
                  }
                 
                })}
                defaultValue={user?.additionalDetails?.Age}
              />
              {errors.Age && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.Age.message}
                </span>
              )}
            </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="BloodGroup" className="text-richblack-700">
           Blood Group
              </label>
              <input
                type="text"
                name="BloodGroup"
                id="BloodGroup"
                placeholder="Enter BloodGroup"
                className="form-style"
                {...register("BloodGroup", {
                  required: {
                    value: true,
                    message: "Please enter your BloodGroup.",
                  }
                 
                })}
                defaultValue={user?.additionalDetails?.BloodGroup}
              />
              {errors.BloodGroup && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.BloodGroup.message}
                </span>
              )}
            </div>

           
          <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="Address" className="text-richblack-700">
           Address
              </label>
              <input
                type="text"
                name="Address"
                id="Address"
                placeholder="Enter your Address"
                className="form-style"
                {...register("Address", {
                  required: {
                    value: true,
                    message: "Please enter your Address.",
                  }
                 
                })}
                defaultValue={user?.additionalDetails?.Address}
              />
              {errors.Address && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.Address.message}
                </span>
              )}
            </div>

               </div>
    
         <div className="flex flex-col gap-5 lg:flex-row ">
          
         <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="diseases" className="text-richblack-700">Diseases:</label>
          <input
            type="text"
            id="diseases"
            placeholder="Enter disease"
            className="form-style"
            {...register('diseases', { required: true })}
          />
         
          {errors.specialization && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Disease.
                </span>
              )}
        </div>

        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="medicalHistory" className="text-richblack-700">MedicalHistory:</label>
          <input
            type="text"
            id="medicalHistory"
            className="form-style"
            placeholder="Enter medicalHistory"
            {...register('medicalHistory', { required: true })}
          />
          {errors.qualifications && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your MedicalHistory.
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
    // <div>
    //   <h2>Update Patient Profile</h2>
    //   <div>
    //     <label htmlFor="diseases">Diseases:</label>
    //     <input
    //       type="text"
    //       id="diseases"
    //       value={diseases}
    //       onChange={(e) => setDiseases(e.target.value)}
    //     /><br /><br />

    //     <label htmlFor="medicalHistory">Medical History:</label>
    //     <input
    //       type="text"
    //       id="medicalHistory"
    //       value={medicalHistory}
    //       onChange={(e) => setMedicalHistory(e.target.value)}
    //     /><br /><br />

    //     <button onClick={handleUpdateProfile}>Update Profile</button>
    //   </div>
    // </div>
  );
};

export default EditProfile;





// import { useForm } from "react-hook-form"
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"


// import { updateProfile } from "../../../../../services/operations/SettingsAPI"
// import IconBtn from "../../../../Common/IconBtn"

// const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

// export default function EditProfile() {
//   const { user } = useSelector((state) => state.profile)
//   const { token } = useSelector((state) => state.auth)

  
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm()

//   const submitProfileForm = async (data) => {
//     // console.log("Form Data - ", data)
//     try {
//       dispatch(updateProfile(token, data))
//     } catch (error) {
//       console.log("ERROR MESSAGE - ", error.message)
//     }
//   }


//   return (
//     <>
    
//       <form onSubmit={handleSubmit(submitProfileForm)}>
//         {/* Profile Information */}
//         <div className="my-10 flex flex-col gap-y-6 rounded-md bg-blue-250 p-8 px-12 mx-auto w-11/12 ">
//           <h2 className="text-lg font-semibold text-richblack-800">
//             Profile Information
//           </h2>
//           <div className="flex flex-col gap-5 lg:flex-row">
//             <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="firstName" className="text-richblack-700 ">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 name="firstName"
//                 id="firstName"
//                 placeholder="Enter first name"
//                 className="form-style"
//                 {...register("firstName", { required: true })}
//                 defaultValue={user?.firstName}
//               />
//               {errors.firstName && (
//                 <span className="-mt-1 text-[12px] text-richblack-800">
//                   Please enter your first name.
//                 </span>
//               )}
//             </div>
//             <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="lastName" className="text-richblack-700">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 name="lastName"
//                 id="lastName"
//                 placeholder="Enter first name"
//                 className="form-style"
//                 {...register("lastName", { required: true })}
//                 defaultValue={user?.lastName}
//               />
//               {errors.lastName && (
//                 <span className="-mt-1 text-[12px] text-richblack-800">
//                   Please enter your last name.
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col gap-5 lg:flex-row">
//             <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="dateOfBirth" className="text-richblack-700">
//                 Date of Birth
//               </label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 id="dateOfBirth"
//                 className="form-style"
//                 {...register("dateOfBirth", {
//                   required: {
//                     value: true,
//                     message: "Please enter your Date of Birth.",
//                   },
//                   max: {
//                     value: new Date().toISOString().split("T")[0],
//                     message: "Date of Birth cannot be in the future.",
//                   },
//                 })}
//                 defaultValue={user?.additionalDetails?.dateOfBirth}
//               />
//               {errors.dateOfBirth && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   {errors.dateOfBirth.message}
//                 </span>
//               )}
//             </div>
//             <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="gender" className="text-richblack-700">
//                 Gender
//               </label>
//               <select
//                 type="text"
//                 name="gender"
//                 id="gender"
//                 className="form-style"
//                 {...register("gender", { required: true })}
//                 defaultValue={user?.additionalDetails?.gender}
//               >
//                 {genders.map((ele, i) => {
//                   return (
//                     <option key={i} value={ele}>
//                       {ele}
//                     </option>
//                   )
//                 })}
//               </select>
//               {errors.gender && (
//                 <span className="-mt-1 text-[12px] text-yellow-700">
//                   Please enter your Date of Birth.
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col gap-5 lg:flex-row">
//             <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="contactNumber" className="text-richblack-700">
//                 Contact Number
//               </label>
//               <input
//                 type="tel"
//                 name="contactNumber"
//                 id="contactNumber"
//                 placeholder="Enter Contact Number"
//                 className="form-style"
//                 {...register("contactNumber", {
//                   required: {
//                     value: true,
//                     message: "Please enter your Contact Number.",
//                   },
//                   maxLength: { value: 12, message: "Invalid Contact Number" },
//                   minLength: { value: 10, message: "Invalid Contact Number" },
//                 })}
//                 defaultValue={user?.additionalDetails?.contactNumber}
//               />
//               {errors.contactNumber && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   {errors.contactNumber.message}
//                 </span>
//               )}
//             </div>
//             <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="contactNumber" className="text-richblack-700">
//                Alternate Contact Number
//               </label>
//               <input
//                 type="tel"
//                 name="AlternatecontactNumber"
//                 id="AlternatecontactNumber"
//                 placeholder="Enter Contact Number"
//                 className="form-style"
//                 {...register("AlternatecontactNumber", {
//                   required: {
//                     value: true,
//                     message: "Please enter your Contact Number.",
//                   },
//                   maxLength: { value: 12, message: "Invalid Contact Number" },
//                   minLength: { value: 10, message: "Invalid Contact Number" },
//                 })}
//                 defaultValue={user?.additionalDetails?.AlternatecontactNumber}
//               />
//               {errors.AlternatecontactNumber && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   {errors.AlternatecontactNumber.message}
//                 </span>
//               )}
//             </div>
          
//             <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="about" className="text-richblack-700">
//                 About
//               </label>
//               <input
//                 type="text"
//                 name="about"
//                 id="about"
//                 placeholder="Enter Bio Details"
//                 className="form-style"
//                 {...register("about", { required: true })}
//                 defaultValue={user?.additionalDetails?.about}
//               />
//               {errors.about && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   Please enter your About.
//                 </span>
//               )}
//             </div>
            
//           </div>
//           <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="Age" className="text-richblack-700">
//                Age
//               </label>
//               <input
//                 type="Number"
//                 name="Age"
//                 id="Age"
//                 placeholder="Enter Age"
//                 className="form-style"
//                 {...register("Age", {
//                   required: {
//                     value: true,
//                     message: "Please enter your Age.",
//                   }
                 
//                 })}
//                 defaultValue={user?.additionalDetails?.Age}
//               />
//               {errors.Age && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   {errors.Age.message}
//                 </span>
//               )}
//             </div>
//           <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="BloodGroup" className="text-richblack-700">
//            Blood Group
//               </label>
//               <input
//                 type="text"
//                 name="BloodGroup"
//                 id="BloodGroup"
//                 placeholder="Enter BloodGroup"
//                 className="form-style"
//                 {...register("BloodGroup", {
//                   required: {
//                     value: true,
//                     message: "Please enter your BloodGroup.",
//                   }
                 
//                 })}
//                 defaultValue={user?.additionalDetails?.BloodGroup}
//               />
//               {errors.BloodGroup && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   {errors.BloodGroup.message}
//                 </span>
//               )}
//             </div>

           
//           <div className="flex flex-col gap-2 lg:w-[48%]">
//               <label htmlFor="Address" className="text-richblack-700">
//            Address
//               </label>
//               <input
//                 type="text"
//                 name="Address"
//                 id="Address"
//                 placeholder="Enter your Address"
//                 className="form-style"
//                 {...register("Address", {
//                   required: {
//                     value: true,
//                     message: "Please enter your Address.",
//                   }
                 
//                 })}
//                 defaultValue={user?.additionalDetails?.Address}
//               />
//               {errors.Address && (
//                 <span className="-mt-1 text-[12px] text-yellow-100">
//                   {errors.Address.message}
//                 </span>
//               )}
//             </div>


          
//         </div>

//         <div className="flex justify-end gap-2 mr-10">
//           <button
//             onClick={() => {
//               navigate("/dashboard/my-profile")
//             }}
//             className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
//           >
//             Cancel
//           </button>
//           <IconBtn type="submit" text="Save" />
//         </div>
//       </form>
//     </>
//   )
// }
