'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks';
import { setupTelegramBot } from '@/core/use-cases/telegram/setup-bot';
import { useTelegramConfigQuery, useUpdateTelegramConfigMutation } from '@/store/queries/telegram';
import { toast } from 'sonner';

export const TelegramSetup = () => {
  const [botToken, setBotToken] = useState('');
  const { user } = useAuth();
  const { data: config, isLoading: isLoadingConfig } = useTelegramConfigQuery(user?.id!);
  const updateConfig = useUpdateTelegramConfigMutation();

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const botInfo = await setupTelegramBot({
        userId: user!.id,
        botToken
      });
      
      await updateConfig.mutateAsync({
        user_id: user!.id,
        bot_token: botToken,
        bot_username: botInfo.username,
        is_active: true
      });
      
      toast.success('Bot configurado exitosamente');
      setBotToken('');
    } catch (error) {
      toast.error('Error al configurar el bot');
      console.error(error);
    }
  };

  if (isLoadingConfig) {
    return <div>Cargando configuración...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Configuración de Telegram</h2>
      
      {config && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Bot actual: @{config.bot_username}</p>
          <p className="text-sm text-gray-600">
            Estado: {config.is_active ? 'Activo' : 'Inactivo'}
          </p>
        </div>
      )}

      <form onSubmit={handleSetup} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Token del Bot
          </label>
          <input
            type="text"
            value={botToken}
            onChange={(e) => setBotToken(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Ingresa el token de tu bot"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Obtén el token de @BotFather en Telegram
          </p>
        </div>
        
        <button
          type="submit"
          disabled={updateConfig.isPending}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {updateConfig.isPending ? 'Configurando...' : 'Configurar Bot'}
        </button>
      </form>
    </div>
  );
}; 