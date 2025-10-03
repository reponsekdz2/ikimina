import React from 'react';
import { UserRole } from '../types';

interface LandingPageProps {
  onAuth: (role: UserRole) => void;
}

const RoleCard: React.FC<{ role: UserRole; title: string; description: string; onSelect: () => void; }> = ({ role, title, description, onSelect }) => (
    <div className="p-8 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border border-gray-200 dark:border-gray-700 text-center transform hover:-translate-y-2 transition-transform duration-300">
        <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
        <button onClick={onSelect} className="mt-6 px-8 py-3 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
            Get Started
        </button>
    </div>
);


export const LandingPage: React.FC<LandingPageProps> = ({ onAuth }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">
          Unlock Your Potential.
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          KaziConnect is your all-in-one platform for jobs, skills training, and financial empowerment in Rwanda.
        </p>

        <div className="mt-16 max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <RoleCard 
                role={UserRole.SEEKER} 
                title="I'm a Job Seeker"
                description="Find jobs that match your skills, get training, and access financial tools to build your future."
                onSelect={() => onAuth(UserRole.SEEKER)}
            />
            <RoleCard 
                role={UserRole.EMPLOYER} 
                title="I'm an Employer"
                description="Discover talented and motivated individuals to grow your business. Post jobs and manage candidates with ease."
                onSelect={() => onAuth(UserRole.EMPLOYER)}
            />
        </div>
      </main>
    </div>
  );
};
