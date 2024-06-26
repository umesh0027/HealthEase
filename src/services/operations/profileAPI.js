import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"
import { setAllDoctors } from "../../slices/profileSlice";
const {
  GET_USER_DETAILS_API,
  GET_ALL_USERS_API 
} = profileEndpoints
export const SET_ALL_USERS = 'SET_ALL_USERS';

// Action Creators
export const setAllUsers = (users) => ({
  type: SET_ALL_USERS,
  payload: users,
});
export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}


export function getAllUserDetails(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_ALL_USERS_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("GET_ALL_USERS API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Dispatch action to set the retrieved users in the state
      dispatch(setAllUsers(response.data.data));
    } catch (error) {
      console.error("GET_ALL_USERS API ERROR:", error);
      toast.error("Could not fetch all user details");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}



export function getAllDoctors(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_ALL_USERS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      console.log("GET_ALL_USERS API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // // Dispatch action to set the retrieved doctors in the state
      // dispatch(setAllDoctors(response.data.data));
    } catch (error) {
      console.error("GET_ALL_USERS API ERROR:", error);
      toast.error("Could not fetch all doctors");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}