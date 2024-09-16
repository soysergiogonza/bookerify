import type { ReactNode } from 'react';

const GlowingIcon = ({ children }: { children: ReactNode }) => (
 <div className='relative w-16 h-16 mb-4'>
  <div className='absolute inset-0 bg-blue-500 opacity-20 rounded-full blur-md' />
  <div className='relative flex items-center justify-center w-full h-full text-blue-300'>
   {children}
  </div>
 </div>
);

export const ServiceCard = ({
 icon,
 title,
 description,
}: { icon: ReactNode; title: string; description: string }) => (
 <div className='flex flex-col items-start p-6 rounded-lg border border-gray-700 bg-gray-800 bg-opacity-50'>
  <GlowingIcon>{icon}</GlowingIcon>
  <h3 className='text-xl font-semibold mb-2 text-white'>{title}</h3>
  <p className='text-gray-400'>{description}</p>
 </div>
);
