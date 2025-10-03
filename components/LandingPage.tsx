import React from 'react';
import { UserRole } from '../types';
import { BuildingIcon, UserIcon } from './IconComponents';

interface LandingPageProps {
  onSelectRole: (role: UserRole) => void;
}

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  ctaText: string;
  onClick: () => void;
  glowColor: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ icon, title, description, ctaText, onClick, glowColor }) => (
  <div 
    className="group relative p-8 md:p-12 rounded-3xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl cursor-pointer transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
    onClick={onClick}
  >
    <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-br from-brand-blue to-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${glowColor}`}></div>
    <div className="relative flex flex-col items-center text-center">
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-white/50 dark:bg-gray-900/50 mb-6 group-hover:scale-110 transition-transform duration-300 border-2 border-white/50">
        {icon}
      </div>
      <h3 className="text-3xl font-display font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 h-24">{description}</p>
      <div className="h-16 mt-6 flex items-center">
        <button className="py-3 px-8 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-xl transition-all duration-300 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100">
          {ctaText}
        </button>
      </div>
    </div>
  </div>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 dark:from-blue-900/30 dark:via-green-900/30 dark:to-yellow-900/30"></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-gray-900 dark:text-white leading-tight">
            Choose Your Path
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Whether you're seeking opportunities or creating them, your journey starts here.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
          <RoleCard
            icon={<UserIcon className="w-12 h-12 text-brand-blue" />}
            title="Job Seeker"
            description="Find Jobs, Join Savings Groups, Learn Skills."
            ctaText="Join as Seeker"
            onClick={() => onSelectRole(UserRole.SEEKER)}
            glowColor="shadow-glow-blue"
          />
          <RoleCard
            icon={<BuildingIcon className="w-12 h-12 text-brand-green" />}
            title="Employer"
            description="Post Jobs, Create Savings Groups, Empower Others."
            ctaText="Join as Employer"
            onClick={() => onSelectRole(UserRole.EMPLOYER)}
            glowColor="shadow-glow-green"
          />
        </div>
      </div>
    </div>
  );
};
