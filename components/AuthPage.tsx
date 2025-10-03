
import React, { useState } from 'react';
import { UserRole } from '../types';

interface AuthPageProps {
  initialRole: UserRole;
  onLogin: (role: UserRole) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialRole, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-24 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/30 dark:bg-gray-800/50 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 dark:text-white">
            {isLogin ? `Welcome Back, ${selectedRole}` : `Create Your Account`}
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="role-select" className="sr-only">Role</label>
                <select
                  id="role-select"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-t-lg focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm"
                >
                  {Object.values(UserRole).map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="phone-number" className="sr-only">Phone Number</label>
                <input
                  id="phone-number"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 placeholder-gray-500 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm"
                  placeholder="MTN/Airtel Phone Number"
                />
              </div>
               {!isLogin && (
                 <div>
                    <label htmlFor="name" className="sr-only">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 placeholder-gray-500 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm"
                      placeholder="Full Name"
                    />
                 </div>
               )}
              <div>
                <label htmlFor="otp" className="sr-only">OTP Code</label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 placeholder-gray-500 text-gray-900 dark:text-gray-200 rounded-b-lg focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm"
                  placeholder="OTP Code"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-brand-blue to-brand-green hover:shadow-lg hover:shadow-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-all duration-300"
              >
                {isLogin ? 'Login with OTP' : 'Register with OTP'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-brand-blue hover:text-brand-green dark:text-brand-yellow dark:hover:text-yellow-300"
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
