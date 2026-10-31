export default function SignupPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8'>
      <div className='w-full max-w-sm rounded-lg border border-gray-200 bg-white p-7 shadow-sm'>
        <div className='mb-7'>
          <h1 className='text-2xl font-semibold text-gray-900'>Create your account</h1>
          <p className='mt-1.5 text-sm text-gray-500'>Enter your details below to get started.</p>
        </div>

        <form className='space-y-4'>
          <div>
            <label htmlFor='username' className='mb-1.5 block text-sm font-medium text-gray-700'>
              Username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Your username'
              autoComplete='username'
              required
              className='w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            />
          </div>

          <div>
            <label htmlFor='email' className='mb-1.5 block text-sm font-medium text-gray-700'>
              Email address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='name@example.com'
              autoComplete='email'
              required
              className='w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            />
          </div>

          <div>
            <label htmlFor='password' className='mb-1.5 block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Create a password'
              autoComplete='new-password'
              required
              className='w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            />
          </div>

          <button
            type='submit'
            className='mt-2 w-full cursor-pointer rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Create account
          </button>
        </form>

        <div className='mt-6 border-t border-gray-100 pt-5'>
          <p className='text-center text-sm text-gray-500'>
            Already have an account?{' '}
            <a href='/login' className='font-medium text-indigo-600 hover:text-indigo-700'>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
