'use client';

import { signInWithGithub, signInWithGoogle, signInWithEmail } from '@/core/use-cases/auth';
import { supabase } from '@/infrastructure/database/supabase/client';
import type { NormalizedUser } from '@/types/auth/user';
import { normalizeUser } from '@/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
 const queryClient = useQueryClient();
 const router = useRouter();

 const fetchUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
   return {
    ...user,
    name: user.user_metadata?.name || 
          user.email?.split('@')[0] || // Fallback al nombre de usuario del email
          'Usuario',
   };
  }
  return null;
 };

 const { data: user, isLoading, error } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  staleTime: Number.POSITIVE_INFINITY,
 });

 const loginWithGithubMutation = useMutation({
  mutationFn: signInWithGithub,
  onSuccess: (data) => {
   window.location.href = data.url;
  },
  onError: (error) => {
   console.error('Error al iniciar sesión con GitHub:', error);
  },
 });

 const loginWithGoogleMutation = useMutation({
  mutationFn: signInWithGoogle,
  onSuccess: (data) => {},
  onError: (error) => {
   console.error('Error al iniciar sesión con Google:', error);
  },
 });

 const loginWithEmailMutation = useMutation({
  mutationFn: ({ email, password }: { email: string; password: string }) =>
    signInWithEmail(email, password),
  onSuccess: async (data) => {
   if (data.user) {
    await queryClient.invalidateQueries({ queryKey: ['user'] });
   } else {
    throw new Error('No se pudo iniciar sesión');
   }
  },
  onError: (error) => {
   console.error('Error al iniciar sesión:', error);
   throw error;
  },
 });

 const logout = async () => {
  try {
   await supabase.auth.signOut();
   queryClient.clear();
   await queryClient.invalidateQueries({ queryKey: ['user'] });
   queryClient.setQueryData(['user'], null);
   router.replace('/login');
  } catch (error) {
   console.error('Error during logout:', error);
  }
 };

 return {
  user,
  isLoading,
  error,
  loginWithGithub: () => loginWithGithubMutation.mutate(),
  loginWithGoogle: () => loginWithGoogleMutation.mutate(),
  loginWithEmail: async (email: string, password: string) => {
   try {
    const result = await loginWithEmailMutation.mutateAsync({ email, password });
    return result;
   } catch (error) {
    throw error;
   }
  },
  isLoggingIn: loginWithEmailMutation.isPending,
  logout,
 };
};
