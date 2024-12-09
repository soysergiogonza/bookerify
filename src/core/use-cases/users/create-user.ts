import { supabase } from '@/infrastructure/database/supabase/client';

interface CreateUserParams {
  email: string;
  password: string;
  name: string;
}

export const createUser = async ({ email, password, name }: CreateUserParams) => {
  try {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (signUpError) {
      console.error('Error al crear usuario:', signUpError);
      throw new Error('Error al crear usuario: ' + signUpError.message);
    }

    if (!data.user) {
      throw new Error('No se pudo crear el usuario');
    }

    return data.user;
  } catch (error) {
    console.error('Error completo:', error);
    throw error;
  }
}; 