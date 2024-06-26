


import { toast } from "react-hot-toast";
import { setLoading, setDoctors, setError } from "../../slices/doctorSlices";
import { apiConnector } from "../../services/apiConnector";
import { doctorsendpoints } from "../apis";

const { CREATE_DOCTOR_API, GET_DOCTORS_API, UPDATE_DOCTOR_API } = doctorsendpoints ;

// Function to create a new doctor
export function createDoctor(data) {
  return async (dispatch) => {
    dispatch(setLoading(true)); // Set loading state to true

    try {
      const response = await apiConnector("POST", CREATE_DOCTOR_API, data); // Send a POST request to create a new doctor

      if (!response.data.success) {
        // If the response indicates failure
        throw new Error(response.data.message); // Throw an error with the error message
      }

      toast.success("Doctor created successfully"); // Display a success toast message
    } catch (error) {
      // Catch any errors that occur during the API call
      console.error(error); // Log the error to the console
      toast.error("Failed to create doctor"); // Display an error toast message
      dispatch(setError(error.message)); // Dispatch an action to set the error state with the error message
    }

    dispatch(setLoading(false)); // Set loading state to false
  };
}

// Function to fetch all doctors
export function getDoctors() {
  return async (dispatch) => {
    dispatch(setLoading(true)); // Set loading state to true

    try {
      const response = await apiConnector("GET", GET_DOCTORS_API); // Send a GET request to fetch all doctors

      if (!response.data.success) {
        // If the response indicates failure
        throw new Error(response.data.message); // Throw an error with the error message
      }

      dispatch(setDoctors(response.data.doctors)); // Dispatch an action to set the doctors state with the fetched doctors
    } catch (error) {
      // Catch any errors that occur during the API call
      console.error(error); // Log the error to the console
      dispatch(setError(error.message)); // Dispatch an action to set the error state with the error message
    }

    dispatch(setLoading(false)); // Set loading state to false
  };
}

// Function to update a doctor
export function updateDoctor(doctorId, data) {
  return async (dispatch) => {
    dispatch(setLoading(true)); // Set loading state to true

    try {
      const url = `${UPDATE_DOCTOR_API}/${doctorId}`; // Construct the URL with the doctorId
      const response = await apiConnector("PUT", url, data); // Send a PUT request to update the doctor

      if (!response.data.success) {
        // If the response indicates failure
        throw new Error(response.data.message); // Throw an error with the error message
      }

      toast.success("Doctor updated successfully"); // Display a success toast message
    } catch (error) {
      // Catch any errors that occur during the API call
      console.error(error); // Log the error to the console
      toast.error("Failed to update doctor"); // Display an error toast message
      dispatch(setError(error.message)); // Dispatch an action to set the error state with the error message
    }

    dispatch(setLoading(false)); // Set loading state to false
  };
}
