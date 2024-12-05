import { useState } from 'react';
import { supabase } from '@/infrastructure/database/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { stringify } from 'csv-stringify/sync';

interface UserActivity {
  id: string;
  action_type: string;
  description: string;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

interface ActivityResponse {
  activities: UserActivity[];
  totalCount: number;
}

interface UseUserActivityProps {
  userId: string;
  pageSize?: number;
}

export const useUserActivity = ({ userId, pageSize = 10 }: UseUserActivityProps) => {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');

  const { data, isLoading, error, refetch } = useQuery<ActivityResponse>({
    queryKey: ['userActivity', userId, page, searchTerm, filterType],
    queryFn: async () => {
      let query = supabase
        .from('user_activity')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`description.ilike.%${searchTerm}%,action_type.ilike.%${searchTerm}%`);
      }

      if (filterType) {
        query = query.eq('action_type', filterType);
      }

      const { data, count, error } = await query
        .range(page * pageSize, (page + 1) * pageSize - 1);

      if (error) throw error;

      return {
        activities: data || [],
        totalCount: count || 0
      };
    }
  });

  const exportToCSV = async () => {
    try {
      const { data: allActivities, error } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const csvString = stringify(allActivities, {
        header: true,
        columns: {
          action_type: 'Tipo de Acción',
          description: 'Descripción',
          ip_address: 'Dirección IP',
          created_at: 'Fecha',
          user_agent: 'Navegador'
        }
      });

      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `actividad_usuario_${userId}_${new Date().toISOString()}.csv`;
      link.click();
    } catch (error) {
      console.error('Error al exportar CSV:', error);
    }
  };

  return {
    activities: data?.activities || [],
    totalCount: data?.totalCount || 0,
    isLoading,
    error,
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    refetch,
    exportToCSV,
    pageSize
  };
}; 