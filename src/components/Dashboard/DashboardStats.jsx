import { useSelector } from 'react-redux';

const DashboardStats = () => {
  const { appointments } = useSelector(state => state.appointments);

  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(apt => apt.date === today);
  const confirmedToday = todayAppointments.filter(apt => apt.status === 'confirmed');
  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');

  const stats = [
    {
      title: 'Total Appointments',
      value: appointments.length,
      icon: '📅',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Today\'s Appointments',
      value: todayAppointments.length,
      icon: '🕐',
      color: 'bg-secondary-500',
      bgColor: 'bg-secondary-50',
    },
    {
      title: 'Confirmed Today',
      value: confirmedToday.length,
      icon: '✅',
      color: 'bg-secondary-600',
      bgColor: 'bg-secondary-50',
    },
    {
      title: 'Pending Approval',
      value: pendingAppointments.length,
      icon: '⏳',
      color: 'bg-accent-500',
      bgColor: 'bg-accent-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-lg p-6 border border-opacity-20 hover:shadow-lg transition-all duration-300 group`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-200">
                {stat.value}
              </p>
            </div>
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-2xl`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;