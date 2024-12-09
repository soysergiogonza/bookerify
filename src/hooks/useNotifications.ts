import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/infrastructure/database/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  user_id: string;
}

export const useNotifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Notification[];
    },
    enabled: !!user?.id,
  });

  const { mutate: markAsRead } = useMutation({
    mutationFn: async (notificationId: string) => {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)
        .eq('user_id', user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', user?.id] });
    },
  });

  return {
    notifications,
    markAsRead,
  };
}; 