'use client';

import { RootHeader } from '@/components/RootHeader';
import { DashboardHeader } from '@/components/dashboard';
import { usePathname } from 'next/navigation';

export const HeaderWrapper = () => {
 const pathname = usePathname();

 if (pathname.startsWith('/dashboard')) {
  return <DashboardHeader />;
 }

 return <RootHeader />;
};
