import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import profileReducer  from "../slices/profileSlice"
import  doctorReducer from "../slices/doctorSlices"
import  appointmentsReducer from "../slices/appointmentSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  doctors: doctorReducer,
  appointments: appointmentsReducer,
})

export default rootReducer
