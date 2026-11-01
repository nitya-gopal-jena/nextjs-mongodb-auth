'use client';

import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      toast.success(response.data.message || 'Login successful!');
      router.push('/profile');
    } catch (error: any) {
      toast.error(error.response.data.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8'>
      <div className='w-full max-w-sm rounded-lg border border-gray-200 bg-white p-7 shadow-sm'>
        <div className='mb-7'>
          <h1 className='text-2xl font-semibold text-gray-900'>{loading ? 'Processing' : 'Welcome back'}</h1>
          <p className='mt-1.5 text-sm text-gray-500'>Sign in to your account to continue.</p>
        </div>

        <form className='space-y-4'>
          <div>
            <label htmlFor='email' className='mb-1.5 block text-sm font-medium text-gray-700'>
              Email address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder='name@example.com'
              autoComplete='email'
              required
              className='w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            />
          </div>

          <div>
            <div className='mb-1.5 flex items-center justify-between'>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>

              <a href='/forgot-password' className='text-sm font-medium text-indigo-600 hover:text-indigo-700'>
                Forgot password?
              </a>
            </div>

            <input
              type='password'
              id='password'
              name='password'
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder='Enter your password'
              autoComplete='current-password'
              required
              className='w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            />
          </div>

          <button
            type='submit'
            onClick={onLogin}
            className='mt-2 w-full cursor-pointer rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            {buttonDisabled ? 'Fill the form' : 'Login'}
          </button>
        </form>

        <div className='mt-6 border-t border-gray-100 pt-5'>
          <p className='text-center text-sm text-gray-500'>
            Don't have an account?{' '}
            <a href='/signup' className='font-medium text-indigo-600 hover:text-indigo-700'>
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
