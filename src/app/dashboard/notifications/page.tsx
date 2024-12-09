'use client';

import { useNotifications } from '@/hooks/useNotifications';

const NotificationsPage = () => {
  const { notifications, markAsRead } = useNotifications();

  if (!notifications?.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Notificaciones</h1>
        <p className="text-gray-600">No hay notificaciones nuevas</p>
      </div>
    );
  }

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
                onClick={() => markAsRead(notification.id)}
                role="button"
                tabIndex={0}
              >
                <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                <p className="text-gray-600 mt-1">{notification.message}</p>
                <span className="text-sm text-gray-500 mt-2 block">
                  {new Date(notification.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage; 