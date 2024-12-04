import { useEffect, useState } from 'react';
import { supabase } from '@/infrastructure/database/supabase/client';

interface RoleResponse {
  roles: {
    name: string;
  }[];
}

export const useUserRole = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user?.id) throw new Error('No user session');

        const { data, error } = await supabase
          .from('role_users')
          .select(`
            roles:role_id (
              name
            )
          `)
          .eq('user_id', session.user.id)
          .single();

        if (error) throw error;
        
        const roleName = (data as RoleResponse)?.roles?.[0]?.name || '';
        setUserRole(roleName);
        setIsAdmin(roleName === 'admin');
      } catch (error) {
        console.error('Error checking role:', error);
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