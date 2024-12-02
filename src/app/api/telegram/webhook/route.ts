import { NextResponse } from 'next/server';
import { saveTelegramMessage } from '@/infrastructure/services/telegram/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('🔵 Webhook received:', JSON.stringify(body, null, 2));

    if (!body.message?.text) {
      console.log('⚠️ No message text found in webhook');
      return NextResponse.json({ ok: true });
    }

    // Guarda el mensaje en la base de datos
    const messageData = {
      chat_id: body.message.chat.id.toString(),
      text: body.message.text,
      from_user: body.message.from.username || body.message.from.first_name || 'telegram_user'
    };

    console.log('🟢 Attempting to save message:', JSON.stringify(messageData, null, 2));
    
    try {
      const result = await saveTelegramMessage(messageData);
      console.log('✅ Message saved successfully:', JSON.stringify(result, null, 2));
      return NextResponse.json({ ok: true });
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      return NextResponse.json({ ok: true });
    }
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    return NextResponse.json({ ok: true });
  }
}

export async function GET(req: Request) {
  return NextResponse.json({ ok: true, message: 'Webhook endpoint is working' });
} 