import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('This is just a frontend demo. Backend login logic is not implemented yet.');
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Log in to access your dashboard and manage your account."
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Email Address
          </label>
          <div className="mt-1">
            <input
              name="email"
              type="email"
              required
              className="appearance-none block w-full px-4 py-3 border border-neutral-200 rounded-lg shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 sm:text-sm transition-colors"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Password
          </label>
          <div className="mt-1">
            <input
              name="password"
              type="password"
              required
              className="appearance-none block w-full px-4 py-3 border border-neutral-200 rounded-lg shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 sm:text-sm transition-colors"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700 cursor-pointer">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link to="#" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-primary-900 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-900 transition-all transform hover:scale-[1.02]"
          >
            Log In
          </button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">
              New to Justice & Associates?
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/signup"
            className="font-medium text-accent-600 hover:text-accent-500 transition-colors"
          >
            Create an account
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
