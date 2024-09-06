import { PricingCard } from '@/sections/PricingCard';
import type { EmblaOptionsType } from 'embla-carousel';
import Link from 'next/link';
import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { FaRegCircleCheck } from 'react-icons/fa6';

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export const PricingPlans = () => {
 return (
  <section className='px-4 md:px-8 flex items-center'>
   <div className='max-w-6xl mx-auto'>
    <div className='grid md:grid-cols-2 gap-8 items-center'>
     <div className='backdrop-blur-md bg-white bg-opacity-20 p-8 rounded-2xl shadow-lg bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400'>
      <h2 className='text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600'>
       Precios
      </h2>
      <p className='text-gray-700 mb-8'>
       Revisa todas las opciones que tenemos para ti y elige la que mejor se
       adapte a tus necesidades y a las de tu negocio.
      </p>
      <div className='bg-white p-8 rounded-lg shadow-md bg-gradient-to-br from-white to-purple-50'>
       <h3 className='text-3xl font-bold mb-4 text-gray-800'>
        Charlemos sobre tu proyecto
       </h3>
       <Link
        href='/'
        className='bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg'
       >
        Agendar reunión
       </Link>
      </div>
     </div>
     {/* <div className='bg-gradient-to-br from-white to-blue-50 p-8 rounded-lg shadow-lg'>
      <h3 className='text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600'>
       Unlimited Services
      </h3>
      <p className='text-gray-700 mb-6'>
       Take a look at some of our recent projects to see how we've helped
       businesses like yours succeed online.
      </p>
      <ul className='space-y-4 mb-8'>
       {[...Array(6)].map((_, index) => (
        <li key={index} className='flex items-center'>
         <FaRegCircleCheck className='text-green-500 mr-2' />
         <span className='text-gray-700'>Unlimited requests</span>
        </li>
       ))}
      </ul>
      <div className='flex items-center justify-between'>
       <div className='text-4xl font-bold text-gray-800'>
        80.0000 COP{' '}
        <span className='text-xl text-gray-600 font-normal'>/mes</span>
       </div>
       <FaLongArrowAltRight
        className='text-blue-500 hover:text-indigo-600 transition-colors cursor-pointer'
        size={24}
       />
      </div>
     </div>*/}
     <PricingCard slides={SLIDES} options={OPTIONS} />
    </div>
   </div>
  </section>
 );
};
