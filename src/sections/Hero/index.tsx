import { EmblaCarousel } from '@/components/Carousel';
import type { EmblaOptionsType } from 'embla-carousel';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = [
 {
  title: 'Restaurantes',
  img: '/assets/images/restaurant.jpg',
 },
 {
  title: 'Hoteles',
  img: '/assets/images/hotels.jpg',
 },
 {
  title: 'Barberías',
  img: '/assets/images/barbershop.jpg',
 },
 {
  title: 'SPA',
  img: '/assets/images/spa.jpg',
 },
];
export const Hero = () => {
 return (
  <section className='flex flex-col items-center w-3/4 m-auto py-24'>
   <div
    className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
    aria-hidden='true'
   >
    <div
     className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#008080] to-[#008080] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
     style={{
      clipPath:
       'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
     }}
    />
   </div>
   <div className='fancy-button relative py-[.2rem] px-[1rem] rounded-full w-fit shadow-[0_35px_60px_-15px_rgba(0,0,0,1)]'>
    <div className='fancy after:rounded-full after:absolute after:inset-[2px] before:absolute after:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500' />
    <span className='relative flex items-center gap-4 text text-sm text-white font-bold'>
     SaaS Potenciado IA
     <MdKeyboardDoubleArrowRight />
    </span>
   </div>
   <h1 className='text-3xl font-bold tracking-tight text-white md:text-8xl text-center'>
    <span className='relative whitespace-nowrap font-alliance'>
     <svg
      aria-hidden='true'
      viewBox='0 0 418 42'
      className='absolute left-0 top-2/3 fill-teal-500'
      preserveAspectRatio='xMidYMid meet'
     >
      <path
       d='M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203'
       className='animate-draw stroke-orange-600'
       strokeWidth='6'
       fill='none'
      />
     </svg>
     <span className='relative font-alliance bg-gradient-to-r from-orange-600 via-orange-500 to-indigo-400 inline-block text-transparent bg-clip-text'>
      Gestiona
     </span>
    </span>
    <span> tus reservas, simplifica tu negocio.</span>
   </h1>
   <div
    className='absolute inset-x-0 top-32 left-2/4 -z-10 transform-gpu overflow-hidden blur-3xl'
    aria-hidden='true'
   >
    <div
     className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#008080] to-blue-400 opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
     style={{
      clipPath:
       'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
     }}
    />
   </div>
   <style jsx>{`
             @keyframes draw {
                 to {
                     stroke-dashoffset: 0;
                 }
             }

             .animate-draw {
                 stroke-dasharray: 1000;
                 stroke-dashoffset: 1000;
                 animation: draw 2s ease-in-out forwards;
             }
         `}</style>
   <EmblaCarousel slides={SLIDES} options={OPTIONS} />
  </section>
 );
};
