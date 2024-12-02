'use client';

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      title: 'Nueva Reserva',
      message: 'Juan Pérez ha realizado una nueva reserva para mañana',
      time: '2 minutos atrás',
      read: false,
    },
    {
      id: 2,
      title: 'Cancelación',
      message: 'María González ha cancelado su reserva del día 15',
      time: '1 hora atrás',
      read: true,
    },
    // Más notificaciones...
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Notificaciones</h1>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-100'
                }`}
              >
                <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                <p className="text-gray-600 mt-1">{notification.message}</p>
                <span className="text-sm text-gray-500 mt-2 block">{notification.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage; 