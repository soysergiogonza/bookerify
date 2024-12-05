import { useState } from 'react';
import { supabase } from '@/infrastructure/database/supabase/client';

interface UserUpdateData {
  full_name?: string;
  role_id?: string;
}

export const useUserUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (userId: string, updateData: UserUpdateData) => {
    setLoading(true);
    setError(null);
    
    try {
      if (updateData.full_name) {
        const { error: nameError } = await supabase
          .rpc('update_user_name', {
            user_id: userId,
            new_name: updateData.full_name.trim()
          });

        if (nameError) throw nameError;
      }

      if (updateData.role_id) {
        const { error: roleError } = await supabase
          .from('role_users')
          .update({ role_id: updateData.role_id })
          .eq('user_id', userId);

        if (roleError) throw roleError;
      }

      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar usuario';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
}; 