'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface User {
  username: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get('/api/users/me');
        if (response.data.success && response.data.user) {
          setUser(response.data.user);
        } else {
          router.replace('/login');
        }
      } catch (error) {
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, [router]);

  const Logout = async () => {
    try {
      const response = await axios.get('/api/users/logout');
      toast.success(response.data.message || 'Logout successful');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (loading) {
    return (
      <main className='min-h-screen flex items-center justify-center bg-gray-50'>
        <p className='text-sm text-gray-500'>Loading profile...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className='min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-lg bg-white border border-gray-200 rounded-xl shadow-sm'>
        <div className='px-8 pt-8 pb-6 text-center border-b border-gray-100'>
          <div className='mx-auto mb-4 h-20 w-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-semibold'>
            {user.username.charAt(0).toUpperCase()}
          </div>

          <h1 className='text-2xl font-semibold text-gray-900'>My Profile</h1>

          <p className='mt-2 text-sm text-gray-500'>Your personal account details</p>
        </div>


        <div className='px-8 py-7'>
          <h2 className='text-sm font-semibold text-gray-900 mb-5'>Account Information</h2>

          <div className='space-y-5'>
            <div>
              <label className='block text-sm text-gray-500 mb-2'>Username</label>

              <div className='rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-800'>{user.username}</div>
            </div>

            <div>
              <label className='block text-sm text-gray-500 mb-2'>Email Address</label>

              <div className='rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-800'>{user.email}</div>
            </div>
          </div>

          <button
            type='button'
            onClick={Logout}
            className='mt-8 w-full flex items-center justify-center cursor-pointer gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white py-3 px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
              <polyline points='16 17 21 12 16 7' />
              <line x1='21' x2='9' y1='12' y2='12' />
            </svg>
            Logout
          </button>
        </div>

        <div className='border-t border-gray-100 px-8 py-4 text-center'>
          <p className='text-xs text-gray-400'>Your account information is managed securely.</p>
        </div>
      </div>
    </main>
  );
}
