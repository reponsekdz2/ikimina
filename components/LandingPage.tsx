import React from 'react';
import { UserRole } from '../types';
import { RippleButton } from './common/RippleButton';

interface LandingPageProps {
  onAuth: (role: UserRole) => void;
}

const RoleCard: React.FC<{ role: UserRole; title: string; description: string; onSelect: () => void; }> = ({ role, title, description, onSelect }) => (
    <div className="group [perspective:1000px] w-full h-full">
        <div className={`rounded-2xl bg-gradient-to-r p-0.5 ${role === UserRole.SEEKER ? 'from-[#1E90FF] to-[#32CD32]' : 'from-[#32CD32] to-[#FFD700]'} transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-cyan-500/30`}>
            <div className="p-8 rounded-[22px] bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg text-center transition-all duration-300 group-hover:[transform:rotateY(12deg)_rotateX(-8deg)] h-full flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">{title}</h3>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">{description}</p>
                </div>
                <RippleButton onClick={onSelect} className="mt-6 font-semibold text-white bg-gradient-to-r from-[#1E90FF] to-[#20B2AA] shadow-lg hover:shadow-teal-500/50 rounded-full">
                    Get Started
                </RippleButton>
            </div>
        </div>
    </div>
);


export const LandingPage: React.FC<LandingPageProps> = ({ onAuth }) => {
  return (
    <div className="min-h-screen pt-20 animated-gradient-bg">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold font-display text-white drop-shadow-lg animate-fade-in-down">
          Unlock Your Potential.
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-md animate-fade-in-down" style={{animationDelay: '0.3s'}}>
          KaziConnect is your all-in-one platform for jobs, skills training, and financial empowerment in Rwanda.
        </p>

        <div className="mt-16 max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <RoleCard 
                role={UserRole.SEEKER} 
                title="I'm a Job Seeker"
                description="Find jobs, join Ikimina savings groups, access training, and get loans for your business ideas."
                onSelect={() => onAuth(UserRole.SEEKER)}
            />
            <RoleCard 
                role={UserRole.EMPLOYER} 
                title="I'm an Employer"
                description="Post jobs, manage candidates, create Ikimina groups for your community, and manage funds."
                onSelect={() => onAuth(UserRole.EMPLOYER)}
            />
        </div>
      </main>
    </div>
  );
};