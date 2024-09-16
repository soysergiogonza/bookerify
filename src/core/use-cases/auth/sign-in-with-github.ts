import { supabase } from "@/infrastructure/database/supabase/client";

export async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  if (!data.url) {
    throw new Error("No URL returned from Supabase");
  }

  return { url: data.url };
}
