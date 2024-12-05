'use client';

import { useAuthQuery } from '@/store/queries/auth';
import { useBookingsQuery } from '@/store/queries/bookings';
import { isToday } from '@/utils/dateUtils';

const DashboardPage = () => {
  const { data: user } = useAuthQuery();
  const { data: bookings } = useBookingsQuery();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Bienvenido/a, {user?.name || 'Usuario'}
        </h1>
        <p className="text-gray-600">
          Este es tu panel de control de Bookerify. Aquí podrás gestionar tus reservas,
          ver estadísticas y administrar tu negocio.
        </p>
      </div>

      {/* Resumen de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Reservas Hoy</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {bookings?.filter(b => isToday(b.date)).length || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Clientes Activos</h3>
          <p className="text-3xl font-bold text-indigo-600">124</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">Ingresos del Mes</h3>
          <p className="text-3xl font-bold text-indigo-600">$2,845</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
