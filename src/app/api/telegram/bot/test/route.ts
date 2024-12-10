import { NextResponse } from 'next/server';
import { supabase } from '@/infrastructure/database/supabase/client';
import { telegramClient } from '@/infrastructure/services/telegram/client';

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    // Obtener configuración del bot
    const { data: botConfig, error: dbError } = await supabase
      .from('telegram_bots')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (dbError || !botConfig) {
      throw new Error('Bot no encontrado');
    }

    // Enviar mensaje de prueba
    const response = await telegramClient.post(`/bot${botConfig.bot_token}/sendMessage`, {
      chat_id: botConfig.bot_username,
      text: '¡Conexión exitosa! El bot está funcionando correctamente.'
    });

    if (!response.data.ok) {
      throw new Error('Error al enviar mensaje de prueba');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error testing bot:', error);
    return NextResponse.json({ 
      error: 'Error al probar el bot',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
} 