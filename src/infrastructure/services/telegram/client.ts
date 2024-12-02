import axios from 'axios';
import { supabase } from '@/infrastructure/database/supabase/client';
import type { Database } from '@/types/supabase/database.types';

type TelegramMessageInsert = Database['public']['Tables']['telegram_messages']['Insert'];

const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}`;

export const telegramClient = axios.create({
  baseURL: TELEGRAM_API_URL
});

export const sendTelegramMessage = async (chatId: string, text: string) => {
  try {
    const response = await telegramClient.post('/sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'HTML'
    });
    return response.data;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
};

export const saveTelegramMessage = async (message: Omit<TelegramMessageInsert, 'created_at'>) => {
  console.log(' Saving message to Supabase:', message);
  
  const { data, error } = await supabase
    .from('telegram_messages')
    .insert([message])
    .select('*')
    .single();

  if (error) {
    console.error('❌ Error saving to Supabase:', error);
    throw error;
  }
  
  console.log('✅ Message saved successfully:', data);
  return data;
};

// Función para verificar el estado del webhook
export const getWebhookInfo = async () => {
  try {
    const response = await telegramClient.get('/getWebhookInfo');
    return response.data;
  } catch (error) {
    console.error('Error getting webhook info:', error);
    throw error;
  }
}; 