import React from 'react';
import { UserRole } from '../../types';
import { RippleButton } from '../common/RippleButton';
import { LightbulbIcon } from '../IconComponents';

const mockBusinessIdeas = [
    { id: '1', title: 'Mobile Money Agent', category: 'Finance' },
    { id: '2', title: 'Community Vegetable Garden', category: 'Agriculture' },
    { id: '3', title: 'Handmade Crafts E-shop', category: 'E-commerce' },
];

const IdeaCard: React.FC<{ title: string; category: string }> = ({ title, category }) => (
    <div className="p-5 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 group transform hover:-translate-y-2 transition-transform duration-300">
        <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-full text-[#FFD700]">
                <LightbulbIcon className="w-6 h-6"/>
            </div>
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-xs inline-block mt-1 px-3 py-1 font-semibold rounded-full bg-yellow-200 text-yellow-800 dark:bg-yellow-500/20 dark:text-[#FFD700]">{category}</p>
            </div>
        </div>
        <a href="#" className="text-sm font-semibold text-[#1E90FF] dark:text-[#FFD700] mt-4 inline-block opacity-0 group-hover:opacity-100 transition-opacity">Learn more &rarr;</a>
    </div>
);

export const EntrepreneurshipPage: React.FC<{ userRole: UserRole }> = ({ userRole }) => {
    return (
        <div className="space-y-12">
             <div>
                <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Entrepreneurship Hub</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">Learn, pitch, and get funding for your business ideas.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                     <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Simple Business Ideas to Start</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {mockBusinessIdeas.map(idea => <IdeaCard key={idea.id} {...idea} />)}
                        </div>
                    </div>

                     <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Your Pitched Ideas</h3>
                        <p className="text-gray-600 dark:text-gray-400">You haven't pitched any ideas yet. Start by exploring the ideas above or create your own!</p>
                    </div>

                </div>
                 <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1E90FF] to-[#32CD32] text-white shadow-lg shadow-blue-500/30">
                        <h3 className="text-xl font-bold font-display">Pitch Your Idea</h3>
                        <p className="mt-2 text-white/90">Have a business idea? Write a simple plan and submit it for review and potential funding from an Ikimina.</p>
                        <RippleButton className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white hover:shadow-lg rounded-full">Start Pitch</RippleButton>
                    </div>
                </div>
            </div>
        </div>
    )
}