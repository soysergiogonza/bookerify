'use client';

import { useUserRole } from '@/hooks/useUserRole';
import { redirect } from 'next/navigation';

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, loading } = useUserRole();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAdmin) {
    redirect('/dashboard');
  }

  return <>{children}</>;
};
