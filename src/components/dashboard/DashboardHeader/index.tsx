'use client';

import { useAuth } from '@/hooks';
import DefaultAvatar from '@assets/icons/default-avatar.png';
import Image from 'next/image';
import { FaBell, FaChevronDown, FaUser } from 'react-icons/fa';
import { useState } from 'react';

export const DashboardHeader = () => {
 const { user, logout } = useAuth();
 const [isLoggingOut, setIsLoggingOut] = useState(false);

 const handleLogout = async () => {
  if (isLoggingOut) return;
  
  try {
   setIsLoggingOut(true);
   await logout();
   window.location.replace('/login');
  } catch (error) {
   console.error('Error al cerrar sesión:', error);
   setIsLoggingOut(false);
  }
 };

 return (
  <header className='bg-white shadow-sm fixed w-full h-16'>
   <div className='mx-auto px-4 sm:px-6 lg:px-8'>
    <div className='flex justify-between items-center py-4'>
     <div className='flex items-center'>
      <div className='flex items-center ml-4'>
       <span className='font-semibold text-xl text-gray-900'>Dashboard</span>
       <FaChevronDown />
      </div>
     </div>
     <div className='flex items-center gap-4'>
      <div className='hidden md:block'>
       <input
        type='search'
        placeholder='Buscar'
        className='w-64 rounded-md border border-gray-300 px-4 py-2 text-sm'
       />
      </div>
      <button
       type='button'
       className='ml-4 p-2 text-gray-400 hover:text-gray-500'
       aria-label='Notificaciones'
      >
       <FaBell />
      </button>
      <button
       type='button'
       className='ml-4 p-2 text-gray-400 hover:text-gray-500'
       aria-label='Perfil de usuario'
      >
       <FaUser />
      </button>
      <button
       onClick={handleLogout}
       disabled={isLoggingOut}
       className='px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed'
      >
       {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
      </button>
      <div className='flex items-center'>
       <picture
        className='flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
        aria-expanded='false'
        data-dropdown-toggle='dropdown-user'
       >
        <span className='sr-only'>Open user menu</span>
        <source srcSet={user?.avatarUrl ?? 'User'} type='image/webp' />
        <Image
         src={user?.avatarUrl ?? DefaultAvatar}
         alt={user?.fullName ?? 'User'}
         width={32}
         height={32}
         className='w-8 h-8 rounded-full text-gray-500'
        />
       </picture>
      </div>
     </div>
    </div>
   </div>
  </header>
 );
};
