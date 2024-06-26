// appointmentActions.js

import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const getAppointments = () => async (dispatch) => {
  try {
    const res = await axios.get(`${baseURL}/appointments`);
    dispatch({ type: 'GET_APPOINTMENTS_SUCCESS', payload: res.data.appointments });
  } catch (error) {
    dispatch({ type: 'GET_APPOINTMENTS_FAIL', payload: error.response.data.message });
  }
};

export const createAppointmentSlot = (appointmentData) => async (dispatch) => {
  try {
    await axios.post(`${baseURL}/appointments/create`, appointmentData);
    dispatch({ type: 'CREATE_APPOINTMENT_SUCCESS' });
  } catch (error) {
    dispatch({ type: 'CREATE_APPOINTMENT_FAIL', payload: error.response.data.message });
  }
};

export const bookAppointment = (id) => async (dispatch) => {
  try {
    await axios.put(`${baseURL}/appointments/bookappointment`);
    dispatch({ type: 'BOOK_APPOINTMENT_SUCCESS' });
  } catch (error) {
    dispatch({ type: 'BOOK_APPOINTMENT_FAIL', payload: error.response.data.message });
  }
};

export const updateAppointment = (id, updatedData) => async (dispatch) => {
  try {
    await axios.put(`${baseURL}/appointments/${id}`, updatedData);
    dispatch({ type: 'UPDATE_APPOINTMENT_SUCCESS' });
  } catch (error) {
    dispatch({ type: 'UPDATE_APPOINTMENT_FAIL', payload: error.response.data.message });
  }
};
