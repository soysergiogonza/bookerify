'use client';

import { usePathname } from 'next/navigation';
import { Footer } from '@/components/Footer';

export const FooterWrapper = () => {
 const pathname = usePathname();

 if (!pathname.startsWith('/dashboard')) {
  return <Footer />;
 }
};
