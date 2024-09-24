import { AppProvider } from '@/presentation/providers/AppProvider';
import '../globals.css';
import type { ReactNode } from 'react';
import { HeaderWrapper } from '@/components/HeaderWrapper';
import { Aside } from '@/components/dashboard';

const DashboardLayout = ({
                             children,
                         }: Readonly<{
    children: ReactNode;
}>) => {
    return (
        <AppProvider>
            <div className="flex flex-col min-h-screen bg-gray-100">
                <HeaderWrapper />
                    <div className='h-[calc(100dvh-5rem)] mt-16 bg-gray-100 flex gap-8 pt-6 pl-6 overscroll-none'>
                        <Aside/>
                        <main className='flex-1 overflow-auto p-6'>
                            {children}
                        </main>
                    </div>
                </div>
        </AppProvider>
);
};

export default DashboardLayout;
