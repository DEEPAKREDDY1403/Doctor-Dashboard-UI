import { useSelector } from 'react-redux';
import AppointmentCard from './AppointmentCard';
import LoadingSkeleton from '../UI/LoadingSkeleton';
import ErrorMessage from '../UI/ErrorMessage';

const AppointmentList = () => {
  const { filteredAppointments, loading, error } = useSelector(state => state.appointments);

  if (loading) {
    return <LoadingSkeleton count={5} />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (filteredAppointments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
        <p className="text-gray-500">There are no appointments matching your current filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredAppointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
};

export default AppointmentList;