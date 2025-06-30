import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAppointments } from '../store/appointmentsSlice';
import DashboardStats from '../components/Dashboard/DashboardStats';
import FilterBar from '../components/Dashboard/FilterBar';
import AppointmentList from '../components/Dashboard/AppointmentList';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Dr. Smith</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your appointments today.</p>
        </div>
        <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>New Appointment</span>
        </button>
      </div>

      <DashboardStats />
      <FilterBar />
      <AppointmentList />
    </div>
  );
};

export default Dashboard;