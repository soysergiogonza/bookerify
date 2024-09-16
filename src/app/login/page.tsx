'use client';

import { signInWithGithub } from '@/core/use-cases/auth/sign-in-with-github';
import { useAuth } from '@/hooks';
import Link from 'next/link';
import { useState } from 'react';

const LoginForm = () => {
 const [error, setError] = useState<string | null>(null);
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const { loginWithGoogle, loginWithGithub, isLoggingIn } = useAuth();

 const handleSignIn = async () => {
  try {
   const { url } = await signInWithGithub();
   window.location.href = url;
  } catch (error) {
   console.error('Error during sign in:', error);
   setError('An error occurred during sign in. Please try again.');
  }
 };

 return (
  <div className='flex items-center justify-center min-h-screen bg-gray-900'>
   <div className='w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl'>
    <h2 className='text-3xl font-bold text-white'>Sign in to your account</h2>
    <form className='space-y-4'>
     <div className='space-y-2'>
      <label htmlFor='email' className='text-sm font-medium text-gray-300'>
       Your email
      </label>
      <input
       id='email'
       type='email'
       placeholder='name@company.com'
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
       required
      />
     </div>
     <div className='space-y-2'>
      <label htmlFor='password' className='text-sm font-medium text-gray-300'>
       Password
      </label>
      <input
       id='password'
       type='password'
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
       required
      />
     </div>
     <div className='flex items-center justify-between'>
      <div className='flex items-center space-x-2'>
       <input
        type='checkbox'
        /* id='remember'
        checked={rememberMe}
        onCheckedChange={(checked) => setRememberMe(checked as boolean)}*/
        className='border-gray-600 text-purple-600 focus:ring-purple-500'
       />
       <label htmlFor='remember' className='text-sm text-gray-300'>
        Remember me
       </label>
      </div>
      <Link href='/' className='text-sm text-purple-500 hover:underline'>
       Forgot password?
      </Link>
     </div>
     <button
      type='submit'
      className='w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg'
     >
      Sign in
     </button>
    </form>
    <div className='relative'>
     <div className='absolute inset-0 flex items-center'>
      <span className='w-full border-t border-gray-600' />
     </div>
     <div className='relative flex justify-center text-sm'>
      <span className='px-2 text-gray-400 bg-gray-800'>Or continue with</span>
     </div>
    </div>
    <div className='flex space-x-4'>
     <button
      type='button'
      className='flex-1 py-2 px-4 bg-white hover:bg-gray-200 focus:ring-gray-500 focus:ring-offset-gray-200 text-gray-900 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg'
      onClick={loginWithGoogle}
      disabled={isLoggingIn}
     >
      {/*<Mail className='w-5 h-5 mr-2' />*/}
      Google
     </button>
     <button
      type='button'
      className='flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg'
      onClick={loginWithGithub}
      disabled={isLoggingIn}
     >
      {/*<Github className='w-5 h-5 mr-2' />*/}
      GitHub
     </button>
    </div>
    <p className='text-sm text-center text-gray-400'>
     Don't have an account yet?{' '}
     <Link href='#' className='text-purple-500 hover:underline'>
      Sign up
     </Link>
    </p>
   </div>
  </div>
 );
};

export default LoginForm;
