import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { HiArrowLongRight } from 'react-icons/hi2';
import { LiaCheckCircle } from 'react-icons/lia';

const plans = [
 {
  name: 'Bronce',
  price: '39.000 COP',
  features: [
   '1 usuario',
   '5GB de almacenamiento',
   'Soporte por email',
   'Acceso básico a la API',
   'Actualizaciones mensuales',
  ],
  color: 'from-amber-700 to-yellow-500',
 },
 {
  name: 'Plata',
  price: '59.000 COP',
  features: [
   '5 usuarios',
   '20GB de almacenamiento',
   'Soporte prioritario',
   'Acceso completo a la API',
   'Actualizaciones semanales',
  ],
  color: 'from-gray-400 to-gray-200',
 },
 {
  name: 'Oro',
  price: '99.000 COP',
  features: [
   'Usuarios ilimitados',
   '100GB de almacenamiento',
   'Soporte 24/7',
   'API personalizada',
   'Actualizaciones en tiempo real',
  ],
  color: 'from-yellow-500 to-yellow-300',
 },
];

export const PricingCard = () => {
 const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
 const [selectedIndex, setSelectedIndex] = useState(0);

 const scrollNext = useCallback(() => {
  if (emblaApi) emblaApi.scrollNext();
 }, [emblaApi]);

 const onSelect = useCallback(() => {
  if (!emblaApi) return;
  setSelectedIndex(emblaApi.selectedScrollSnap());
 }, [emblaApi]);

 useEffect(() => {
  if (!emblaApi) return;
  onSelect();
  emblaApi.on('select', onSelect);
  return () => {
   emblaApi.off('select', onSelect);
  };
 }, [emblaApi, onSelect]);

 return (
  <div className='max-w-md mx-auto'>
   <div className='overflow-hidden' ref={emblaRef}>
    <div className='flex'>
     {plans.map((plan, index) => (
      <div className='flex-[0_0_100%] min-w-0 relative' key={plan.name}>
       <div className='m-4 overflow-hidden rounded-2xl shadow-lg bg-white h-[600px] flex flex-col'>
        <div
         className={`bg-gradient-to-r ${plan.color} text-white p-8 relative`}
        >
         <h3 className='text-3xl font-bold mb-2'>{plan.name}</h3>
         <p className='text-5xl font-bold'>
          {plan.price}
          <span className='text-xl font-normal'>/mes</span>
         </p>
        </div>
        <div className='p-8'>
         <ul className='flex flex-col gap-8'>
          {plan.features.map((feature, i) => (
           <li key={i} className='flex items-center'>
            <LiaCheckCircle className='h-6 w-6 text-green-500 mr-3 flex-shrink-0' />
            <span className='text-gray-700 text-lg'>{feature}</span>
           </li>
          ))}
         </ul>
        </div>
        <div className='px-8 pb-8 mt-auto'>
         <Link
          href='/'
          className='w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
         >
          Seleccionar {plan.name}
         </Link>
        </div>
       </div>
       {index === selectedIndex && (
        <button
         type='button'
         className='absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
         onClick={scrollNext}
         aria-label='Siguiente plan'
        >
         <HiArrowLongRight className='h-8 w-8 text-blue-600' />
        </button>
       )}
      </div>
     ))}
    </div>
   </div>
  </div>
 );
};
