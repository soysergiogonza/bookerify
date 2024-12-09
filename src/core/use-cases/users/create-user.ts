import { supabase } from '@/infrastructure/database/supabase/client';

interface CreateUserParams {
  email: string;
  password: string;
  name: string;
}

export const createUser = async ({ email, password, name }: CreateUserParams) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name }
    }
  });

  if (error) throw error;
  if (!data.user) throw new Error('No se pudo crear el usuario');

  return data.user;
}; 