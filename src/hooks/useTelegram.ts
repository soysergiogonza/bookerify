import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sendTelegramMessage, saveTelegramMessage } from '@/infrastructure/services/telegram/client';
import type { Database } from '@/types/supabase/database.types';
import { supabase } from '@/infrastructure/database/supabase/client';

type TelegramMessage = Database['public']['Tables']['telegram_messages']['Row'];

export const useTelegram = () => {
  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation({
    mutationFn: ({ chatId, text }: { chatId: string; text: string }) =>
      sendTelegramMessage(chatId, text),
    onSuccess: async (_, variables) => {
      await saveTelegramMessage({
        chat_id: variables.chatId,
        text: variables.text,
        from_user: 'dashboard',
      });
      await queryClient.invalidateQueries({ queryKey: ['telegram-messages'] });
    },
  });

  // Obtener mensajes de la base de datos
  const { data: messages, isLoading, error } = useQuery<TelegramMessage[]>({
    queryKey: ['telegram-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('telegram_messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        throw error;
      }

      return data;
    },
    refetchInterval: 3000,
    refetchOnWindowFocus: false,
    staleTime: 2000,
  });

  return {
    sendMessage: sendMessageMutation.mutateAsync,
    messages,
    isLoading,
    error,
  };
}; 