'use client';

import { useUserQuery, useUpdateUserMutation } from '@/store/queries/users';
import { useRouter } from 'next/navigation';
import { FaChevronLeft, FaUser, FaKey, FaHistory, FaCog } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Tabs } from '@/components/ui/Tabs';
import { PasswordChangeForm } from '@/components/dashboard/PasswordChangeForm';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/Badge';

interface UserFormData {
  name: string;
  lastname: string;
  second_lastname: string;
  email: string;
  role_name: string;
  is_active: boolean;
  new_password?: string;
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
  console.log('ID del usuario:', params.id);
  const { data: user, isLoading, error } = useUserQuery(params.id);
  
  // Agregar logs para depuración
  console.log('Estado de carga:', isLoading);
  console.log('Error:', error);
  console.log('Datos del usuario:', user);

  const router = useRouter();
  const updateUserMutation = useUpdateUserMutation();
  const [activeTab, setActiveTab] = useState('general');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    lastname: '',
    second_lastname: '',
    email: '',
    role_name: 'guest',
    is_active: true,
    new_password: '',
  });
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: <FaUser className="mr-2" /> },
    { id: 'permisos', label: 'Permisos', icon: <FaKey className="mr-2" /> },
    { id: 'actividad', label: 'Actividad', icon: <FaHistory className="mr-2" /> },
    { id: 'configuracion', label: 'Configuración', icon: <FaCog className="mr-2" /> },
  ];

  useEffect(() => {
    if (user) {
      console.log('Estableciendo datos del formulario:', user);
      setFormData({
        name: user.name || '',
        lastname: user.lastname || '',
        second_lastname: user.second_lastname || '',
        email: user.email || '',
        role_name: user.role_name || 'guest',
        is_active: user.is_active ?? true,
        new_password: ''
      });
      setHasChanges(false);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setHasChanges(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enviando datos:', formData);

    try {
      await updateUserMutation.mutateAsync({
        userId: params.id,
        data: formData
      });
      setHasChanges(false);
    } catch (error) {
      console.error('Error en el submit:', error);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        lastname: user.lastname || '',
        second_lastname: user.second_lastname || '',
        email: user.email || '',
        role_name: user.role_name || 'guest',
        is_active: user.is_active ?? true,
        new_password: '',
      });
      setHasChanges(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>;
  }

  const fullName = [formData.name, formData.lastname, formData.second_lastname]
    .filter(Boolean)
    .join(' ') || 'Usuario sin nombre';

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <button 
          onClick={() => router.push('/dashboard/users')}
          className="flex items-center hover:text-blue-600"
        >
          <FaChevronLeft className="mr-1" /> Usuarios
        </button>
        <span>/</span>
        <span className="text-gray-900">{fullName}</span>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Tabs 
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        
        <div className="p-6">
          {activeTab === 'general' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rol
                    <Badge 
                      variant={formData.role_name === 'admin' ? 'blue' : 'gray'}
                      className="ml-2"
                    >
                      {formData.role_name}
                    </Badge>
                  </label>
                  <select
                    name="role_name"
                    value={formData.role_name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                  >
                    <option value="client">Cliente</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                    placeholder="Ingrese nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Primer Apellido</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                    placeholder="Ingrese primer apellido"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Segundo Apellido</label>
                  <input
                    type="text"
                    name="second_lastname"
                    value={formData.second_lastname || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                    placeholder="Ingrese segundo apellido"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
                  <input
                    type="password"
                    name="new_password"
                    value={formData.new_password || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                    placeholder="Dejar vacío para mantener la actual"
                  />
                </div>

                <div className="col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Usuario activo</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                {hasChanges && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!hasChanges || updateUserMutation.isPending}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {updateUserMutation.isPending ? 'Actualizando...' : 'Actualizar'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {showPasswordForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Cambiar Contraseña</h2>
              <button
                onClick={() => setShowPasswordForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <PasswordChangeForm 
              userId={params.id}
              userRole={formData.role_name}
              onClose={() => setShowPasswordForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}