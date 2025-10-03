import React from 'react';
import { User, Page, UserRole } from '../types';
import { LayoutGridIcon, BriefcaseIcon, BookOpenIcon, UsersIcon, UserIcon as ProfileIcon, WalletIcon, LightbulbIcon, CashIcon } from './IconComponents';

interface DashboardLayoutProps {
  user: User;
  activePage: Page;
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
}

const NavItem: React.FC<{icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void}> = ({ icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-brand-blue text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
        {icon}
        <span className="ml-4 font-semibold">{label}</span>
    </button>
)

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, activePage, onNavigate, children }) => {
    
    const navItems = [
        { page: Page.DASHBOARD, label: 'Dashboard', icon: <LayoutGridIcon className="w-6 h-6"/> },
        { page: Page.JOBS, label: 'Jobs', icon: <BriefcaseIcon className="w-6 h-6"/> },
        { page: Page.IKIMINA, label: 'Ikimina', icon: <CashIcon className="w-6 h-6"/> },
        { page: Page.WALLET, label: 'Wallet', icon: <WalletIcon className="w-6 h-6"/> },
        { page: Page.TRAINING, label: 'Training', icon: <BookOpenIcon className="w-6 h-6"/> },
        { page: Page.ENTREPRENEURSHIP, label: 'Entrepreneurship', icon: <LightbulbIcon className="w-6 h-6"/> },
        { page: Page.COMMUNITY, label: 'Community', icon: <UsersIcon className="w-6 h-6"/> },
        { page: Page.PROFILE, label: 'My Profile', icon: <ProfileIcon className="w-6 h-6"/> },
    ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/80">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 h-screen fixed top-0 left-0 pt-24 pb-8 px-4 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden lg:flex flex-col">
            <div className="flex flex-col items-center mb-8">
                 <img src={`https://i.pravatar.cc/80?u=${user.name}`} alt="User Avatar" className="w-20 h-20 rounded-full border-4 border-brand-green"/>
                 <h2 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">{user.name}</h2>
                 <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
            </div>
            <nav className="flex-grow space-y-2">
                {navItems.map(item => (
                    <NavItem 
                        key={item.page} 
                        label={item.label}
                        icon={item.icon}
                        isActive={activePage === item.page}
                        onClick={() => onNavigate(item.page)}
                    />
                ))}
            </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 pt-28 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 {children}
            </div>
        </div>
      </div>
    </div>
  );
};
