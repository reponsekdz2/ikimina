
import React from 'react';
import { UserRole } from '../types';
import { BuildingIcon, BriefcaseIcon, DollarSignIcon, TargetIcon, UserIcon, UsersIcon } from './IconComponents';

interface LandingPageProps {
  onSelectRole: (role: UserRole) => void;
}

const HeroSection: React.FC = () => (
  <div className="relative pt-32 pb-20 text-center">
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200/50 via-green-200/50 to-yellow-200/50 dark:from-blue-900/30 dark:via-green-900/30 dark:to-yellow-900/30 blur-3xl"></div>
    <div className="container mx-auto px-4">
      <h1 className="text-5xl md:text-7xl font-display font-extrabold text-gray-900 dark:text-white leading-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-green to-brand-yellow">Shakisha Akazi.</span>
        <br />
        Bizigamire. Wihangire Imirimo.
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
        Your future starts here. Connect with opportunities, grow your savings, and build your enterprise in Rwanda.
      </p>
      <div className="mt-10 h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center bg-gray-200 dark:bg-gray-800">
         <img src="https://picsum.photos/1200/400?random=1" alt="Youth working and collaborating" className="w-full h-full object-cover"/>
         {/* In a real app, an animated illustration (e.g., Lottie) would be placed here */}
      </div>
    </div>
  </div>
);

const RoleSelection: React.FC<{ onSelectRole: (role: UserRole) => void }> = ({ onSelectRole }) => (
  <div className="py-24 bg-gray-50 dark:bg-gray-900/50">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
        <RoleCard
          icon={<UserIcon className="w-12 h-12 text-brand-blue" />}
          title="Job Seeker"
          description="Find your dream job, build your skills, and access financial tools to secure your future."
          onClick={() => onSelectRole(UserRole.SEEKER)}
          glowColor="shadow-glow-blue"
        />
        <RoleCard
          icon={<BuildingIcon className="w-12 h-12 text-brand-green" />}
          title="Employer"
          description="Discover top talent, streamline your hiring process, and grow your organization."
          onClick={() => onSelectRole(UserRole.EMPLOYER)}
          glowColor="shadow-glow-green"
        />
      </div>
    </div>
  </div>
);

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  glowColor: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ icon, title, description, onClick, glowColor }) => (
  <div 
    className={`group p-8 rounded-3xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:${glowColor}`}
    onClick={onClick}
  >
    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">{title}</h3>
    <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
    <button className="mt-6 w-full py-3 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-xl group-hover:scale-105 transition-transform duration-300">
      Get Started
    </button>
  </div>
);

const WhyChooseUs: React.FC = () => {
    const features = [
        { icon: <BriefcaseIcon className="w-8 h-8"/>, title: "Vast Job Market", description: "Access thousands of jobs from leading companies across Rwanda." },
        { icon: <DollarSignIcon className="w-8 h-8"/>, title: "Financial Growth", description: "Secure micro-loans and grow your savings with our trusted partners." },
        { icon: <TargetIcon className="w-8 h-8"/>, title: "Skill Development", description: "Enroll in courses from top trainers to boost your career prospects." },
        { icon: <UsersIcon className="w-8 h-8"/>, title: "Strong Community", description: "Network with peers, find mentors, and collaborate on new ideas." },
    ];

    return (
        <div className="py-24">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white">Why Choose KaziConnect?</h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">We provide a complete ecosystem for your professional and financial success.</p>
                <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 rounded-2xl bg-gray-100 dark:bg-gray-800/50 border border-transparent hover:border-brand-green transition-colors duration-300">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-700 text-brand-green mb-5 mx-auto">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">{feature.title}</h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export const LandingPage: React.FC<LandingPageProps> = ({ onSelectRole }) => {
  return (
    <div>
      <HeroSection />
      <RoleSelection onSelectRole={onSelectRole} />
      <WhyChooseUs />
    </div>
  );
};
