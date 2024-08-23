import type { Pages } from '@/types';

export const pages: Pages[] = [
 {
  name: 'Home',
  url: '/',
 },
 {
  name: 'Dashboard',
  url: '/dashboard',
 },
 {
  name: 'Iniciar Sesión',
  url: '/login',
 },
 {
  name: 'Registrarse',
  url: '/register',
 },
];

export const dashboardPages: Pages[] = [
 {
  name: 'Sign Out',
  url: '/signout',
 },
];
