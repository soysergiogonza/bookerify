'use client';

import { useAuth } from '@/hooks';
import Image from 'next/image';
import DefaultAvatar from '@assets/icons/default-avatar.png';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center space-x-6">
            <Image
              src={user?.avatarUrl ?? DefaultAvatar}
              alt={user?.fullName ?? 'Usuario'}
              width={128}
              height={128}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.fullName}</h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Información Personal</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    value={user?.fullName ?? ''}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    value={user?.email ?? ''}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 