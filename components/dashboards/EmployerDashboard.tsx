import React from 'react';
import { BriefcaseIcon, UsersIcon, UserIcon, PlusCircleIcon, DollarSignIcon } from '../IconComponents';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div className="bg-gradient-to-r from-brand-green to-brand-yellow h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
);

const IkiminaManagementCard: React.FC<{name: string, members: number, goal: string, progress: number}> = ({name, members, goal, progress}) => (
    <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 flex flex-col">
        <h4 className="font-bold text-xl text-gray-900 dark:text-white">{name}</h4>
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-4 mt-2">
            <span><UsersIcon className="w-4 h-4 inline mr-1"/> {members} members</span>
            <span><DollarSignIcon className="w-4 h-4 inline mr-1"/> {goal} Target</span>
        </div>
        <div className="mt-4">
            <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-300">
                <span>Contribution Progress</span>
                <span>{progress}%</span>
            </div>
            <ProgressBar progress={progress} />
        </div>
        <div className="mt-auto pt-4 flex space-x-2">
             <button className="w-full py-2 font-semibold text-white bg-brand-blue rounded-lg">
                Manage
            </button>
             <button className="p-2 font-semibold text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg">
                <PlusCircleIcon className="w-5 h-5"/>
            </button>
        </div>
    </div>
);

export const EmployerDashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
                <button className="group p-6 rounded-2xl bg-gradient-to-br from-brand-blue to-cyan-500 text-white text-left flex items-center justify-between hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300">
                    <div>
                        <h2 className="text-2xl font-bold font-display">Post a New Job</h2>
                        <p className="opacity-80">Find the best talent in Rwanda</p>
                    </div>
                    <BriefcaseIcon className="w-12 h-12 opacity-50 group-hover:scale-110 transition-transform"/>
                </button>
                 <button className="group p-6 rounded-2xl bg-gradient-to-br from-brand-green to-yellow-500 text-white text-left flex items-center justify-between hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300">
                    <div>
                        <h2 className="text-2xl font-bold font-display">Create a Savings Group</h2>
                        <p className="opacity-80">Empower your community with Ikimina</p>
                    </div>
                    <UsersIcon className="w-12 h-12 opacity-50 group-hover:scale-110 transition-transform"/>
                </button>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-4">My Savings Groups (Ikimina)</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <IkiminaManagementCard name="Kigali Innovators" members={8} goal="RWF 5M" progress={60}/>
                    <div className="min-h-[150px] flex items-center justify-center text-center p-6 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-brand-green hover:text-brand-green transition-colors cursor-pointer">
                        <div>
                            <PlusCircleIcon className="w-10 h-10 mx-auto text-gray-400"/>
                            <p className="mt-2 font-semibold">Create a New Group</p>
                        </div>
                    </div>
                </div>
            </div>

             <div className="p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Empowerment Hub</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Support local entrepreneurs by inviting them to join your savings groups or professional network.</p>
                    </div>
                    <div className="md:col-span-1">
                        <button className="w-full py-4 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-xl flex items-center justify-center space-x-2 text-lg">
                            <PlusCircleIcon className="w-6 h-6"/>
                            <span>Add Entrepreneur</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Active Job Listings</h3>
                <p className="text-gray-500 dark:text-gray-400">Placeholder for job listings management.</p>
            </div>
        </div>
    );
};
