import React, { useState } from 'react';
import { BriefcaseIcon, UsersIcon, UserIcon, PlusCircleIcon, DollarSignIcon, PiggyBankIcon, WalletIcon, TrophyIcon, XIcon } from '../IconComponents';
import { Ikimina, IkiminaCategory, Member } from '../../types';


const CircularProgress: React.FC<{ progress: number; size?: number; strokeWidth?: number; isNeon?: boolean; }> = ({ progress, size = 120, strokeWidth = 10, isNeon = false }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
  
    return (
      <div className={`relative ${isNeon ? 'dark:shadow-glow-neon-green rounded-full' : ''}`} style={{ width: size, height: size }}>
        <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
          <circle className="text-gray-200 dark:text-gray-700" stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
          <circle className="text-brand-green" stroke="url(#progressGradient)" strokeWidth={strokeWidth} strokeLinecap="round" fill="transparent" r={radius} cx={size / 2} cy={size / 2} style={{ strokeDasharray: circumference, strokeDashoffset: offset, transition: 'stroke-dashoffset 0.5s ease-out' }} transform={`rotate(-90 ${size/2} ${size/2})`} />
          <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#009E49" />
                  <stop offset="100%" stopColor="#FCD116" />
              </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white">{progress}%</span>
        </div>
      </div>
    );
};

