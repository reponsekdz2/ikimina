import React from 'react';
import { UserRole } from '../types';
import { RippleButton } from './common/RippleButton';
import { BriefcaseIcon, CashIcon, BookOpenIcon, LightbulbIcon } from './IconComponents';

interface LandingPageProps {
  onAuth: (role: UserRole) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="text-center p-6 glass-card rounded-2xl shadow-lg">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary mx-auto shadow-md">
            {icon}
        </div>
        <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-white/80">{description}</p>
    </div>
);


const RoleCard: React.FC<{ role: UserRole; title: string; description: string; onSelect: () => void; }> = ({ role, title, description, onSelect }) => (
    <div className="group w-full h-full p-8 glass-card rounded-3xl text-center flex flex-col justify-between items-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <div>
            <h3 className="text-3xl font-bold font-display text-white">{title}</h3>
            <p className="mt-2 text-white/80 max-w-sm mx-auto">{description}</p>
        </div>
        <RippleButton onClick={onSelect} className="mt-8 font-semibold text-gray-900 bg-white shadow-lg hover:shadow-white/30 rounded-full w-full max-w-xs">
            Get Started
        </RippleButton>
    </div>
);


export const LandingPage: React.FC<LandingPageProps> = ({ onAuth }) => {
  return (
    <div className="min-h-screen pt-20 animated-gradient-bg text-white">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center py-16">
            <h1 className="text-5xl md:text-7xl font-bold font-display drop-shadow-lg animate-fade-in-down">
              Your Future, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-white">Connected</span>.
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-md animate-fade-in-down" style={{animationDelay: '0.3s'}}>
              KaziConnect is Rwanda's all-in-one platform for jobs, skills training, and financial empowerment.
            </p>
            <div className="mt-8 animate-fade-in-down" style={{animationDelay: '0.6s'}}>
                <RippleButton onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })} className="text-lg font-semibold bg-white text-gray-900 rounded-full hover:shadow-lg hover:shadow-white/30 transition-all duration-300">
                   Join Now
                 </RippleButton>
            </div>
        </div>

        {/* Features Section */}
        <div className="py-24">
            <h2 className="text-4xl font-bold font-display text-center text-white drop-shadow-md">Everything You Need to Succeed</h2>
            <div className="mt-12 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard 
                    icon={<BriefcaseIcon className="w-7 h-7 text-white" />}
                    title="Find Jobs"
                    description="Discover opportunities that match your skills and passion."
                />
                <FeatureCard 
                    icon={<CashIcon className="w-7 h-7 text-white" />}
                    title="Save with Ikimina"
                    description="Join savings groups to achieve your financial goals together."
                />
                <FeatureCard 
                    icon={<BookOpenIcon className="w-7 h-7 text-white" />}
                    title="Gain Skills"
                    description="Access training modules to boost your employability."
                />
                <FeatureCard 
                    icon={<LightbulbIcon className="w-7 h-7 text-white" />}
                    title="Start a Business"
                    description="Get funding and support for your entrepreneurial ideas."
                />
            </div>
        </div>


        {/* Role Selection Section */}
        <div id="get-started" className="pt-24 text-center">
            <h2 className="text-4xl font-bold font-display text-white drop-shadow-md">How Will You Begin?</h2>
             <div className="mt-12 max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
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
        </div>
      </main>
    </div>
  );
};