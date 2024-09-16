'use client';

import { signInWithGithub, signInWithGoogle } from '@/core/use-cases/auth';
import { supabase } from '@/infrastructure/database/supabase/client';
import type { NormalizedUser } from '@/types/auth/user';
import { normalizeUser } from '@/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchUser = async (): Promise<NormalizedUser | null> => {
 const {
  data: { user },
 } = await supabase.auth.getUser();
 return normalizeUser(user);
};

export const useAuth = () => {
 const queryClient = useQueryClient();

 const {
  data: user,
  isLoading,
  error,
 } = useQuery({
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
 const logout = async () => {
  await supabase.auth.signOut();
  await queryClient.resetQueries({ queryKey: ['user'] });
 };

 return {
  user,
  isLoading,
  error,
  loginWithGithub: () => loginWithGithubMutation.mutate(),
  loginWithGoogle: () => loginWithGoogleMutation.mutate(),
  isLoggingIn:
   loginWithGithubMutation.isPending || loginWithGoogleMutation.isPending,
  logout,
 };
};
