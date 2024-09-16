'use client';

import { Aside } from '@/components/dashboard';
import { useAuth } from '@/hooks';

const DashboardPage = () => {
 const { user } = useAuth();

 return (
  <div className='h-[calc(100dvh-5rem)] mt-16 bg-gray-100 flex flex-col'>
   <main className='flex flex-1 gap-4  overflow-y-auto transition-all duration-300 py-4 pl-4'>
    <Aside />
    <div className='flex-1 font-semibold text-black overflow-scroll overflow-x-hidden p-6'>
     <h1 className='text-2xl font-semibold mb-4'>Bienvenido/a</h1>
     <div>
      <span>{user?.fullName}</span>
     </div>
    </div>
   </main>
  </div>
 );
};

export default DashboardPage;
