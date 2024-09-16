import Logo from '@assets/Logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CiViewTable } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa';
import { FaHouseChimney } from 'react-icons/fa6';
import { HiOutlineInformationCircle } from 'react-icons/hi';

export const Aside = () => {
 const sidebarRef = useRef<HTMLDivElement>(null);
 const toggleButtonRef = useRef<HTMLButtonElement>(null);
 const [sidebarOpen, setSidebarOpen] = useState(false);

 const toggleSidebar = () => {
  setSidebarOpen((prevState) => !prevState);
 };

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
   <div className='flex-1 overflow-y-auto p-6'>
    <Link href='/' className='w-40 transition-all duration-300 ease-in-out'>
     <Image className='w-full' src={Logo} alt='Logo' width={50} height={50} />
    </Link>
    <nav className='space-y-6'>
     <ul className='space-y-2'>
      <li>
       <Link
        href='#'
        className='flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md'
       >
        <FaHouseChimney size={32} />
        <span>Dashboard</span>
       </Link>
      </li>
      <li>
       <Link
        href='#'
        className='flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900'
       >
        <FaUser size={32} />
        <span>Perfil</span>
       </Link>
      </li>
      <li>
       <Link
        href='#'
        className='flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900'
       >
        <CiViewTable size={32} />
        <span>Tablas</span>
       </Link>
      </li>
      <li>
       <Link
        href='#'
        className='flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900'
       >
        <HiOutlineInformationCircle size={32} />
        <span> Notificaciones</span>
       </Link>
      </li>
     </ul>
    </nav>
   </div>
  </aside>
 );
};
