'use client';

import Logo from '@assets/Logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CiViewTable } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa';
import { FaHouseChimney } from 'react-icons/fa6';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { usePathname } from 'next/navigation';

export const Aside = () => {
 const sidebarRef = useRef<HTMLDivElement>(null);
 const toggleButtonRef = useRef<HTMLButtonElement>(null);
 const [sidebarOpen, setSidebarOpen] = useState(false);
 const pathname = usePathname();

 useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
   if (
       sidebarOpen &&
       sidebarRef.current &&
       !sidebarRef.current.contains(event.target as Node) &&
       toggleButtonRef.current &&
       !toggleButtonRef.current.contains(event.target as Node)
   ) {
    setSidebarOpen(false);
   }
  }

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
   document.removeEventListener('mousedown', handleClickOutside);
  };
 }, [sidebarOpen]);

 const isActive = (href: string) => {
  if (href === '/dashboard' && pathname === '/dashboard') return true;
  return pathname.startsWith(href) && href !== '/dashboard';
 };

 const getLinkClasses = (href: string) => {
  return `flex gap-2 items-center px-4 py-2 text-sm font-medium rounded-md ${
      isActive(href)
          ? 'text-white bg-gray-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
  }`;
 };

 return (
     <aside
         ref={sidebarRef}
         className={`
             left-16  w-64 bg-white shadow-lg rounded-r-3xl
            transition-transform duration-300 ease-in-out
            md:translate-x-0 md:rounded-3xl
            flex flex-col
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
     >
      <Link href='/' className='w-40 transition-all duration-300 ease-in-out mt-8'>
       <Image className='w-full' src={Logo} alt='Logo' width={50} height={50} />
      </Link>
      <div className='flex flex-col flex-start overflow-y-auto p-6'>
       <nav className='space-y-6'>
        <ul className='space-y-2 flex gap-4 flex-col'>
         <li>
          <Link
              href='/dashboard'
              className={getLinkClasses('/dashboard')}
          >
           <FaHouseChimney size={32}/>
           <span>Dashboard</span>
          </Link>
         </li>
         <li>
          <Link
              href='/dashboard/calendar'
              className={getLinkClasses('/dashboard/calendar')}
          >
           <FaUser size={32}/>
           <span>Agenda</span>
          </Link>
         </li>
         <li>
          <Link
              href='/dashboard/tables'
              className={getLinkClasses('/dashboard/tables')}
          >
           <CiViewTable size={32}/>
           <span>Tablas</span>
          </Link>
         </li>
         <li>
          <Link
              href='/dashboard/notifications'
              className={getLinkClasses('/dashboard/notifications')}
          >
           <HiOutlineInformationCircle size={32}/>
           <span>Notificaciones</span>
          </Link>
         </li>
         <li>
          <Link
              href='/dashboard/profile'
              className={getLinkClasses('/dashboard/profile')}
          >
           <FaUser size={32}/>
           <span>Perfil</span>
          </Link>
         </li>
        </ul>
       </nav>
      </div>
     </aside>
 );
};
