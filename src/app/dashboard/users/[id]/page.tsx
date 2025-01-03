'use client';

import { useUserQuery, useUpdateUserMutation } from '@/store/queries/users';
import { useRouter } from 'next/navigation';
import { FaChevronLeft, FaUser, FaKey, FaHistory, FaCog } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Tabs } from '@/components/ui/Tabs';
import { PasswordChangeForm } from '@/components/dashboard/PasswordChangeForm';
import { Badge } from '@/components/ui/Badge';
import { GeneralTab } from '@/components/dashboard/UserTabs';
import { PermissionsTab } from '@/components/dashboard/UserTabs';
import { ActivityTab } from '@/components/dashboard/UserTabs';
import { SettingsTab } from '@/components/dashboard/UserTabs';
import { toast } from 'sonner';

interface UserFormData {
  name: string;
  lastname: string;
  second_lastname: string;
  email: string;
  is_active: boolean;
  new_password?: string;
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const { data: user, isLoading, error } = useUserQuery(params.id);
  const router = useRouter();
  const updateUserMutation = useUpdateUserMutation();
  const [activeTab, setActiveTab] = useState('general');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    lastname: '',
    second_lastname: '',
    email: '',
    is_active: true,
    new_password: '',
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Verificar si el usuario es admin
  const isAdminUser = user?.role_name === 'admin';

  // Definir todas las tabs
  const tabs = [
    { id: 'general', label: 'General', icon: <FaUser className="mr-2" /> },
    { id: 'permisos', label: 'Permisos', icon: <FaKey className="mr-2" /> },
    { id: 'actividad', label: 'Actividad', icon: <FaHistory className="mr-2" /> },
    { id: 'configuracion', label: 'Configuración', icon: <FaCog className="mr-2" /> }
  ];

  // Filtrar las tabs si es usuario admin
  const visibleTabs = isAdminUser 
    ? tabs.filter(tab => tab.id !== 'configuracion')
    : tabs;

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        lastname: user.lastname || '',
        second_lastname: user.second_lastname || '',
        email: user.email || '',
        is_active: user.is_active ?? true,
        new_password: ''
      });
      setHasChanges(false);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    setHasChanges(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validación básica
      if (!formData.name.trim()) {
        toast.error('El nombre es requerido');
        return;
      }

      // Crear objeto con solo los campos permitidos para actualización
      const { new_password, email, ...updateData } = formData;
      
      console.log('Enviando datos:', updateData);

      // Actualizar usuario
      await updateUserMutation.mutateAsync({
        userId: params.id,
        data: updateData
      });

      setHasChanges(false);
      setErrorMessage(null);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      toast.error(error instanceof Error 
        ? error.message 
        : 'Error al actualizar el usuario. Por favor, inténtalo de nuevo.'
      );
      setErrorMessage('Hubo un error al actualizar el usuario');
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        lastname: user.lastname || '',
        second_lastname: user.second_lastname || '',
        email: user.email || '',
        is_active: user.is_active ?? true,
        new_password: '',
      });
      setHasChanges(false);
      toast.info('Cambios descartados');
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
      <div className="flex items-center gap-3">
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
        
        <Badge 
          variant={user?.role_name === 'admin' ? 'blue' : 'green'}
          className="text-sm px-3 py-1"
        >
          {user?.role_name}
        </Badge>
      </div>

      {isAdminUser && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p className="font-bold">Nota:</p>
          <p>Los perfiles de administradores son de solo lectura y no pueden ser modificados.</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <Tabs 
          tabs={visibleTabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        
        <div className="p-6">
          {activeTab === 'general' && (
            <GeneralTab
              formData={formData}
              isAdminUser={isAdminUser}
              hasChanges={hasChanges}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              updateUserMutation={updateUserMutation}
              showUpdateButton={!isAdminUser}
            />
          )}
          {activeTab === 'permisos' && <PermissionsTab />}
          {activeTab === 'actividad' && <ActivityTab />}
          {activeTab === 'configuracion' && <SettingsTab />}
        </div>
      </div>

      {!isAdminUser && (
        <button
          onClick={() => setShowPasswordForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Cambiar Contraseña
        </button>
      )}

      {showPasswordForm && !isAdminUser && (
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
              userRole={user?.role_name}
              onClose={() => setShowPasswordForm(false)}
            />
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="text-red-500 text-sm">
          {errorMessage}
        </div>
      )}
    </div>
  );
}