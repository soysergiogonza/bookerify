import { AppProvider } from '@/presentation/providers/AppProvider';
import '../globals.css';
import type { ReactNode } from 'react';

const Layout = ({
 children,
}: Readonly<{
 children: ReactNode;
}>) => {
 return (
  <AppProvider>
   <main className='flex-1 overflow-auto bg-[#1E2023] text-white flex-col'>
    {children}
   </main>
  </AppProvider>
 );
};

export default Layout;
