'use client';

import { useAuth } from '@/hooks';

const LoginForm = () => {

 const { loginWithGoogle, loginWithGithub, isLoggingIn } = useAuth();

 return (
  <div className='flex items-center justify-center min-h-screen bg-gray-900'>
   <div className='w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl'>
    <h2 className='text-3xl font-bold text-white'>Sign in to your account</h2>
    <div className='flex space-x-4'>
     <button
      type='button'
      className='flex-1 py-2 px-4 bg-white hover:bg-gray-200 focus:ring-gray-500 focus:ring-offset-gray-200 text-gray-900 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg'
      onClick={loginWithGoogle}
      disabled={isLoggingIn}
     >
      Google
     </button>
     <button
      type='button'
      className='flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg'
      onClick={loginWithGithub}
      disabled={isLoggingIn}
     >
      GitHub
     </button>
    </div>
   </div>
  </div>
 );
};

export default LoginForm;
