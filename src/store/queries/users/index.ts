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

// Query para obtener un usuario específico
export const useUserQuery = (id: string) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });
};

// Mutación para actualizar usuario
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: Partial<User> }) => {
      // 1. Validar datos antes de enviar
      const sanitizedData = {
        new_name: data.name?.trim() || '',
        new_lastname: data.lastname?.trim() || '',
        new_second_lastname: data.second_lastname?.trim() || ''
      };

      // 2. Validar que al menos hay un cambio
      if (!Object.values(sanitizedData).some(value => value !== '')) {
        throw new Error('No hay cambios para guardar');
      }

      // 3. Actualizar con manejo de errores mejorado
      try {
        const { error: nameError } = await supabase
          .rpc('update_user_name', {
            user_id: userId,
            ...sanitizedData
          });

        if (nameError) throw nameError;

        // 4. Obtener datos actualizados con retry
        const { data: updatedUser, error: fetchError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (fetchError) throw fetchError;
        if (!updatedUser) throw new Error('No se pudo obtener el usuario actualizado');
        
        return updatedUser;
      } catch (error) {
        // 5. Mejorar el mensaje de error
        const message = error instanceof Error ? error.message : 'Error al actualizar usuario';
        throw new Error(message);
      }
    },
    onSuccess: (updatedUser, variables) => {
      // 6. Optimistic update para UI más responsiva
      queryClient.setQueryData(userKeys.detail(variables.userId), updatedUser);
      
      // 7. Refresco controlado
      queryClient.resetQueries({ 
        queryKey: userKeys.all,
        exact: true 
      });

      toast.success('Usuario actualizado correctamente', {
        duration: 3000,
        position: 'top-right'
      });
    },
    onError: (error: Error) => {
      console.error('Error en la mutación:', error);
      toast.error(error.message, {
        duration: 5000,
        position: 'top-right'
      });
    },
    // 8. Configuración adicional
    retry: 1,
    retryDelay: 1000,
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