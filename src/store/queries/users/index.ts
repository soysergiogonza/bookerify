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

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
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
          created_at
        `);

      if (error) throw error;
      return data as User[];
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
      console.log('Consultando usuario con ID:', userId);
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')  // Temporalmente seleccionamos todas las columnas
        .eq('id', userId)
        .single();

      console.log('Respuesta de Supabase:', { data, error });

      if (error) {
        console.error('Error en la consulta:', error);
        throw error;
      }

      if (!data) {
        console.error('No se encontraron datos para el usuario');
        throw new Error('Usuario no encontrado');
      }

      return data as User;
    },
    retry: 1,
    enabled: !!userId, // Solo ejecuta la consulta si hay un userId
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: Partial<User> }) => {
      console.log('Intentando actualizar usuario:', { userId, data });

      // 1. Actualizar los metadatos del usuario en auth.users
      const { data: authUpdate, error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: data.name,
          lastname: data.lastname,
          second_lastname: data.second_lastname
        }
      });

      if (authError) {
        console.error('Error al actualizar metadatos:', authError);
        throw new Error(`Error al actualizar datos: ${authError.message}`);
      }

      console.log('Metadatos actualizados:', authUpdate);

      // 2. Si hay cambio de rol, actualizarlo en role_users
      if (data.role_name) {
        // Primero eliminamos el rol actual
        const { error: deleteError } = await supabase
          .from('role_users')
          .delete()
          .eq('user_id', userId);

        if (deleteError) {
          console.error('Error al eliminar rol anterior:', deleteError);
        }

        // Luego insertamos el nuevo rol
        const { data: roleData } = await supabase
          .from('roles')
          .select('id')
          .eq('name', data.role_name)
          .single();

        if (roleData) {
          const { error: roleError } = await supabase
            .from('role_users')
            .insert({
              user_id: userId,
              role_id: roleData.id
            });

          if (roleError) {
            console.error('Error al actualizar rol:', roleError);
            // No lanzamos el error para que no interrumpa la actualización del perfil
          }
        }
      }

      // 3. Obtener los datos actualizados
      const { data: updatedUser, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (fetchError) {
        console.error('Error al obtener datos actualizados:', fetchError);
        throw fetchError;
      }

      console.log('Usuario actualizado:', updatedUser);
      return updatedUser;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
      toast.success('Usuario actualizado correctamente');
    },
    onError: (error) => {
      // Solo mostramos el toast de error si no es el error del rol
      if (!error.message?.includes('Error al actualizar el rol')) {
        toast.error(error instanceof Error ? error.message : 'Error al actualizar el usuario');
      }
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