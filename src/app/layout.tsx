import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
 title: 'Bookerify',
 description: 'Software de Reservas',
};

export default function RootLayout({
 children,
}: Readonly<{
 children: ReactNode;
}>) {
 return (
  <html lang='es'>
   <body className={inter.className}>
    <Header />
    {children}
   </body>
  </html>
 );
}
