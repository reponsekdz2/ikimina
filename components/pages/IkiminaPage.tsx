import React from 'react';
import { IkiminaGroup, UserRole } from '../../types';
import { RippleButton } from '../common/RippleButton';
import { Confetti } from '../common/Confetti';
import { CashIcon } from '../IconComponents';

const mockIkiminaGroups: IkiminaGroup[] = [
    { id: '1', name: 'Agribusiness Innovators', category: 'Agriculture', targetAmount: 2000000, currentAmount: 1500000, members: [{name: 'Gisa', avatarUrl: 'https://i.pravatar.cc/40?u=gisa'}, {name: 'Chris', avatarUrl: 'https://i.pravatar.cc/40?u=chris'}] },
    { id: '2', name: 'Youth Tech Fund', category: 'Youth', targetAmount: 5000000, currentAmount: 5000000, members: [{name: 'Aline', avatarUrl: 'https://i.pravatar.cc/40?u=aline'}, {name: 'Ben', avatarUrl: 'https://i.pravatar.cc/40?u=ben'}] },
    { id: '3', name: 'Family Home Savings', category: 'Personal', targetAmount: 1000000, currentAmount: 450000, members: [{name: 'Claire', avatarUrl: 'https://i.pravatar.cc/40?u=claire'}] },
    { id: '4', name: 'Kigali Creatives', category: 'Business', targetAmount: 3000000, currentAmount: 2100000, members: [{name: 'Dan', avatarUrl: 'https://i.pravatar.cc/40?u=dan'}] },
];

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-gradient-to-r from-brand-blue to-brand-green h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
    </div>
);

const getCategoryStyle = (category: IkiminaGroup['category']) => {
    switch (category) {
        case 'Business': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
        case 'Youth': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
        case 'Personal': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
        case 'Agriculture': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
}

const IkiminaCard: React.FC<{ group: IkiminaGroup }> = ({ group }) => {
    const progress = Math.min((group.currentAmount / group.targetAmount) * 100, 100);
    const goalReached = progress >= 100;

    return (
        <div className="relative p-5 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 transform hover:-translate-y-2 transition-transform duration-300 overflow-hidden">
            {goalReached && <Confetti />}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-brand-blue dark:text-brand-yellow">{group.name}</h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getCategoryStyle(group.category)}`}>{group.category}</span>
            </div>
            <div className="my-4">
                <div className="flex justify-between text-sm font-bold">
                    <span>RWF {group.currentAmount.toLocaleString()}</span>
                    <span className="text-gray-500 dark:text-gray-400">RWF {group.targetAmount.toLocaleString()}</span>
                </div>
                <ProgressBar progress={progress} />
            </div>
            <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                    {group.members.map(member => (
                        <img key={member.name} src={member.avatarUrl} alt={member.name} title={member.name} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800" />
                    ))}
                </div>
                <RippleButton className={`text-sm font-semibold text-white ${goalReached ? 'bg-green-500' : 'bg-brand-blue'}`}>
                    {goalReached ? 'Goal Reached!' : 'Contribute'}
                </RippleButton>
            </div>
        </div>
    );
};

export const IkiminaPage: React.FC<{ userRole: UserRole }> = ({ userRole }) => {
    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Ikimina Groups</h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400">Save together, achieve more.</p>
                </div>
                {userRole === UserRole.EMPLOYER && (
                    <RippleButton className="text-white bg-gradient-to-r from-brand-blue to-brand-green hover:shadow-lg hover:shadow-cyan-500/50">
                        Create New Ikimina
                    </RippleButton>
                )}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockIkiminaGroups.map(group => <IkiminaCard key={group.id} group={group} />)}
            </div>
        </div>
    );
};