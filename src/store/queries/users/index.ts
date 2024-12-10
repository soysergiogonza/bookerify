import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/infrastructure/database/supabase/client';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string | null;
  lastname: string | null;
  second_lastname: string | null;
  role_name: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

interface UpdateUserData {
  name?: string;
  lastname?: string;
  second_lastname?: string;
  role_name?: string;
  is_active?: boolean;
  new_password?: string;
}

// Definir keys constantes para las queries
export const userKeys = {
  all: ['users'] as const,
  detail: (id: string) => ['users', id] as const,
};

// Query para obtener todos los usuarios
export const useUsersQuery = () => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select(`
          id,
          email,
          name,
          lastname,
          second_lastname,
          role_name,
          is_verified,
          is_active,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    // Configuración adicional para mejor rendimiento
    staleTime: 1000 * 60, // 1 minuto
    cacheTime: 1000 * 60 * 5, // 5 minutos
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

// Query para obtener un usuario específico
export const useUserQuery = (userId: string) => {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60, // 1 minuto
  });
};

// Mutación para actualizar usuario
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: { 
      userId: string; 
      data: Partial<UserFormData> 
    }) => {
      console.log('Datos a actualizar:', data, 'ID:', userId); // Para debugging
      
      // Primero actualizamos
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update(data)
        .eq('id', userId);

      if (updateError) {
        console.error('Error de actualización:', updateError);
        throw new Error(updateError.message);
      }

      // Luego obtenemos los datos actualizados en una consulta separada
      const { data: updatedUser, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (fetchError) {
        console.error('Error al obtener usuario actualizado:', fetchError);
        throw new Error(fetchError.message);
      }

      return updatedUser;
    },
    onSuccess: (data, variables) => {
      // Invalidar y actualizar la caché
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users', variables.userId] });
      
      // Actualizar la caché inmediatamente
      queryClient.setQueryData(['users', variables.userId], data);
      
      toast.success('Usuario actualizado correctamente');
    },
    onError: (error: Error) => {
      console.error('Error al actualizar usuario:', error);
      toast.error('Error al actualizar el usuario: ' + error.message);
    }
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