import { supabase } from "@/infrastructure/database/supabase/client";

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error('No se encontró el usuario');
  }

  return data;
}; 