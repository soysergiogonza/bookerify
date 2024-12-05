import { useEffect, useState } from 'react';
import { supabase } from '@/infrastructure/database/supabase/client';

interface RoleResponse {
  roles: {
    name: string;
  };
}

export const useUserRole = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('🔵 Sesión actual:', session?.user);
        
        if (!session?.user?.id) {
          console.log('No hay sesión de usuario');
          return;
        }

        const { data, error } = await supabase
          .from('user_profiles')
          .select('role_name')
          .eq('id', session.user.id)
          .single();

        console.log('🟢 Datos del rol:', data);
        
        if (error) {
          console.error('🔴 Error al obtener rol:', error);
          throw error;
        }

        const roleName = data?.role_name || '';
        console.log('🟣 Nombre del rol:', roleName);
        
        setUserRole(roleName);
        setIsAdmin(roleName === 'admin');
      } catch (error) {
        console.error('❌ Error checking role:', error);
        setIsAdmin(false);
        setUserRole('');
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, []);

  return { isAdmin, loading, userRole };
}; 