'use client';

import type { Pages } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavLink.module.css';

export const NavLink = ({ name, url }: Pages) => {
 const pathname = usePathname();

 const isActive = url === '/' ? pathname === url : pathname.includes(url);

 return (
  <Link href={url} className={`${styles.link} ${isActive && styles.active}`}>
   {name}
  </Link>
 );
};
