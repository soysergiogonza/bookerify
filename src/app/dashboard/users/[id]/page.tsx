'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/infrastructure/database/supabase/client';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaUser, FaKey, FaHistory, FaCog } from 'react-icons/fa';
import { useUserRole } from '@/hooks/useUserRole';
import { toast } from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { logUserActivity } from '@/utils/activity-logger';
import { useUserQuery, useUpdateUserMutation, useUserSettingsQuery, useUserSettingsMutation } from '@/store/queries/users';
import { BiGlobe } from 'react-icons/bi';
import { MdNotifications, MdLanguage } from 'react-icons/md';
import { FiMonitor } from 'react-icons/fi';

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  role_name: string | null;
  created_at: string;
}

interface UserPermissions {
  can_manage_users: boolean;
  can_view_reports: boolean;
  can_manage_bookings: boolean;
  can_configure_system: boolean;
}

interface HistoryUser {
  email: string;
}

interface RoleHistoryData {
  from_role: string | null;
  to_role: string;
  created_at: string;
  users: HistoryUser;
}

interface UserActivity {
  id: string;
  action_type: string;
  description: string;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

interface RoleHistoryResponse {
  id: string;
  from_role: string | null;
  to_role: string;
  changed_by: string;
  created_at: string;
  users: {
    email: string;
  }[];
}

interface RoleHistoryState {
  from: string;
  to: string;
  by: string;
  date: string;
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const { data: user, isLoading: userLoading } = useUserQuery(params.id);
  const updateNameMutation = useUpdateUserMutation();
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [permissions, setPermissions] = useState<UserPermissions>({
    can_manage_users: false,
    can_view_reports: false,
    can_manage_bookings: false,
    can_configure_system: false
  });
  const [roleHistory, setRoleHistory] = useState<Array<{
    from: string;
    to: string;
    by: string;
    date: string;
  }>>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [activityLoading, setActivityLoading] = useState(false);
  const router = useRouter();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const queryClient = useQueryClient();
  const { data: settings, isLoading: settingsLoading } = useUserSettingsQuery(params.id);
  const settingsMutation = useUserSettingsMutation();

  useEffect(() => {
    if (user?.name) {
      setNewName(user.name);
    }
  }, [user?.name]);

