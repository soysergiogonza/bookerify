'use client';

import { useWhatsApp } from '@/hooks/useWhatsApp';
import { useState } from 'react';

const TablesPage = () => {
  const { sendBookingConfirmation, isLoading } = useWhatsApp();
  const [notificationStatus, setNotificationStatus] = useState<{[key: number]: string}>({});

  const reservations = [
    { 
      id: 1, 
      client: 'María González',
      phone: '573008341223', // Formato internacional
      service: 'Corte de Cabello',
      date: '2024-03-15',
      time: '10:00',
      status: 'Confirmada' 
    },
    // ... más reservaciones
  ];

  const handleSendConfirmation = async (reservation: any) => {
    try {
      await sendBookingConfirmation(
        reservation.phone,
        {
          customerName: reservation.client,
          service: reservation.service,
          date: reservation.date,
          time: reservation.time
        }
      );
      setNotificationStatus(prev => ({
        ...prev,
        [reservation.id]: 'Notificación enviada'
      }));
    } catch (error) {
      setNotificationStatus(prev => ({
        ...prev,
        [reservation.id]: 'Error al enviar'
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Reservas</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Servicio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{reservation.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{reservation.service}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {reservation.date} {reservation.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        reservation.status === 'Confirmada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {reservation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleSendConfirmation(reservation)}
                        disabled={isLoading}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
                      >
                        {isLoading ? 'Enviando...' : 'Enviar WhatsApp'}
                      </button>
                      {notificationStatus[reservation.id] && (
                        <span className="ml-2 text-sm text-gray-600">
                          {notificationStatus[reservation.id]}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablesPage; 