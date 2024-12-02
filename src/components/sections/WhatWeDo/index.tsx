import { features } from '../../../libs';

export const WhatWeDo = () => {
 return (
  <section className='relative py-24 px-4 overflow-hidden'>
   <div className='max-w-7xl mx-auto'>
    {/* Encabezado */}
    <div className='text-center mb-20'>
     <h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-6'>
      ¿Qué hacemos?
     </h2>
     <p className='text-gray-400 text-lg max-w-2xl mx-auto'>
      Transformamos la gestión de reservas con tecnología de vanguardia y soluciones inteligentes.
     </p>
    </div>

    {/* Grid de características */}
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
     {features.map((feature) => (
      <div
       key={feature.title}
       className='group relative bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 hover:bg-gray-800/70 transition-all duration-300'
      >
       {/* Icono */}
       <div className='w-12 h-12 mb-6 relative'>
        <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        <div className='relative z-10 w-full h-full flex items-center justify-center text-white'>
         <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='w-6 h-6'
         >
          <path d={feature.icon} />
         </svg>
        </div>
       </div>

       {/* Contenido */}
       <h3 className='text-xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-300'>
        {feature.title}
       </h3>
       <p className='text-gray-400 group-hover:text-gray-300 transition-colors duration-300'>
        {feature.description}
       </p>

       {/* Decoración de fondo */}
       <div className='absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </div>
     ))}
    </div>
   </div>
  </section>
 );
};