  const fetchPermissionsAndHistory = async () => {
    try {
      // Cargar permisos
      const { data: permissionsData, error: permissionsError } = await supabase
        .from('user_permissions')
        .select('*')
        .eq('user_id', params.id)
        .single();

      if (permissionsError && permissionsError.code !== 'PGRST116') {
        console.error('Error al cargar permisos:', permissionsError);
      } else {
        setPermissions(permissionsData || {
          can_manage_users: false,
          can_view_reports: false,
          can_manage_bookings: false,
          can_configure_system: false
        });
      }

      // Cargar historial
      const { data: historyData, error: historyError } = await supabase
        .from('role_history')
        .select(`
          id,
          from_role,
          to_role,
          changed_by,
          created_at,
          users:changed_by (
            email
          )
        `)
        .eq('user_id', params.id)
        .order('created_at', { ascending: false });

      if (historyError) {
        console.error('Error al cargar historial:', historyError);
      } else {
        const typedHistoryData = historyData as RoleHistoryResponse[];
        
        setRoleHistory(
          typedHistoryData.map((item): RoleHistoryState => ({
            from: item.from_role || 'Sin rol',
            to: item.to_role,
            by: item.users?.[0]?.email || 'Sistema',
            date: item.created_at
          }))
        );
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  const fetchUserActivity = async () => {
    setActivityLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', params.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error al cargar actividades:', error);
      toast.error('Error al cargar el historial de actividades');
    } finally {
      setActivityLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissionsAndHistory();
    fetchUserActivity();
  }, [params.id]);

  const handleNameUpdate = async () => {
    if (!newName.trim()) return;
    
    try {
      await updateNameMutation.mutateAsync({
        userId: params.id,
        newName: newName.trim()
      });
      
      toast.success('Nombre actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar nombre:', error);
      toast.error('Error al actualizar el nombre');
    }
  };

  const handleRoleChange = async (newRole: string) => {
    if (!isAdmin) return;
    
    try {
      const { error } = await supabase.rpc('update_user_role', {
        p_user_id: params.id,
        p_new_role: newRole,
        p_changed_by: (await supabase.auth.getUser()).data.user?.id
      });

      if (error) throw error;

      // Recargar datos
      await Promise.all([
        fetchPermissionsAndHistory()
      ]);

      toast.success('Rol actualizado correctamente');
    } catch (error) {
      console.error('Error al cambiar rol:', error);
      toast.error('Error al cambiar el rol');
    }
  };

  const handlePermissionChange = async (key: keyof UserPermissions, value: boolean) => {
    if (!isAdmin) return;

    try {
      const newPermissions = {
        ...permissions,
        [key]: value
      };

      const { error } = await supabase.rpc('update_user_permissions', {
        p_user_id: params.id,
        p_permissions: newPermissions
      });

      if (error) throw error;

      setPermissions(newPermissions);
      toast.success('Permisos actualizados correctamente');
    } catch (error) {
      console.error('Error al actualizar permiso:', error);
      toast.error('Error al actualizar el permiso');
    }
  };

  const handleSettingChange = async (key: string, value: any) => {
    try {
      await settingsMutation.mutateAsync({
        userId: params.id,
        settings: {
          ...settings,
          [key]: value,
        }
      });
      toast.success('Configuración actualizada');
    } catch (error) {
      console.error('Error al actualizar configuración:', error);
      toast.error('Error al actualizar la configuración');
    }
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <div className="mt-1 flex gap-2 items-center">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="block w-48 rounded-md text-gray-900 text-sm h-8 
                border border-gray-300 shadow-sm transition-all duration-200
                focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
                hover:border-gray-400 px-2.5"
              placeholder="Ingrese nombre"
            />
            <button
              onClick={handleNameUpdate}
              disabled={updateNameMutation.isPending || !newName.trim()}
              className={`inline-flex items-center px-3 h-8 border border-gray-300 text-sm font-medium rounded-md 
                ${updateNameMutation.isPending || !newName.trim()
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 bg-gray-50 hover:bg-gray-100'}`}
            >
              {updateNameMutation.isPending ? 'Actualizando...' : 'Actualizar'}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 text-gray-900">{user?.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rol</label>
          <p className="mt-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {user?.role_name || 'Sin rol'}
            </span>
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de Creación</label>
          <p className="mt-1 text-gray-900">
            {user?.created_at && new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );

  const renderPermissionsTab = () => (
    <div className="space-y-8">
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Rol del Usuario</h3>
        <div className="flex items-center gap-4">
          <select
            value={user?.role_name || ''}
            onChange={(e) => handleRoleChange(e.target.value)}
            disabled={!isAdmin}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3
              bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 
              focus:border-blue-500 text-sm disabled:bg-gray-100 
              disabled:cursor-not-allowed appearance-none text-black font-medium"
          >
            <option value="" disabled>Seleccione un rol</option>
            <option value="admin" className="py-2 text-black">Administrador</option>
            <option value="user" className="py-2 text-black">Usuario</option>
            <option value="guest" className="py-2 text-black">Invitado</option>
          </select>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Rol actual: <span className="font-medium capitalize">{user?.role_name || 'Sin rol'}</span>
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Permisos Específicos</h3>
        <div className="space-y-4">
          {Object.entries(permissions).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handlePermissionChange(key as keyof UserPermissions, e.target.checked)}
                disabled={!isAdmin}
                className="rounded border-gray-300 text-blue-600 shadow-sm 
                  focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Historial de Cambios</h3>
        <div className="space-y-4">
          {roleHistory.map((change, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {change.from} → {change.to}
                </p>
                <p className="text-xs text-gray-500">
                  Modificado por {change.by}
                </p>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(change.date).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-8">
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Historial de Actividad</h3>
          <div className="flex gap-2">
            <button
              onClick={fetchUserActivity}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
            >
              <FaHistory className="inline-block mr-1" /> Actualizar
            </button>
          </div>
        </div>

        {activityLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : activities.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No hay actividades registradas</p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between py-3 border-b border-gray-200 last:border-0"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {activity.action_type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(activity.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">{activity.description}</p>
                  <div className="mt-1 text-xs text-gray-500">
                    <span className="inline-block mr-3">IP: {activity.ip_address}</span>
                    <span className="inline-block">
                      {activity.user_agent.split(') ')[0]})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderConfigTab = () => {
    if (settingsLoading) {
      return (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Notificaciones */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MdNotifications className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Notificaciones</h3>
                <p className="text-sm text-gray-500">Gestiona tus preferencias de notificaciones</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings?.notifications_enabled}
                onChange={(e) => handleSettingChange('notifications_enabled', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Idioma */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <MdLanguage className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Idioma</h3>
              <p className="text-sm text-gray-500">Selecciona tu idioma preferido</p>
            </div>
          </div>
          <select
            value={settings?.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="pt">Português</option>
          </select>
        </div>

        {/* Tema */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FiMonitor className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Tema</h3>
              <p className="text-sm text-gray-500">Personaliza la apariencia de la aplicación</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {['light', 'dark', 'system'].map((theme) => (
              <button
                key={theme}
                onClick={() => handleSettingChange('theme', theme)}
                className={`p-4 rounded-lg border ${
                  settings?.theme === theme
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="capitalize text-sm font-medium">
                  {theme}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Zona Horaria */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BiGlobe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Zona Horaria</h3>
              <p className="text-sm text-gray-500">Configura tu zona horaria</p>
            </div>
          </div>
          <select
            value={settings?.timezone}
            onChange={(e) => handleSettingChange('timezone', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="America/Bogota">Bogotá (GMT-5)</option>
            <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
            <option value="America/Santiago">Santiago (GMT-4)</option>
            <option value="America/Buenos_Aires">Buenos Aires (GMT-3)</option>
            <option value="Europe/Madrid">Madrid (GMT+1)</option>
          </select>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralTab();
      case 'permisos':
        return renderPermissionsTab();
      case 'actividad':
        return renderActivityTab();
      case 'configuracion':
        return renderConfigTab();
      default:
        return null;
    }
  };

 if (userLoading || roleLoading) return <div>Cargando...</div>;
  if (!user) return <div>Usuario no encontrado</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          Perfil de {user.name || 'Usuario sin nombre'}
        </h1>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <nav className="-mb-4">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('general')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'general'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FaUser className="inline-block mr-2" /> General
              </button>
              <button
                onClick={() => setActiveTab('permisos')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'permisos'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FaKey className="inline-block mr-2" /> Permisos
              </button>
              <button
                onClick={() => setActiveTab('actividad')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'actividad'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FaHistory className="inline-block mr-2" /> Actividad
              </button>
              <button
                onClick={() => setActiveTab('configuracion')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'configuracion'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FaCog className="inline-block mr-2" /> Configuración
              </button>
            </div>
          </nav>
        </div>
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {updateError && (
        <p className="mt-1 text-sm text-red-600">{updateError}</p>
      )}
    </div>
  );
}