import React from 'react';
import { BriefcaseIcon, UsersIcon } from '../IconComponents';

const StatCard: React.FC<{icon: React.ReactNode, label: string, value: string}> = ({icon, label, value}) => (
    <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
        <div className="p-3 bg-brand-green/10 dark:bg-brand-green/20 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

export const EmployerDashboard: React.FC = () => {
    return (
        <div className="space-y-8">
             <div className="grid md:grid-cols-2 gap-6">
                <StatCard icon={<BriefcaseIcon className="w-8 h-8 text-brand-green"/>} label="Active Job Postings" value="3" />
                <StatCard icon={<UsersIcon className="w-8 h-8 text-brand-blue"/>} label="New Applicants" value="12" />
             </div>

             <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">Your Job Postings</h3>
                    <button className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg">Post a New Job</button>
                </div>
                {/* List of job postings */}
             </div>
        </div>
    );
}
