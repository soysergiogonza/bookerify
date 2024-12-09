export const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client'
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

export const isAdmin = (role?: string): boolean => role === ROLES.ADMIN;
export const isClient = (role?: string): boolean => role === ROLES.CLIENT; 