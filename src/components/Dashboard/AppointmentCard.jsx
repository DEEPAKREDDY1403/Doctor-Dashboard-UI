import { formatDate, formatTime, getDaysUntil } from '../../utils/dateHelpers';

const AppointmentCard = ({ appointment }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-secondary-100 text-secondary-800 border-secondary-200';
      case 'pending':
        return 'bg-accent-100 text-accent-800 border-accent-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-teal-100 text-teal-800',
    ];
    return colors[type.length % colors.length];
  };

  return (
    <div className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 p-6 border border-gray-100 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
              {appointment.patientName}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-1">
            📧 {appointment.email}
          </p>
          <p className="text-sm text-gray-500">
            📞 {appointment.phone}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">
            {getDaysUntil(appointment.date)}
          </div>
          <div className="text-xs text-gray-500">
            {formatDate(appointment.date)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatTime(appointment.time)}
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(appointment.type)}`}>
          {appointment.type}
        </span>
      </div>

      {appointment.notes && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Notes:</span> {appointment.notes}
          </p>
        </div>
      )}

      <div className="flex items-center justify-end space-x-2">
        <button className="px-3 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200">
          View Details
        </button>
        <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
          Edit
        </button>
        {appointment.status === 'pending' && (
          <button className="px-3 py-1 text-xs font-medium text-secondary-600 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors duration-200">
            Confirm
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;