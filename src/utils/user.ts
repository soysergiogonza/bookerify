import type { NormalizedUser } from '@/types/auth/user';
import type { User } from '@supabase/supabase-js';

export const normalizeUser = (user: User | null): NormalizedUser | null => {
 if (!user) return null;

 const provider = user.app_metadata.provider;
 let fullName = user.user_metadata.full_name;
 let avatarUrl = user.user_metadata.avatar_url;

 if (provider === 'github') {
  fullName = user.user_metadata.full_name || user.user_metadata.name;
  avatarUrl = user.user_metadata.avatar_url;
 } else if (provider === 'google') {
  fullName = user.user_metadata.full_name;
  avatarUrl = user.user_metadata.picture;
 }

 return {
  id: user.id,
  email: user.email,
  fullName: fullName || null,
  avatarUrl: avatarUrl || null,
  provider: provider,
 };
};
