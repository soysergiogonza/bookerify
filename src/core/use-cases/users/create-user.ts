import { supabase } from '@/infrastructure/database/supabase/client';

interface CreateUserParams {
  email: string;
  password: string;
  name: string;
}

export const createUser = async ({ email, password, name }: CreateUserParams) => {
  const { data: { user }, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (signUpError) throw signUpError;
  if (!user?.id) throw new Error('No se pudo crear el usuario');

  const { data: roleData, error: roleError } = await supabase
    .from('roles')
    .select('id')
    .eq('name', 'guest')
    .single();

  if (roleError) throw roleError;
  if (!roleData) throw new Error('No se encontró el rol de invitado');

  const { error: assignRoleError } = await supabase
    .from('role_users')
    .insert({
      user_id: user.id,
      role_id: roleData.id
    });

  if (assignRoleError) throw assignRoleError;

  return user;
}; 