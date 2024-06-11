import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/config/ThemeProvider';
import { Header } from '@stories/components';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Bookerify',
	description: 'SaaS para la gestión de reservas',
	applicationName: 'Bookerify',
	icons: {
		icon: '/assets/images/favicon.svg',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
