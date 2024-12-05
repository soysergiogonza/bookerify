'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye } from 'react-icons/fa';
import { useUsersQuery, useUserMutation } from '@/store/queries/users';

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  lastname: string | null;
  second_lastname: string | null;
  role_name: string | null;
  created_at: string;
}

export const UserTable = () => {
  const { data: users, isLoading, error } = useUsersQuery();
  const { mutate: updateUser } = useUserMutation();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  if (isLoading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div>Error al cargar usuarios: {error.message}</div>;
  }

  const filteredUsers = users?.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewUser = (userId: string) => {
    router.push(`/dashboard/users/${userId}`);
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Buscar usuarios..."
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers?.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {[
                    user.name || '',
                    user.lastname || '',
                    user.second_lastname || ''
                  ].filter(Boolean).join(' ') || 'Sin nombre'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {user.role_name || 'Sin rol'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleViewUser(user.id)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <FaEye className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 