'use client';

import { useState } from 'react';
import { supabase } from '@/infrastructure/database/supabase/client';
import toast from 'react-hot-toast';
import { ROLES } from '@/lib/auth/roles';

interface UserEditFormProps {
  user: {
    id: string;
    email: string;
    name: string | null;
    role_name: string | null;
  };
  onClose: () => void;
  onSuccess: () => void;
}

export function UserEditForm({ user, onClose, onSuccess }: UserEditFormProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    lastname: user?.lastname || '',
    second_lastname: user?.second_lastname || '',
    email: user?.email || '',
    is_active: user?.is_active ?? true,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          disabled
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Rol del usuario
        </label>
        <div className="mt-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700">
          {user?.role_name === 'admin' ? 'Administrador' : 'Cliente'}
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </form>
  );
} 