import { pricing } from '@/libs/pricing';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { HiArrowLongRight } from 'react-icons/hi2';
import { LiaCheckCircle } from 'react-icons/lia';

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
     {pricing.map((plan, index) => (
      <div className='flex-[0_0_100%] min-w-0 relative' key={plan.name}>
       <div className='m-4 overflow-hidden rounded-2xl shadow-lg bg-white h-[600px] flex flex-col'>
        <div
         className={`bg-gradient-to-r ${plan.color} text-white p-8 relative`}
        >
         <h4>Ideal para {plan.optimal}</h4>
         <h3 className='text-3xl font-bold mb-2'>{plan.name}</h3>
         <p className='text-5xl font-bold'>
          {plan.price}
          <span className='text-xl font-normal'>/mes</span>
         </p>
        </div>
        <div className='p-8'>
         <ul className='flex flex-col gap-8'>
          {plan.features.map((feature) => (
           <li key={feature} className='flex items-center'>
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
          {plan.CTA}
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
