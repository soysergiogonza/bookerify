import { EmblaCarousel } from '@/components/Carousel';
import { HeroSlides } from '@/data';
import type { EmblaOptionsType } from 'embla-carousel';
import Link from 'next/link';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const OPTIONS: EmblaOptionsType = { loop: true };

export const Hero = () => {
 return (
  <section className='relative min-h-screen flex items-center justify-center px-4'>
   {/* Fondo con efecto de gradiente animado */}
   <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
    <div className='absolute inset-0 bg-[url("/grid.svg")] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]'/>
   </div>

   <div className='relative z-10 max-w-5xl mx-auto text-center'>
    {/* Badge */}
    <div className='inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-gray-800 text-gray-300 ring-1 ring-inset ring-gray-700 mb-8 animate-bounce'>
     <span className='text-indigo-400'>Nuevo</span>
     <span className='mx-2'>•</span>
     <span>Sistema de Reservas Inteligente</span>
    </div>

    {/* Título Principal */}
    <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8'>
     <span className='block mb-4'>Gestiona tus reservas,</span>
     <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text'>
      simplifica tu negocio
     </span>
    </h1>

    {/* Descripción */}
    <p className='text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto'>
     Automatiza tus reservas, reduce las cancelaciones y aumenta tus ingresos con nuestro sistema potenciado por IA.
    </p>

    {/* Botones de Acción */}
    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
     <Link href='/register' 
       className='rounded-full px-8 py-4 text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-all'>
       Comenzar Gratis
     </Link>
     <Link href='/demo'
       className='rounded-full px-8 py-4 text-base font-semibold text-white bg-gray-800 hover:bg-gray-700 transition-all'>
       Ver Demo
     </Link>
    </div>

    {/* Métricas */}
    <div className='mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 text-center'>
     <div>
      <div className='text-4xl font-bold text-white mb-2'>2K+</div>
      <div className='text-gray-400'>Negocios Activos</div>
     </div>
     <div>
      <div className='text-4xl font-bold text-white mb-2'>98%</div>
      <div className='text-gray-400'>Satisfacción</div>
     </div>
     <div className='col-span-2 md:col-span-1'>
      <div className='text-4xl font-bold text-white mb-2'>24/7</div>
      <div className='text-gray-400'>Soporte</div>
     </div>
    </div>
   </div>
  </section>
 );
};
