import { supabase } from '@/infrastructure/database/supabase/client';

type ActivityType = 
  | 'update_name'
  | 'update_role'
  | 'update_permissions'
  | 'login'
  | 'logout'
  | 'password_change'
  | 'profile_update';

export const logUserActivity = async (
  userId: string,
  actionType: ActivityType,
  description: string
) => {
  try {
    const { error } = await supabase.rpc('log_user_activity', {
      p_user_id: userId,
      p_action_type: actionType,
      p_description: description,
      p_user_agent: navigator.userAgent
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error al registrar actividad:', error);
  }
}; 