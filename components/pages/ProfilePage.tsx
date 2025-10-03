import React from 'react';
import { User } from '../../types';

interface ProfilePageProps {
  user: User;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">My Profile</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">Manage your personal information and settings.</p>
      </div>

      <div className="p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-6">
          <img src={`https://i.pravatar.cc/120?u=${user.name}`} alt="User Avatar" className="w-32 h-32 rounded-full border-4 border-brand-green" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
            <p className="text-lg text-brand-blue dark:text-brand-yellow">{user.role}</p>
          </div>
        </div>
        <div className="mt-8">
            <button className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};
