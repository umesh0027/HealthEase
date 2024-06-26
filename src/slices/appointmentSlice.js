

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const bookAppointment = createAsyncThunk(
  'appointment/bookAppointment',
  async (formData) => {
    try {
      const response = await axios.put(`${baseURL}/appointment/book/${formData.id}`, formData);
      return response.data.message;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookAppointment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default appointmentSlice.reducer;

