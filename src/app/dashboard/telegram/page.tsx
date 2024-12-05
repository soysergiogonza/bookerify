'use client';

import { useTelegramQuery, useTelegramMutation } from '@/store/queries/telegram';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const TelegramPage = () => {
  const { data: messages, isLoading } = useTelegramQuery();
  const { mutate: sendMessage } = useTelegramMutation();
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await sendMessage({
        chatId: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID!,
        text: newMessage
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Error al enviar el mensaje');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Chat de Telegram</h1>
          
          {/* Mensajes */}
          <div className="h-[60vh] overflow-y-auto mb-4 space-y-4 border rounded-lg p-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
            ) : messages?.length === 0 ? (
              <div className="text-center text-gray-500">
                No hay mensajes aún
              </div>
            ) : (
              messages?.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-lg ${
                    msg.from_user === 'dashboard' 
                      ? 'bg-blue-100 ml-auto' 
                      : 'bg-green-100 mr-auto'  // Mensajes de Telegram en verde
                  } max-w-[80%]`}
                >
                  <p className="text-sm font-semibold text-gray-600">
                    {msg.from_user === 'dashboard' ? 'Tú' : msg.from_user}
                  </p>
                  <p className="text-gray-800">{msg.text}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(msg.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Formulario de envío */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 rounded-lg border-gray-300 shadow-sm"
              placeholder="Escribe un mensaje..."
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TelegramPage; 