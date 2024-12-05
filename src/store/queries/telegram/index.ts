import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/infrastructure/database/supabase/client';
import { sendTelegramMessage } from '@/infrastructure/services/telegram/client';

export const useTelegramQuery = () => {
  return useQuery({
    queryKey: ['telegram-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('telegram_messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    },
    refetchInterval: 3000,
  });
};

export const useTelegramMutation = () => {
  return useMutation({
    mutationFn: async ({ chatId, text }: { chatId: string; text: string }) => {
      const result = await sendTelegramMessage(chatId, text);
      await supabase
        .from('telegram_messages')
        .insert({
          chat_id: chatId,
          text,
          from_user: 'dashboard',
        });
      return result;
    },
  });
}; 