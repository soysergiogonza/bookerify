'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks';
import { toast } from 'sonner';
import { supabase } from '@/infrastructure/database/supabase/client';

export default function TelegramConfigPage() {
  const [botToken, setBotToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSetupBot = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Obtener el token de la sesión actual
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('No hay sesión activa');
      }

      const response = await fetch('/api/telegram/bot/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          botToken,
          userId: user?.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Error al configurar el bot');
      }

      toast.success(`Bot @${data.bot.username} configurado exitosamente`);
      setBotToken('');
    } catch (error) {
      console.error('Error detallado:', error);
      toast.error(error instanceof Error ? error.message : 'Error al configurar el bot');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Configuración del Bot de Telegram
        </h1>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Pasos para configurar tu bot:
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-600">
            <li>Abre Telegram y busca a @BotFather</li>
            <li>Envía el comando /newbot</li>
            <li>Sigue las instrucciones para crear tu bot</li>
            <li>Copia el token que te proporciona BotFather</li>
            <li>Pega el token en el formulario siguiente</li>
          </ol>
        </div>

        <form onSubmit={handleSetupBot} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Token del Bot
            </label>
            <input
              type="text"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ejemplo: 1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              El token debe ser proporcionado por @BotFather
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? 'Configurando...' : 'Configurar Bot'}
          </button>
        </form>
      </div>
    </div>
  );
} 