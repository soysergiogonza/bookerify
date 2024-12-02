import { PricingCard } from '@/components/sections';
import Link from 'next/link';

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
     <PricingCard />
    </div>
   </div>
  </section>
 );
};
