'use client';

import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
 const { user, isLoading } = useAuth();
 const router = useRouter();

 useEffect(() => {
  if (!isLoading && !user) {
   router.replace('/login');
  }
 }, [user, isLoading, router]);

 if (isLoading) {
  return (
   <div className='flex items-center justify-center min-h-screen'>
    <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900' />
   </div>
  );
 }

 if (!user) {
  return null;
 }

 return <>{children}</>;
}; 