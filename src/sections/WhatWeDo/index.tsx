import { features } from '@/libs';

const Icon = ({ d, title }: { d: string; title: string }) => (
 <svg
  xmlns='http://www.w3.org/2000/svg'
  width='24'
  height='24'
  viewBox='0 0 24 24'
  fill='none'
  stroke='currentColor'
  strokeWidth='2'
  strokeLinecap='round'
  strokeLinejoin='round'
  className='w-12 h-12 mb-4'
  aria-label={title}
 >
  <title>{title}</title>
  <path d={d} />
 </svg>
);

export const WhatWeDo = () => {
 return (
  <section className='py-20 bg-gray-900 text-white'>
   <div className='container mx-auto px-4'>
    <h2 className='text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600'>
     Que hacemos ?
    </h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
     {features.map((feature) => (
      <div
       key={feature.title}
       className={
        'relative overflow-hidden rounded-2xl p-8 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1'
       }
      >
       <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-75`}
       />
       <div className='relative z-10'>
        <Icon d={feature.icon} title={feature.title} />
        <h3 className='text-2xl font-bold mb-4'>{feature.title}</h3>
        <p className='text-gray-200'>{feature.description}</p>
       </div>
      </div>
     ))}
    </div>
   </div>
  </section>
 );
};
