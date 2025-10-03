import React from 'react';
import { BriefcaseIcon, BookOpenIcon, UsersIcon } from '../IconComponents';

const StatCard: React.FC<{icon: React.ReactNode, label: string, value: string}> = ({icon, label, value}) => (
    <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
        <div className="p-3 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

export const SeekerDashboard: React.FC = () => {
    return (
        <div className="space-y-8">
             <div className="grid md:grid-cols-3 gap-6">
                <StatCard icon={<BriefcaseIcon className="w-8 h-8 text-brand-blue"/>} label="Applied Jobs" value="5" />
                <StatCard icon={<BookOpenIcon className="w-8 h-8 text-brand-green"/>} label="Trainings Completed" value="2" />
                <StatCard icon={<UsersIcon className="w-8 h-8 text-yellow-500"/>} label="Community Posts" value="1" />
             </div>

             <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Recommended for you</h3>
                {/* List of recommended jobs or trainings */}
             </div>
        </div>
    );
}
