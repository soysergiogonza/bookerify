import { NextResponse } from 'next/server';
import { telegramClient } from '@/infrastructure/services/telegram/client';

export async function GET() {
  try {
    const response = await telegramClient.get('/getWebhookInfo');
    return NextResponse.json({
      ok: true,
      webhook_info: response.data
    });
  } catch (error) {
    console.error('Error getting webhook info:', error);
    return NextResponse.json({ 
      error: 'Error getting webhook info',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 