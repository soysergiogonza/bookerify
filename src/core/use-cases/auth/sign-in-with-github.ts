import { supabase } from "@/infrastructure/database/supabase/client";
import { getURL } from "./getURL";

export const signInWithGithub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: getURL(),
    }
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
