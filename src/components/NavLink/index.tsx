'use client';

import type { Pages } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavLink = ({ name, url }: Pages) => {
 const pathname = usePathname();

 const isActive = url === '/' ? pathname === url : pathname.includes(url);

 return (
  <Link
   href={url}
   className={`py-2 px-4 font-bold w-fit hover:text-orange-600 hover:bg-orange-200 transition duration-1000 ${isActive && 'border-b-4 border-orange-600 '}`}
  >
   {name}
  </Link>
 );
};
