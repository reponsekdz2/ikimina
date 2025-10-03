
import React from 'react';
import { BriefcaseIcon, UsersIcon, UserIcon } from '../IconComponents';

export const EmployerDashboard: React.FC = () => {
    const candidates = [
        { name: 'Aline Uwase', role: 'Frontend Developer', status: 'Interviewing' },
        { name: 'Jean Bosco', role: 'Project Manager', status: 'New' },
        { name: 'Marie Claire', role: 'UI/UX Designer', status: 'Offer Sent' },
        { name: 'Emmanuel N.', role: 'Backend Developer', status: 'Rejected' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Interviewing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
            case 'New': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case 'Offer Sent': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Employer Dashboard</h2>
                <button className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg shadow-lg hover:scale-105 transition-transform">
                    Post a New Job
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
                    <div className="p-4 bg-brand-blue rounded-full text-white"><BriefcaseIcon className="w-8 h-8" /></div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Active Listings</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">5</p>
                    </div>
                </div>
                 <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
                    <div className="p-4 bg-brand-green rounded-full text-white"><UsersIcon className="w-8 h-8" /></div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Applicants</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">234</p>
                    </div>
                </div>
                 <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
                    <div className="p-4 bg-brand-yellow rounded-full text-black"><UserIcon className="w-8 h-8" /></div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Hired this Month</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">2</p>
                    </div>
                </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Candidate Applications</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b-2 border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Name</th>
                                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Applying For</th>
                                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Status</th>
                                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map(candidate => (
                                <tr key={candidate.name} className="border-b border-gray-100 dark:border-gray-700/50">
                                    <td className="p-3 font-medium text-gray-900 dark:text-white">{candidate.name}</td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">{candidate.role}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(candidate.status)}`}>
                                            {candidate.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <a href="#" className="font-medium text-brand-blue hover:underline">View Profile</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
             <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Recruitment Analytics</h3>
                 <div className="h-48 flex items-center justify-center text-gray-500 dark:text-gray-400">
                   Chart placeholder (e.g., using Recharts or D3)
                 </div>
             </div>
        </div>
    );
};
