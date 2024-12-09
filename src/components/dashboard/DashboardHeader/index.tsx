'use client';

import { useAuth } from '@/hooks';
import DefaultAvatar from '@assets/icons/default-avatar.png';
import Image from 'next/image';
import { FaBell } from 'react-icons/fa';
import { useState } from 'react';
import { useUserRole } from '@/hooks/useUserRole';

export const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { userRole, loading } = useUserRole();

  return (
    <header className='bg-white shadow-sm fixed w-full h-16 z-50'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='relative w-64'>
            <input
              type='search'
              placeholder='Buscar...'
              className='w-full rounded-md border border-gray-300 px-4 py-2 text-sm'
            />
          </div>

          <div className='flex items-center gap-4'>
            <button
              type='button'
              className='p-2 text-gray-400 hover:text-gray-500'
              aria-label='Notificaciones'
            >
              <FaBell className="h-5 w-5" />
            </button>

            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-2'>
                <Image
                  src={DefaultAvatar}
                  alt={user?.name ?? 'Usuario'}
                  width={32}
                  height={32}
                  className='rounded-full'
                />
                <div className='flex flex-col'>
                  <span className='text-sm font-medium text-gray-900'>
                    {user?.user_metadata?.name || user?.name || 'Usuario'}
                  </span>
                  {!loading && userRole && (
                    <span className={`text-xs font-medium ${
                      userRole === 'admin' 
                        ? 'text-indigo-600' 
                        : 'text-gray-500'
                    }`}>
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={logout}
                disabled={isLoggingOut}
                className='px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50'
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
