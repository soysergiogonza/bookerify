import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/infrastructure/database/supabase/client';

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useUserMutation = () => {
  return useMutation({
    mutationFn: async (userData: any) => {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert(userData)
        .single();

      if (error) throw error;
      return data;
    },
  });
};

export const useUserQuery = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, newName }: { userId: string; newName: string }) => {
      const { error: rpcError } = await supabase.rpc('update_user_name', {
        user_id: userId,
        new_name: newName.trim()
      });

      if (rpcError) throw rpcError;

      return supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
    },
    onSuccess: (_, variables) => {
      // Invalidar el query del usuario específico
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
    },
  });
};

interface UserSettings {
  notifications_enabled?: boolean;
  language?: string;
  theme?: string;
  timezone?: string;
}

export const useUserSettingsMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, settings }: { userId: string; settings: UserSettings }) => {
      const { data, error } = await supabase
        .from('user_settings')
        .upsert({ 
          user_id: userId,
          ...settings,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['userSettings', variables.userId] });
    },
  });
};

export const useUserSettingsQuery = (userId: string) => {
  return useQuery({
    queryKey: ['userSettings', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || {
        notifications_enabled: true,
        language: 'es',
        theme: 'light',
        timezone: 'America/Bogota'
      };
    },
  });
}; 