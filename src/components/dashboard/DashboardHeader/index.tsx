'use client';

import { useAuth } from '@/hooks';
import DefaultAvatar from '@assets/icons/default-avatar.png';
import Image from 'next/image';
import { FaBell, FaChevronDown, FaUser } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';

export const DashboardHeader = () => {
 const { user } = useAuth();

 return (
  <header className='bg-white shadow-sm fixed w-full  h-16'>
   <div className='mx-auto px-4 sm:px-6 lg:px-8'>
    <div className='flex justify-between items-center py-4'>
     <div className='flex items-center'>
      <div className='flex items-center ml-4'>
       <span className='font-semibold text-xl text-gray-900'>Dashboard</span>
       <FaChevronDown />
      </div>
     </div>
     <div className='flex items-center'>
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
       type='button'
       className='ml-4 p-2 text-gray-400 hover:text-gray-50'
       aria-label='Configuración'
      >
       <IoSettings />
      </button>
      <button type='button'>
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
      </button>
     </div>
    </div>
   </div>
  </header>
 );
};
