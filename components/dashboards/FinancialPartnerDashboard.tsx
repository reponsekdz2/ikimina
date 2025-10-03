
import React from 'react';

export const FinancialPartnerDashboard: React.FC = () => {
    const loanRequests = [
        { name: 'Grace Ishimwe', amount: 'RWF 500,000', purpose: 'Laptop Purchase', status: 'Pending' },
        { name: 'Olivier Mugisha', amount: 'RWF 2,000,000', purpose: 'Business Startup', status: 'Approved' },
        { name: 'Chantal Uwamahoro', amount: 'RWF 300,000', purpose: 'Training Course', status: 'Pending' },
        { name: 'Patrick Habimana', amount: 'RWF 1,500,000', purpose: 'Business Expansion', status: 'Rejected' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            case 'Approved': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Financial Partner Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Loans Disbursed</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">RWF 150M</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pending Requests</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">18</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Active Savers</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">1,200</p>
                </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">User Loan Requests</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Name</th>
                                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Amount</th>
                                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Purpose</th>
                                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Status</th>
                                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loanRequests.map(req => (
                                <tr key={req.name} className="border-b border-gray-100 dark:border-gray-700/50">
                                    <td className="p-3 font-medium text-gray-900 dark:text-white">{req.name}</td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">{req.amount}</td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">{req.purpose}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(req.status)}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="p-3 space-x-2">
                                        <button className="text-sm font-medium text-green-600 hover:underline">Approve</button>
                                        <button className="text-sm font-medium text-red-600 hover:underline">Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
