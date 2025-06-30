import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { appointmentsAPI } from '../services/api';

// Async thunk for fetching appointments
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await appointmentsAPI.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch appointments');
    }
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    filteredAppointments: [],
    loading: false,
    error: null,
    filter: 'all', // 'all', 'today', 'week'
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.filteredAppointments = filterAppointments(state.appointments, action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
        state.filteredAppointments = filterAppointments(action.payload, state.filter);
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Helper function to filter appointments
const filterAppointments = (appointments, filter) => {
  const today = new Date().toISOString().split('T')[0];
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
  const weekLimit = oneWeekFromNow.toISOString().split('T')[0];

  switch (filter) {
    case 'today':
      return appointments.filter(apt => apt.date === today);
    case 'week':
      return appointments.filter(apt => apt.date >= today && apt.date <= weekLimit);
    default:
      return appointments;
  }
};

export const { setFilter, clearError } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;