import React from 'react';
import { User } from '../../types';
// Fix: Imported UsersIcon component to be used in AchievementBadge.
import { BookOpenIcon, BriefcaseIcon, FireIcon, UsersIcon } from '../IconComponents';

interface ProfilePageProps {
  user: User;
}

const AchievementBadge: React.FC<{icon: React.ReactNode, label: string, color: string}> = ({icon, label, color}) => (
    <div className={`flex items-center space-x-2 p-3 rounded-full ${color}`}>
        {icon}
        <p className="text-sm font-semibold">{label}</p>
    </div>
);

export const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">My Profile</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">Manage your personal information and settings.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 relative">
                <div className="absolute inset-0 border-4 border-transparent rounded-2xl" style={{background: 'linear-gradient(to right, #1E90FF, #32CD32, #FFD700) border-box', WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'destination-out', maskComposite: 'exclude' }}></div>
                <div className="relative flex items-center space-x-6">
                    <img src={`https://i.pravatar.cc/120?u=${user.name}`} alt="User Avatar" className="w-32 h-32 rounded-full border-4 border-[#FFD700]" />
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                        <p className="text-lg text-[#1E90FF] dark:text-[#FFD700]">{user.role}</p>
                    </div>
                </div>
                <div className="relative mt-8">
                    <button className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#1E90FF] to-[#20B2AA] rounded-full hover:shadow-lg hover:shadow-teal-500/50">Edit Profile</button>
                </div>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">My Documents</h3>
                <ul className="space-y-3">
                    <li className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-900/50 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors">
                        <span className="font-medium">Curriculum_Vitae_Gisa.pdf</span>
                        <a href="#" className="text-sm text-[#1E90FF] hover:underline">View</a>
                    </li>
                     <li className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-900/50 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors">
                        <span className="font-medium">University_Diploma.pdf</span>
                        <a href="#" className="text-sm text-[#1E90FF] hover:underline">View</a>
                    </li>
                </ul>
            </div>
        </div>
        
        <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">My Achievements</h3>
            <div className="space-y-4">
                <AchievementBadge icon={<BriefcaseIcon className="w-6 h-6"/>} label="First Application" color="bg-teal-100 dark:bg-teal-500/30 text-teal-600 dark:text-teal-300" />
                <AchievementBadge icon={<BookOpenIcon className="w-6 h-6"/>} label="Course Complete" color="bg-green-100 dark:bg-green-500/30 text-green-600 dark:text-green-300" />
                <AchievementBadge icon={<FireIcon className="w-6 h-6"/>} label="5 Day Streak" color="bg-yellow-100 dark:bg-yellow-500/30 text-yellow-600 dark:text-yellow-300" />
                <AchievementBadge icon={<UsersIcon className="w-6 h-6"/>} label="Joined Ikimina" color="bg-purple-100 dark:bg-purple-500/30 text-purple-600 dark:text-purple-300" />
            </div>
        </div>
      </div>
    </div>
  );
};