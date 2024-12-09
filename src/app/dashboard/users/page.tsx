'use client';

import { UserForm } from '@/components/dashboard/UserForm';
import { useUserRole } from '@/hooks/useUserRole';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { FaPlus, FaEllipsisV } from 'react-icons/fa';
import { UserTable } from '@/components/dashboard/UserTable';
import { useUsersQuery } from '@/store/queries/users';

const UsersPage = () => {
  const { isAdmin, loading } = useUserRole();
  const [showForm, setShowForm] = useState(false);
  const { data: users, isLoading } = useUsersQuery();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAdmin) {
    redirect('/dashboard');
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Gestión de Usuarios
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          <FaPlus /> Nuevo Usuario
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <UserTable data={users} />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Crear Nuevo Usuario</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <UserForm onSuccess={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage; 