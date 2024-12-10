import { createClient } from '@supabase/supabase-js';

// Este cliente usa el service_role key que tiene permisos especiales
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Necesitamos agregar esta variable de entorno
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
); 