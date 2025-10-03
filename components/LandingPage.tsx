import React from 'react';
import { UserRole } from '../types';
import { RippleButton } from './common/RippleButton';

interface LandingPageProps {
  onAuth: (role: UserRole) => void;
}

const RoleCard: React.FC<{ role: UserRole; title: string; description: string; onSelect: () => void; }> = ({ role, title, description, onSelect }) => (
    <div className="group [perspective:1000px] w-full">
        <div className="p-8 rounded-2xl bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg border border-white/30 dark:border-gray-700/50 text-center transition-all duration-300 group-hover:[transform:rotateY(12deg)_rotateX(-8deg)_scale(1.05)] group-hover:shadow-2xl group-hover:shadow-cyan-500/30">
            <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-200">{description}</p>
            <RippleButton onClick={onSelect} className="mt-6 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green shadow-lg hover:shadow-cyan-500/50">
                Get Started
            </RippleButton>
        </div>
    </div>
);


export const LandingPage: React.FC<LandingPageProps> = ({ onAuth }) => {
  return (
    <div className="min-h-screen pt-20 animated-gradient-bg">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-display text-white drop-shadow-lg animate-fade-in-down">
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