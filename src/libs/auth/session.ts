import { type Session } from '@supabase/supabase-js';
import { supabase } from '@/infrastructure/database/supabase/client';

const SESSION_KEY = 'bookerify_session';

export const persistSession = async (session: Session) => {
  try {
    await supabase.auth.setSession(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  } catch (error) {
    console.error('Error al guardar la sesión:', error);
    return false;
  }
};

export const getPersistedSession = () => {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Error al recuperar la sesión:', error);
    return null;
  }
};

export const clearSession = async () => {
  try {
    await supabase.auth.signOut();
    localStorage.removeItem(SESSION_KEY);
    return true;
  } catch (error) {
    console.error('Error al limpiar la sesión:', error);
    return false;
  }
};

export const isSessionValid = () => {
  const session = getPersistedSession();
  if (!session) return false;
  
  const expirationTime = new Date(session.expires_at).getTime();
  const currentTime = new Date().getTime();
  
  return currentTime < expirationTime;
}; 