import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/infrastructure/environments';
import type { Database } from '@/types/supabase/database.types';
import { createClient } from '@supabase/supabase-js';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
 throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