const IkiminaDetailModal: React.FC<{ikimina: Ikimina | null, onClose: () => void}> = ({ ikimina, onClose }) => {
    if (!ikimina) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="w-full max-w-3xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"><XIcon className="w-6 h-6"/></button>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 flex flex-col items-center text-center">
                        <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">{ikimina.name}</h3>
                        <span className={`mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300`}>{ikimina.category}</span>
                        <div className="my-6">
                            <CircularProgress progress={ikimina.progress} size={150} strokeWidth={12} isNeon/>
                        </div>
                        <p className="font-semibold text-gray-700 dark:text-gray-300 text-lg">{ikimina.target.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })} Target</p>
                    </div>
                    <div className="md:col-span-2">
                         <h4 className="text-lg font-bold font-display flex items-center mb-3"><TrophyIcon className="w-6 h-6 mr-2 text-brand-yellow"/> Contribution Overview</h4>
                         <p className="text-gray-500 dark:text-gray-400 text-sm">Monitor progress and see who is leading contributions.</p>
                         <div className="mt-4 p-4 rounded-xl bg-gray-100 dark:bg-gray-900/50">
                             {/* Placeholder for chart */}
                             <div className="h-24 flex items-center justify-center text-gray-400">Contribution Chart Placeholder</div>
                         </div>

                         <h4 className="text-lg font-bold font-display flex items-center mt-6 mb-3"><UsersIcon className="w-6 h-6 mr-2 text-brand-blue"/> Manage Members ({ikimina.members.length})</h4>
                         <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                            {ikimina.members.map(member => (
                                <div key={member.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50">
                                    <div className="flex items-center"><img src={member.avatarUrl} alt={member.name} className="w-8 h-8 rounded-full mr-3"/><span>{member.name}</span></div>
                                    <button className="text-xs text-red-500 hover:text-red-700">Remove</button>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CreateIkiminaModal: React.FC<{isOpen: boolean, onClose: () => void, onCreate: (group: Ikimina) => void}> = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState<IkiminaCategory>(IkiminaCategory.BUSINESS);
    const [target, setTarget] = useState(1000000);
    const [frequency, setFrequency] = useState<'weekly'|'monthly'>('monthly');

    if(!isOpen) return null;

    const handleSubmit = () => {
        const newGroup: Ikimina = {
            id: Date.now(), name, category, target, frequency, progress: 0, members: [{id: 1, name: 'You', avatarUrl: 'https://i.pravatar.cc/40?u=employer'}]
        }
        onCreate(newGroup);
    }
    
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="w-full max-w-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"><XIcon className="w-6 h-6"/></button>
                <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white text-center">Create a New Ikimina</h2>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {/* Form */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="group-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Group Name</label>
                            {/* FIX: Replaced invalid <style jsx> with Tailwind CSS utility classes. */}
                            <input type="text" id="group-name" value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full py-2 px-3 bg-white/80 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="e.g., Kigali Coders"/>
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                            {/* FIX: Replaced invalid <style jsx> with Tailwind CSS utility classes. */}
                            <select id="category" value={category} onChange={e => setCategory(e.target.value as IkiminaCategory)} className="mt-1 w-full py-2 px-3 bg-white/80 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue">
                                {Object.values(IkiminaCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contribution Frequency</label>
                            {/* FIX: Replaced invalid <style jsx> with Tailwind CSS utility classes. */}
                            <select id="frequency" value={frequency} onChange={e => setFrequency(e.target.value as 'weekly'|'monthly')} className="mt-1 w-full py-2 px-3 bg-white/80 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue">
                                <option value="monthly">Monthly</option>
                                <option value="weekly">Weekly</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="target-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Target Amount (RWF)</label>
                            {/* FIX: Replaced invalid <style jsx> with Tailwind CSS utility classes. */}
                            <input type="number" id="target-amount" value={target} onChange={e => setTarget(Number(e.target.value))} step="100000" className="mt-1 w-full py-2 px-3 bg-white/80 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"/>
                        </div>
                    </div>
                    {/* Preview */}
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">{name || 'Group Name'}</h4>
                        <span className="text-xs px-2 py-0.5 mt-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">{category}</span>
                        <div className="my-4"><CircularProgress progress={0} size={100} strokeWidth={8}/></div>
                        <p className="font-semibold text-gray-700 dark:text-gray-300">{target.toLocaleString()} RWF</p>
                        <div className="flex items-center mt-2"><UsersIcon className="w-4 h-4 mr-1"/> 1 member</div>
                    </div>
                </div>
                 <button onClick={handleSubmit} className="mt-8 w-full py-3 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg text-lg">Create Group</button>
            </div>
        </div>
    )
}


const IkiminaManagementCard: React.FC<{ikimina: Ikimina, onManage: (ikimina: Ikimina) => void}> = ({ikimina, onManage}) => (
    <div className="p-5 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 flex flex-col group dark:shadow-glow-neon-yellow">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="font-bold text-xl text-gray-900 dark:text-white">{ikimina.name}</h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">{ikimina.category}</span>
            </div>
            <div className="w-20 h-20">
                 <CircularProgress progress={ikimina.progress} size={80} strokeWidth={8}/>
            </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <div className="flex items-center -space-x-2">
                {ikimina.members.map(m => <img key={m.id} src={m.avatarUrl} alt={m.name} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"/>)}
            </div>
            <span><UsersIcon className="w-4 h-4 inline mr-1"/> {ikimina.members.length} members</span>
        </div>
        <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-gray-200">{ikimina.target.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })}</p>

        <div className="mt-auto pt-4 flex space-x-2">
             <button onClick={() => onManage(ikimina)} className="w-full py-2.5 font-semibold text-white bg-brand-blue rounded-lg">
                Manage
            </button>
        </div>
    </div>
);

export const EmployerDashboard: React.FC = () => {
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [myIkimina, setMyIkimina] = useState<Ikimina[]>([
        { id: 1, name: "Kigali Innovators", category: IkiminaCategory.BUSINESS, target: 5000000, progress: 60, members: Array(8).fill(0).map((_, i) => ({ id: i, name: `Member ${i+1}`, avatarUrl: `https://i.pravatar.cc/40?u=${i}`})), frequency: 'monthly' }
    ]);
    const [viewingIkimina, setViewingIkimina] = useState<Ikimina | null>(null);

    const handleCreateIkimina = (group: Ikimina) => {
        setMyIkimina(prev => [...prev, group]);
        setCreateModalOpen(false);
    };

    return (
        <div className="space-y-8">
            <CreateIkiminaModal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} onCreate={handleCreateIkimina} />
            {viewingIkimina && <IkiminaDetailModal ikimina={viewingIkimina} onClose={() => setViewingIkimina(null)} />}
            
            <div className="grid md:grid-cols-2 gap-6">
                <button className="group p-6 rounded-2xl bg-gradient-to-br from-brand-blue to-cyan-500 text-white text-left flex items-center justify-between hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300">
                    <div>
                        <h2 className="text-2xl font-bold font-display">Post a New Job</h2>
                        <p className="opacity-80">Find the best talent in Rwanda</p>
                    </div>
                    <BriefcaseIcon className="w-12 h-12 opacity-50 group-hover:scale-110 transition-transform"/>
                </button>
                 <button onClick={() => setCreateModalOpen(true)} className="group p-6 rounded-2xl bg-gradient-to-br from-brand-green to-yellow-500 text-white text-left flex items-center justify-between hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300">
                    <div>
                        <h2 className="text-2xl font-bold font-display">Create a Savings Group</h2>
                        <p className="opacity-80">Empower your community with Ikimina</p>
                    </div>
                    <PiggyBankIcon className="w-12 h-12 opacity-50 group-hover:scale-110 transition-transform"/>
                </button>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-4">My Savings Groups (Ikimina)</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myIkimina.map(group => <IkiminaManagementCard key={group.id} ikimina={group} onManage={setViewingIkimina}/>)}
                    <div onClick={() => setCreateModalOpen(true)} className="min-h-[150px] flex items-center justify-center text-center p-6 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-brand-green hover:text-brand-green transition-colors cursor-pointer">
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

        </div>
    );
};