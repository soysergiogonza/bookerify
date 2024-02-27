import {ReactNode} from 'react';

import type {Metadata} from 'next';

import {Inter} from 'next/font/google';

import './globals.css';
import {Header} from '@/components/common/Header';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
	title: 'Bookerify',
	description: 'Sistema de Reservas',
};

export default function RootLayout({
	                                   children,
                                   }: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="es">
		<body className={inter.className}>
		<Header/>
		{children}
		</body>
		</html>
	);
}
