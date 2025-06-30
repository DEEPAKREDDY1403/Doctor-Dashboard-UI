import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/appointmentsSlice';

const FilterBar = () => {
  const dispatch = useDispatch();
  const { filter, appointments, filteredAppointments } = useSelector(state => state.appointments);

  const filterOptions = [
    { key: 'all', label: 'All Appointments', count: appointments.length },
    { key: 'today', label: 'Today', count: appointments.filter(apt => {
      const today = new Date().toISOString().split('T')[0];
      return apt.date === today;
    }).length },
    { key: 'week', label: 'This Week', count: appointments.filter(apt => {
      const today = new Date().toISOString().split('T')[0];
      const oneWeekFromNow = new Date();
      oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
      const weekLimit = oneWeekFromNow.toISOString().split('T')[0];
      return apt.date >= today && apt.date <= weekLimit;
    }).length },
  ];

  const handleFilterChange = (filterKey) => {
    dispatch(setFilter(filterKey));
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">
          Upcoming Appointments
        </h2>
        <div className="text-sm text-gray-500">
          Showing {filteredAppointments.length} of {appointments.length} appointments
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => handleFilterChange(option.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === option.key
                ? 'bg-primary-500 text-white shadow-md transform scale-105'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            {option.label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              filter === option.key
                ? 'bg-white bg-opacity-20 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {option.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;