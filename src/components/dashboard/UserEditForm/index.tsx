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

export const UserEditForm = ({ user, onClose, onSuccess }: UserEditFormProps) => {
  const [name, setName] = useState(user.name || '');
  const [role, setRole] = useState(user.role_name || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roleOptions = [
    { value: ROLES.CLIENT, label: 'Cliente' },
    { value: ROLES.ADMIN, label: 'Administrador' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Obtener el ID del rol
      const { data: roleData } = await supabase
        .from('roles')
        .select('id')
        .eq('name', role)
        .single();

      if (!roleData) throw new Error('Rol no encontrado');

      // Actualizar el rol del usuario
      const { error: roleError } = await supabase
        .from('role_users')
        .update({ role_id: roleData.id })
        .eq('user_id', user.id);

      if (roleError) {
        toast.error('Error al actualizar el rol');
        throw roleError;
      }
        
        toast.success('Usuario actualizado correctamente');
        onSuccess();
        onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          disabled
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Rol</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
        >
          {roleOptions.map(role => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
      </div>
      
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      
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
}; 