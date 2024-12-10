import { supabase } from '@/infrastructure/database/supabase/client';

interface CreateUserParams {
  email: string;
}

export const createUser = async ({ email }: CreateUserParams) => {
  const name = email.split('@')[0];

  const temporaryPassword = Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);

  const { data, error } = await supabase.auth.signUp({
    email,
    password: temporaryPassword,
    options: {
      data: { 
        full_name: name
      },
      emailRedirectTo: `${window.location.origin}/set-password`
    }
  });

  if (error) throw error;
  if (!data.user) throw new Error('No se pudo crear el usuario');

  return data.user;
}; 