import React from 'react';
import { MoonIcon, SunIcon } from './IconComponents';
import { User, Page } from '../types';

interface HeaderProps {
  isAuthenticated: boolean;
  user: User | null;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  theme: string;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated, user, onNavigate, onLogout, theme, toggleTheme }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <h1 onClick={() => onNavigate(isAuthenticated ? Page.DASHBOARD : Page.LANDING)} className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green cursor-pointer">
              KaziConnect
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>
            
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                    <span className="text-gray-700 dark:text-gray-200 hidden sm:block">Welcome, {user.name}</span>
                    <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">Logout</button>
                </div>
              </div>
            ) : (
                 <button onClick={() => onNavigate(Page.AUTH)} className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
