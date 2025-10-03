import React from 'react';
import { BriefcaseIcon, DollarSignIcon, TargetIcon, UsersIcon } from '../IconComponents';

const CircularProgress: React.FC<{ progress: number; size?: number; strokeWidth?: number; }> = ({ progress, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-gray-200 dark:text-gray-700"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-brand-green"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ strokeDasharray: circumference, strokeDashoffset: offset, transition: 'stroke-dashoffset 0.5s ease-out' }}
          transform={`rotate(-90 ${size/2} ${size/2})`}
        />
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

const JobCard: React.FC<{title: string; company: string;}> = ({ title, company }) => (
  <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-700/50 flex justify-between items-center">
    <div>
      <h4 className="font-bold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">{company}</p>
    </div>
    <button className="px-4 py-2 text-sm font-semibold text-white bg-brand-blue rounded-lg hover:bg-blue-700 transition-colors">
      View
    </button>
  </div>
);

const IkiminaCard: React.FC<{name: string, members: number, goal: string}> = ({name, members, goal}) => (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-gray-800/30">
        <h4 className="font-bold text-gray-900 dark:text-white">{name}</h4>
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-4 mt-2">
            <span><UsersIcon className="w-4 h-4 inline mr-1"/> {members} members</span>
            <span><DollarSignIcon className="w-4 h-4 inline mr-1"/> {goal}</span>
        </div>
        <button className="mt-4 w-full py-2 font-semibold text-white bg-gradient-to-r from-brand-green to-yellow-400 rounded-lg hover:opacity-90 transition-opacity">
            Request to Join
        </button>
    </div>
);


export const SeekerDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Recommended Jobs</h3>
              <div className="space-y-4">
                  <JobCard title="Frontend Developer" company="Kigali Tech Hub" />
                  <JobCard title="Accountant" company="Bank of Rwanda" />
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Join a Savings Group (Ikimina)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                  <IkiminaCard name="Kigali Innovators" members={8} goal="RWF 5M"/>
                  <IkiminaCard name="Musanze Artisans" members={12} goal="RWF 2M"/>
              </div>
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
