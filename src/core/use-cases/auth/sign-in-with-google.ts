import { supabase } from '@/infrastructure/database/supabase/client';

export const signInWithGoogle = async () => {
 const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
   redirectTo: `${window.location.origin}/auth/callback`,
  },
 });

 if (error) {
  throw new Error(error.message);
 }

 return data;
};
