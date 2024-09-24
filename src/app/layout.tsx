import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { HeaderWrapper } from '@/components/HeaderWrapper';
import { AppProvider } from '@/presentation/providers/AppProvider';
import type { ReactNode } from 'react';
import { FooterWrapper } from '@/components/FooterWrapper';

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
     <div className="flex flex-col min-h-screen">
      <HeaderWrapper />
      <main className='flex-1 overflow-auto bg-gray-900 text-white'>
       {children}
      </main>
      <FooterWrapper />
     </div>
    </AppProvider>
   </body>
  </html>
 );
}
