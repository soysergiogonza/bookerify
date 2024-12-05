import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/infrastructure/database/supabase/client';

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuthQuery = () => {
    return useQuery({
      queryKey: ['auth-user'],
      queryFn: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;
        
        return {
          ...user,
          name: user.user_metadata?.name || 
                user.email?.split('@')[0] || 
                'Usuario',
        };
      },
      staleTime: Infinity,
    });
  };

  export const useLoginMutation = () => {
    return useMutation({
      mutationFn: async (credentials: LoginCredentials) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });
  
        if (error) {
          throw error;
        }
  
        return data;
      },
    });
  };