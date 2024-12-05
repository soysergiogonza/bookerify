'use client';

import { useAuth } from '@/hooks/useAuth';
import { useLoginMutation } from '@/store/queries/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithEmail, isLoggingIn, user, isLoading } = useAuth();
  const { mutate: login, isPending: isLoggingInMutation } = useLoginMutation();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [isLoading, user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    login(
      {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      },
      {
        onSuccess: () => {
          router.push('/dashboard');
        },
        onError: (error) => {
          console.error('Error al iniciar sesión:', error);
        },
      }
    );
  };

  // ... resto del código ...
};
