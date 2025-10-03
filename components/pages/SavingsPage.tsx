import React, { useState } from 'react';
import { DollarSignIcon, UserIcon, UsersIcon, MessageSquareIcon } from '../IconComponents';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div className="bg-gradient-to-r from-brand-green to-brand-yellow h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
);

const SavingsGoal: React.FC<{title: string; current: number; goal: number}> = ({title, current, goal}) => (
    <div>
        <div className="flex justify-between font-medium text-gray-700 dark:text-gray-200">
            <span>{title}</span>
            <span>{Math.round((current/goal)*100)}%</span>
        </div>
        <ProgressBar progress={(current/goal)*100} />
        <p className="text-sm text-right mt-1 text-gray-500 dark:text-gray-400">RWF {current.toLocaleString()} / RWF {goal.toLocaleString()}</p>
        <p className="text-xs text-center italic text-gray-400 mt-1">"The secret of getting ahead is getting started."</p>
    </div>
);

enum SavingsTab {
    MY_SAVINGS,
    P2P_LENDING,
    GROUPS
}

export const SavingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SavingsTab>(SavingsTab.MY_SAVINGS);
    
    return (
        <div className="bg-gray-50 dark:bg-gray-900/80 pt-28 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold font-display text-gray-900 dark:text-white">Your Financial Hub</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Manage your savings, apply for loans, and track your financial growth with ease.</p>
                </div>

                <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-blue to-brand-green text-white shadow-2xl mb-12">
                    <p className="text-lg opacity-80">Total Savings Balance</p>
                    <p className="text-5xl font-bold mt-2">RWF 1,234,567</p>
                </div>

                <div className="mb-8 flex justify-center border-b border-gray-200 dark:border-gray-700">
                    <TabButton title="My Savings" icon={<DollarSignIcon />} isActive={activeTab === SavingsTab.MY_SAVINGS} onClick={() => setActiveTab(SavingsTab.MY_SAVINGS)} />
                    <TabButton title="P2P Lending" icon={<UserIcon />} isActive={activeTab === SavingsTab.P2P_LENDING} onClick={() => setActiveTab(SavingsTab.P2P_LENDING)} />
                    <TabButton title="Savings Groups" icon={<UsersIcon />} isActive={activeTab === SavingsTab.GROUPS} onClick={() => setActiveTab(SavingsTab.GROUPS)} />
                </div>

                {activeTab === SavingsTab.MY_SAVINGS && <MySavingsContent />}
                {activeTab === SavingsTab.P2P_LENDING && <P2PLendingContent />}
                {activeTab === SavingsTab.GROUPS && <GroupsContent />}

            </div>
        </div>
    );
};

// Fix: Changed icon prop type to React.ReactElement to ensure it can be cloned and styled.
const TabButton: React.FC<{title: string, icon: React.ReactElement, isActive: boolean, onClick: () => void}> = ({ title, icon, isActive, onClick }) => (
    <button onClick={onClick} className={`flex items-center space-x-2 px-4 py-3 font-semibold border-b-2 transition-colors duration-300 ${isActive ? 'border-brand-blue text-brand-blue dark:border-brand-yellow dark:text-brand-yellow' : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'}`}>
        {React.cloneElement(icon, { className: 'w-5 h-5'})}
        <span>{title}</span>
    </button>
);

const MySavingsContent = () => {
    const transactions = [
        { date: '2023-10-26', description: 'Salary Deposit', amount: 500000, type: 'credit' },
        { date: '2023-10-25', description: 'MTN Airtime', amount: -5000, type: 'debit' },
        { date: '2023-10-24', description: 'Contribution to Laptop Fund', amount: -50000, type: 'debit' },
    ];
    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                     <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Savings Goals</h3>
                     <div className="space-y-4">
                        <SavingsGoal title="New Laptop" current={750000} goal={1000000}/>
                        <SavingsGoal title="Business Startup" current={1200000} goal={5000000}/>
                     </div>
                </div>
                 <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                     <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Apply for a Micro-Loan</h3>
                    <form className="space-y-4">
                        <div><label className="text-sm">Amount (RWF)</label><input type="number" placeholder="e.g., 500000" className="mt-1 w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"/></div>
                        <div><label className="text-sm">Purpose</label><input type="text" placeholder="e.g., Buy equipment" className="mt-1 w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"/></div>
                        <button className="w-full py-3 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg">Submit Application</button>
                    </form>
                </div>
            </div>
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Transaction History</h3>
                <table className="w-full text-left">
                    <thead><tr><th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Date</th><th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Description</th><th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400 text-right">Amount</th></tr></thead>
                    <tbody>
                        {transactions.map(t => (
                            <tr key={t.date + t.description} className="border-b border-gray-100 dark:border-gray-700/50">
                                <td className="p-3 text-gray-600 dark:text-gray-300">{t.date}</td>
                                <td className="p-3 font-medium text-gray-900 dark:text-white">{t.description}</td>
                                <td className={`p-3 text-right font-semibold ${t.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>{t.amount.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const P2PLendingContent = () => (
    <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Peer-to-Peer Lending Marketplace</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Fund a loan for a fellow community member or create your own request.</p>
        {/* Loan Requests would be listed here */}
        <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <p>Loan marketplace is empty. Be the first to post a request!</p>
            <button className="mt-4 px-4 py-2 font-semibold text-white bg-brand-blue rounded-lg">Create Loan Request</button>
        </div>
    </div>
);

const GroupsContent = () => (
     <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
             <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">My Savings Groups</h3>
             <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-700">
                <h4 className="font-bold">Kigali Techies Ikimina</h4>
                <p className="text-sm">Next Payout: You (Nov 1st)</p>
                <ProgressBar progress={80} />
             </div>
             <button className="w-full py-2 font-semibold text-white bg-brand-green rounded-lg">Create New Group</button>
        </div>
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Kigali Techies Group Chat</h3>
            <div className="h-64 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-900 rounded-lg flex flex-col space-y-2">
                <p className="text-sm"><strong className="text-blue-500">Aline:</strong> Hey team, just made my contribution for the month!</p>
                <p className="text-sm"><strong className="text-green-500">Jean:</strong> Awesome, thanks Aline! Who's next for payout?</p>
            </div>
            <div className="mt-4 flex">
                <input type="text" placeholder="Type a message..." className="flex-grow p-2 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-transparent" />
                <button className="px-4 bg-brand-blue text-white rounded-r-lg">Send</button>
            </div>
        </div>
     </div>
);