'use client';

import { useAuth } from '@/hooks';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { loginWithEmail, isLoggingIn, user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, router, isLoading]);

  if (isLoading || user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await loginWithEmail(email, password);
      if (!result?.user) {
        setError('Credenciales inválidas. Por favor, intente de nuevo.');
        return;
      }
    } catch (err) {
      setError('Credenciales inválidas. Por favor, intente de nuevo.');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900'>
      <div className='w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl'>
        <h2 className='text-3xl font-bold text-white'>Iniciar sesión</h2>
        
        {error && (
          <div className='bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
              Correo electrónico
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-300'>
              Contraseña
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            />
          </div>

          <button
            type='submit'
            disabled={isLoggingIn}
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoggingIn ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
