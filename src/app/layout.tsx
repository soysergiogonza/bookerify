import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { HeaderWrapper } from '@/components/HeaderWrapper';
import { AppProvider } from '@/presentation/providers/AppProvider';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
 title: 'Bookerify',
 description: 'Software de Reservas',
 icons: {
  icon: '/assets/icons/favicon.svg',
 },
};

export default function RootLayout({
 children,
}: Readonly<{
 children: ReactNode;
}>) {
 return (
  <html lang='es'>
   <body className={inter.className}>
    <AppProvider>
     <HeaderWrapper />
     {children}
     {/*<Footer />*/}
    </AppProvider>
   </body>
  </html>
 );
}
