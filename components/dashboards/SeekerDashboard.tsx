import React from 'react';
import { BriefcaseIcon, DollarSignIcon, TargetIcon, UserIcon, TrophyIcon, CertificateIcon } from '../IconComponents';

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
  <div className={`p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

const JobListItem: React.FC<{ title: string; company: string; location: string }> = ({ title, company, location }) => (
  <div className="p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200 flex items-center justify-between">
    <div>
      <h4 className="font-bold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">{company} - {location}</p>
    </div>
    <button className="px-3 py-1 text-xs font-semibold text-white bg-brand-blue rounded-full hover:bg-blue-700">Apply</button>
  </div>
);

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div className="bg-gradient-to-r from-brand-green to-brand-yellow h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
);

const LeaderboardItem: React.FC<{rank: number; name: string; points: number}> = ({rank, name, points}) => (
    <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
            <span className="font-bold w-5">{rank}.</span>
            <span>{name}</span>
        </div>
        <span className="font-semibold text-brand-green">{points} pts</span>
    </div>
);

export const SeekerDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<BriefcaseIcon className="w-6 h-6 text-white"/>} title="Jobs Applied" value="12" color="bg-brand-blue" />
        <StatCard icon={<UserIcon className="w-6 h-6 text-white"/>} title="Profile Views" value="48" color="bg-brand-green" />
        <StatCard icon={<DollarSignIcon className="w-6 h-6 text-black"/>} title="Savings" value="RWF 50,000" color="bg-brand-yellow" />
      </div>

      <div className="relative">
        <input 
          type="text" 
          placeholder="AI Powered Job Search (e.g., 'marketing jobs in Kigali')" 
          className="w-full p-4 pl-12 text-lg rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition"
        />
        <BriefcaseIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Recommended Jobs</h3>
              <div className="space-y-2">
                <JobListItem title="Frontend Developer" company="TechInnovate" location="Kigali" />
                <JobListItem title="Accountant" company="Bank of Kigali" location="Kigali" />
                <JobListItem title="Project Manager" company="GovTech Rwanda" location="Kigali" />
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">My Achievements</h3>
               <div className="flex space-x-4">
                    <div className="text-center p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                        <TrophyIcon className="w-10 h-10 mx-auto text-yellow-500"/>
                        <p className="text-xs font-bold mt-1">Top Saver</p>
                    </div>
                     <div className="text-center p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                        <CertificateIcon className="w-10 h-10 mx-auto text-green-500"/>
                        <p className="text-xs font-bold mt-1">Python Skilled</p>
                    </div>
               </div>
            </div>
        </div>
        
        <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">Savings Goal</h3>
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-300">
                  <span>Laptop Fund</span>
                  <span>75%</span>
                </div>
                <ProgressBar progress={75} />
                <p className="text-xs text-right mt-1 text-gray-500">RWF 750,000 / RWF 1,000,000</p>
              </div>
               <button className="w-full py-2 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg">
                Quick Save / Loan
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Community Leaderboard</h3>
                <div className="space-y-3">
                    <LeaderboardItem rank={1} name="Aline U." points={1250} />
                    <LeaderboardItem rank={2} name="Jean B." points={1100} />
                    <LeaderboardItem rank={3} name="You" points={980} />
                    <LeaderboardItem rank={4} name="Grace I." points={950} />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
