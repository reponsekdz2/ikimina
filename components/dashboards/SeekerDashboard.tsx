import React, { useState } from 'react';
import { BriefcaseIcon, DollarSignIcon, TargetIcon, UsersIcon, PiggyBankIcon, WalletIcon, TrophyIcon, XIcon } from '../IconComponents';
import { Ikimina, IkiminaCategory, Member } from '../../types';

const mockJoinableIkimina: Ikimina[] = [
    { id: 1, name: "Kigali Innovators", category: IkiminaCategory.BUSINESS, target: 5000000, progress: 60, members: Array(8).fill(0).map((_, i) => ({ id: i, name: `Member ${i+1}`, avatarUrl: `https://i.pravatar.cc/40?u=${i}`})), frequency: 'monthly' },
    { id: 2, name: "Musanze Artisans", category: IkiminaCategory.YOUTH, target: 2000000, progress: 30, members: Array(12).fill(0).map((_, i) => ({ id: i, name: `Member ${i+1}`, avatarUrl: `https://i.pravatar.cc/40?u=a${i}`})), frequency: 'weekly' },
    { id: 3, name: "Gisenyi Farmers", category: IkiminaCategory.AGRICULTURE, target: 10000000, progress: 75, members: Array(15).fill(0).map((_, i) => ({ id: i, name: `Member ${i+1}`, avatarUrl: `https://i.pravatar.cc/40?u=b${i}`})), frequency: 'monthly' },
];

// --- Reusable Components ---
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
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{progress}%</span>
      </div>
    </div>
  );
};

