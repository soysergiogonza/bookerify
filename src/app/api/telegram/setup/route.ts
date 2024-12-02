import { NextResponse } from 'next/server';
import { telegramClient } from '@/infrastructure/services/telegram/client';

export async function GET(req: Request) {
  try {
    // En desarrollo, usa la URL de ngrok
    const webhookUrl = process.env.NODE_ENV === 'development'
      ? `${process.env.NGROK_URL}/api/telegram/webhook`
      : `${process.env.NEXT_PUBLIC_SITE_URL}/api/telegram/webhook`;

    // Primero eliminar cualquier webhook existente
    await telegramClient.post('/deleteWebhook');
    
    // Configurar el nuevo webhook
    const setResponse = await telegramClient.post('/setWebhook', {
      url: webhookUrl,
      allowed_updates: ['message'],
      drop_pending_updates: true
    });
    
    // Verificar la configuración
    const infoResponse = await telegramClient.get('/getWebhookInfo');
    
    return NextResponse.json({
      ok: true,
      webhook_url: webhookUrl,
      setup_response: setResponse.data,
      current_info: infoResponse.data
    });
  } catch (error) {
    console.error('Error setting up webhook:', error);
    return NextResponse.json({ 
      error: 'Error setting up webhook',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 