'use client';

import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/hooks';
import { supabase } from '@/infrastructure/database/supabase/client';
import { pages } from '@/libs/routes';
import Logo from '@assets/Logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';

export const RootHeader = () => {
 const [isScrolled, setIsScrolled] = useState(false);
 const { isLoggingIn } = useAuth();
 console.log({ isLoggingIn });

 useEffect(() => {
  const handleScroll = () => {
   setIsScrolled(window.scrollY > 100);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 const handleSignOut = async () => {
  await supabase.auth.signOut();
 };

 return (
  <header className='w-full bg-white fixed top-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out'>
   <div
    className={`overflow-hidden transition-all duration-300 ease-in-out ${isScrolled ? 'max-h-0' : 'max-h-20'}`}
   >
    <div className='container mx-auto px-4'>
     <div className='flex justify-between items-center h-20'>
      <div className='flex space-x-4'>
       <Link
        href='/'
        className={`w-40 transition-all duration-300 ease-in-out ${isScrolled ? 'opacity-100' : 'opacity-100'}`}
       >
        <Image
         className='w-full'
         src={Logo}
         alt='Logo'
         width={50}
         height={50}
        />
       </Link>
      </div>
      <div className='flex items-center space-x-4'>
       <button type='button' aria-label='Search'>
        <FiSearch className='w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors duration-200' />
       </button>
       <button type='button' aria-label='Shopping cart' className='relative'>
        <FiShoppingBag className='w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors duration-200' />
        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
         2
        </span>
       </button>
      </div>
     </div>
    </div>
   </div>

   <nav
    className={`bg-white transition-all duration-300 ease-in-out ${isScrolled ? 'shadow-md' : ''}`}
   >
    <div className='container mx-auto px-4'>
     <div className='flex justify-between items-center h-16'>
      <Link
       href='/'
       className={`w-40 transition-all duration-300 ease-in-out ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
      >
       <Image className='w-full' src={Logo} alt='Logo' width={50} height={50} />
      </Link>
      <div className='flex justify-center space-x-6'>
       {pages.map(({ url, name }) => (
        <NavLink key={name} url={url} name={name} />
       ))}
      </div>
      <div
       className={`w-40 transition-all duration-300 ease-in-out ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
      >
       <div className='flex justify-end items-center space-x-4'>
        <button
         type='button'
         aria-label='Search'
         className='text-gray-600 hover:text-gray-900'
        >
         <FiSearch className='w-5 h-5' />
        </button>
        <button
         type='button'
         aria-label='Shopping cart'
         className='text-gray-600 hover:text-gray-900 relative'
        >
         <FiShoppingBag className='w-5 h-5' />
         <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
          2
         </span>
        </button>
       </div>
      </div>
     </div>
    </div>
   </nav>
  </header>
 );
};
