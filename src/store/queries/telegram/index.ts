import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/infrastructure/database/supabase/client';
import { sendTelegramMessage } from '@/infrastructure/services/telegram/client';

interface TelegramConfig {
  id: string;
  user_id: string;
  bot_token: string;
  bot_username: string;
  is_active: boolean;
  webhook_url: string | null;
  created_at: string;
  updated_at: string;
}

// Query keys
export const telegramKeys = {
  config: (userId: string) => ['telegram', 'config', userId] as const,
};

// Query para obtener la configuración del bot
export const useTelegramConfigQuery = (userId: string) => {
  return useQuery({
    queryKey: telegramKeys.config(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('telegram_config')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data as TelegramConfig;
    },
  });
};

// Mutation para actualizar la configuración
export const useUpdateTelegramConfigMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: Partial<TelegramConfig>) => {
      const { data, error } = await supabase
        .from('telegram_config')
        .upsert(config)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(telegramKeys.config(data.user_id));
    },
  });
};

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