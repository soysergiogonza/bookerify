'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/infrastructure/database/supabase/client';

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        const handleAuthCallback = async () => {
            const { error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error durante la autenticación:', error);
                router.push('/login');
            } else {
                router.push('/dashboard');
            }
        };

        handleAuthCallback();
    }, [router]);

    return <div>Cargando...</div>; // Muestra algo mientras se procesa la autenticación
}