const IkiminaDetailModal: React.FC<{ikimina: Ikimina | null, onClose: () => void, onAction: () => void, actionLabel: string, showConfetti: boolean}> = ({ ikimina, onClose, onAction, actionLabel, showConfetti }) => {
    if (!ikimina) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
             {showConfetti && <div className="confetti-container"> {/* Placeholder for confetti animation */}</div>}
            <div className="w-full max-w-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"><XIcon className="w-6 h-6"/></button>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <h3 className="text-3xl font-bold font-display text-gray-900 dark:text-white">{ikimina.name}</h3>
                        <span className={`mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300`}>{ikimina.category}</span>
                        <div className="my-6">
                            <CircularProgress progress={ikimina.progress} size={180} strokeWidth={14} isNeon/>
                        </div>
                        <p className="font-semibold text-gray-700 dark:text-gray-300 text-lg">{ikimina.target.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })} Target</p>
                    </div>
                    <div>
                        <div className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-700/50">
                            <h4 className="text-lg font-bold font-display flex items-center"><WalletIcon className="w-6 h-6 mr-2 text-brand-blue"/> Make Contribution</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Next due: Oct 31, 2024</p>
                            <div className="mt-4">
                                <label htmlFor="amount" className="sr-only">Amount</label>
                                <input type="number" id="amount" placeholder="Enter amount in RWF" className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                            </div>
                            <button className="mt-3 w-full py-2.5 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg">Contribute Now</button>
                        </div>
                        <div className="mt-6">
                            <h4 className="text-lg font-bold font-display flex items-center mb-3"><TrophyIcon className="w-6 h-6 mr-2 text-brand-yellow"/> Top Contributors</h4>
                            <ul className="space-y-2 text-sm">
                                {['Amahoro J.', 'Ganza P.', 'Keza L.'].map((name, i) => (
                                    <li key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50">
                                        <div className="flex items-center"><img src={`https://i.pravatar.cc/32?u=c${i}`} alt="avatar" className="w-6 h-6 rounded-full mr-2"/><span>{name}</span></div>
                                        <span className="font-bold text-gray-600 dark:text-gray-300">RWF {(3-i)*50000}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <button onClick={onAction} className="mt-6 w-full py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">{actionLabel}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


const IkiminaCard: React.FC<{ikimina: Ikimina, onJoin: (id: number) => void, onView: (ikimina: Ikimina) => void}> = ({ ikimina, onJoin, onView }) => (
    <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md flex flex-col group">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{ikimina.name}</h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">{ikimina.category}</span>
            </div>
            <div className="w-16 h-16">
                 <CircularProgress progress={ikimina.progress} size={64} strokeWidth={6}/>
            </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <div className="flex items-center -space-x-2">
                {ikimina.members.slice(0, 4).map(m => <img key={m.id} src={m.avatarUrl} alt={m.name} className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-800"/>)}
                {ikimina.members.length > 4 && <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs font-bold">+{ikimina.members.length - 4}</div>}
            </div>
            <span>{ikimina.members.length} members</span>
        </div>
        <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-200">{ikimina.target.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })}</p>
        <div className="mt-auto pt-3 flex space-x-2">
            <button onClick={() => onJoin(ikimina.id)} className="w-full py-2 font-semibold text-white bg-gradient-to-r from-brand-green to-yellow-400 rounded-lg hover:opacity-90 transition-opacity">Request to Join</button>
            <button onClick={() => onView(ikimina)} className="p-2 font-semibold text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg">View</button>
        </div>
    </div>
);

export const SeekerDashboard: React.FC = () => {
  const [joinableIkimina, setJoinableIkimina] = useState<Ikimina[]>(mockJoinableIkimina);
  const [joinedIkimina, setJoinedIkimina] = useState<Ikimina[]>([]);
  const [viewingIkimina, setViewingIkimina] = useState<Ikimina | null>(null);

  const handleJoin = (id: number) => {
    const groupToJoin = joinableIkimina.find(g => g.id === id);
    if (groupToJoin) {
      setJoinedIkimina(prev => [...prev, groupToJoin]);
      setJoinableIkimina(prev => prev.filter(g => g.id !== id));
    }
  };

  const handleExit = () => {
      if(viewingIkimina){
        const groupToExit = viewingIkimina;
        setJoinableIkimina(prev => [...prev, groupToExit]);
        setJoinedIkimina(prev => prev.filter(g => g.id !== groupToExit.id));
        setViewingIkimina(null);
      }
  };

  return (
    <div className="space-y-8">
        {viewingIkimina && <IkiminaDetailModal ikimina={viewingIkimina} onClose={() => setViewingIkimina(null)} onAction={handleExit} actionLabel="Exit Group" showConfetti={viewingIkimina.progress >= 100}/>}
      
      {/* --- Joined Ikimina Section --- */}
      {joinedIkimina.length > 0 && (
          <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">My Joined Ikimina</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {joinedIkimina.map(ikimina => (
                    <div key={ikimina.id} onClick={() => setViewingIkimina(ikimina)} className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md flex flex-col group cursor-pointer">
                        <div className="flex justify-between items-start">
                            <div><h4 className="font-bold text-gray-900 dark:text-white">{ikimina.name}</h4><span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">Joined</span></div>
                            <div className="w-16 h-16"><CircularProgress progress={ikimina.progress} size={64} strokeWidth={6}/></div>
                        </div>
                        <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-200">{ikimina.target.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })}</p>
                    </div>
                  ))}
              </div>
          </div>
      )}

      {/* --- Main Grid --- */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Join a Savings Group (Ikimina)</h3>
              {joinableIkimina.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {joinableIkimina.map(ikimina => <IkiminaCard key={ikimina.id} ikimina={ikimina} onJoin={handleJoin} onView={setViewingIkimina}/>)}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No new groups to join at the moment.</p>
              )}
            </div>
        </div>
        
        <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">Savings Goal</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Laptop Fund</p>
              <CircularProgress progress={75} />
              <p className="mt-4 font-semibold text-gray-700 dark:text-gray-300">RWF 750,000 / RWF 1,000,000</p>
            </div>
             <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Training Hub</h3>
               <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-center p-4">
                    <p className="font-semibold text-gray-600 dark:text-gray-300">Ready to learn a new skill?</p>
               </div>
              <button className="mt-4 w-full py-3 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg flex items-center justify-center space-x-2">
                <TargetIcon className="w-5 h-5"/>
                <span>Browse Courses</span>
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};