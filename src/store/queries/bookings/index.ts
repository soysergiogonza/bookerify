import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/infrastructure/database/supabase/client';

export const useBookingsQuery = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Booking')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useBookingMutation = () => {
  return useMutation({
    mutationFn: async (bookingData: any) => {
      const { data, error } = await supabase
        .from('Booking')
        .insert(bookingData)
        .single();

      if (error) throw error;
      return data;
    },
  });
}; 