'use client';

import { useAuth } from '@/hooks';
import DefaultAvatar from '@assets/icons/default-avatar.png';
import Image from 'next/image';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Mi Perfil</h2>
        <div className="space-y-8">
          {/* Sección de Avatar */}
          <div className="flex items-center space-x-6">
            <Image
              src={DefaultAvatar}
              alt={user?.name ?? 'Usuario'}
              width={128}
              height={128}
              className="rounded-full"
              priority
            />
            <div>
              <h3 className="text-xl font-medium text-gray-900">
                {user?.name || 'Usuario'}
              </h3>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Información del perfil */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <p className="mt-1 text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <p className="mt-1 text-gray-900">{user?.name || 'No especificado'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 