interface SetupBotParams {
  userId: string;
  botToken: string;
}

export const setupTelegramBot = async ({ userId, botToken }: SetupBotParams) => {
  // Validar el token con la API de Telegram
  const response = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
  const data = await response.json();

  if (!data.ok) {
    throw new Error('Token de bot inválido');
  }

  // Guardar la configuración en Supabase
  const { error } = await supabase
    .from('telegram_config')
    .upsert({
      user_id: userId,
      bot_token: botToken,
      bot_username: data.result.username,
      is_active: true,
      created_at: new Date().toISOString()
    });

  if (error) throw error;

  // Registrar la actividad
  await supabase.from('user_activity').insert({
    user_id: userId,
    action_type: 'BOT_SETUP',
    description: `Bot de Telegram configurado: @${data.result.username}`,
  });

  return data.result;
}; 