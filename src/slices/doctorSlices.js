

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const getAllDoctors = createAsyncThunk(
  'doctors/getAllDoctors',
  async () => {
    const response = await axios.get(`${baseURL}/doctor/getAllDoctors`);
    return response.data.doctors;
  }
);

const initialState = {
  doctors: [],
  loading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(getAllDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default doctorSlice.reducer;

