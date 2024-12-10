import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/infrastructure/database/supabase/service-client';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  console.log('🚀 Iniciando configuración del bot');
  
  try {
    const { botToken, userId } = await req.json();
    
    // Verificar la autenticación del usuario
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ 
        error: 'No autenticado',
        details: 'Token no proporcionado'
      }, { status: 401 });
    }

    // Verificar que el usuario existe y está activo
    const { data: user, error: userError } = await supabaseAdmin.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user.user) {
      return NextResponse.json({ 
        error: 'No autorizado',
        details: 'Usuario no válido'
      }, { status: 401 });
    }

    // Verificar que el userId coincide con el token
    if (user.user.id !== userId) {
      return NextResponse.json({ 
        error: 'No autorizado',
        details: 'Usuario no coincide'
      }, { status: 401 });
    }

    // Verificar bot con Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    const telegramData = await telegramResponse.json();

    if (!telegramData.ok) {
      return NextResponse.json({ 
        error: 'Token de bot inválido',
        details: telegramData.description 
      }, { status: 400 });
    }

    // Usar el cliente admin para la inserción
    const { data, error: dbError } = await supabaseAdmin
      .from('telegram_bots')
      .upsert({
        user_id: userId,
        bot_token: botToken,
        bot_username: telegramData.result.username,
        webhook_url: process.env.NEXT_PUBLIC_SITE_URL + '/api/telegram/webhook',
        is_active: true,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (dbError) {
      console.error('💾 Error de base de datos:', dbError);
      return NextResponse.json({ 
        error: 'Error al guardar en base de datos',
        details: dbError.message
      }, { status: 500 });
    }

    console.log('✅ Bot configurado exitosamente');
    return NextResponse.json({
      ok: true,
      bot: telegramData.result,
      config: data
    });

  } catch (error) {
    console.error('💥 Error general:', error);
    return NextResponse.json({ 
      error: 'Error al configurar el bot',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
} 