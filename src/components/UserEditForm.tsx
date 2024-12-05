import { useState } from 'react';
import { useUserUpdate } from '@/hooks/useUserUpdate';

interface UserEditFormProps {
  userId: string;
  initialData: {
    full_name: string;
    role_id: string;
  };
}

export const UserEditForm = ({ userId, initialData }: UserEditFormProps) => {
  const [formData, setFormData] = useState(initialData);
  const { updateUser, loading, error } = useUserUpdate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser(userId, formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.full_name}
        onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
      />
      <select
        value={formData.role_id}
        onChange={(e) => setFormData(prev => ({ ...prev, role_id: e.target.value }))}
      >
        <option value="1">Admin</option>
        <option value="2">Usuario</option>
      </select>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Actualizando...' : 'Guardar cambios'}
      </button>
    </form>
  );
}; 