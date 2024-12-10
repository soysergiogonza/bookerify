'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks';
import { createUser } from '@/core/use-cases/users/create-user';
import { toast } from 'sonner';

interface UserFormProps {
  onSuccess?: () => void;
}

export const UserForm = ({ onSuccess }: UserFormProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const name = email.split('@')[0];
      
      await createUser({ 
        email, 
        name,
      });
      
      toast.success('Se ha enviado un correo de confirmación al usuario');
      
      setEmail('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al crear usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {isLoading ? 'Creando...' : 'Crear Usuario'}
      </button>
    </form>
  );
}; 