'use client';

import { useBookings } from '@/hooks/useBookings';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import { useState } from 'react';
import { toast } from 'sonner';

const TablesPage = () => {
  const { bookings, isLoading: bookingsLoading } = useBookings();
  const { sendBookingConfirmation, isLoading: whatsappLoading } = useWhatsApp();
  const [notificationStatus, setNotificationStatus] = useState<{[key: string]: string}>({});

  const handleSendConfirmation = async (booking: any) => {
    try {
      await sendBookingConfirmation(
        booking.phone,
        {
          customerName: booking.client_name,
          service: booking.service_name,
          date: booking.date,
          time: booking.time
        }
      );
      setNotificationStatus(prev => ({
        ...prev,
        [booking.id]: 'sent'
      }));
      toast.success('Notificación enviada correctamente');
    } catch (error) {
      setNotificationStatus(prev => ({
        ...prev,
        [booking.id]: 'error'
      }));
      toast.error('Error al enviar la notificación');
    }
  };

  if (bookingsLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Reservas</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Servicio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings?.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.client_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.service_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(booking.date).toLocaleDateString()} {booking.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleSendConfirmation(booking)}
                        disabled={whatsappLoading || notificationStatus[booking.id] === 'sent'}
                        className="text-indigo-600 hover:text-indigo-900 disabled:opacity-50"
                      >
                        {notificationStatus[booking.id] === 'sent' ? 'Enviado' : 
                         notificationStatus[booking.id] === 'error' ? 'Reintentar' : 
                         'Enviar Confirmación'}
                      </button>
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