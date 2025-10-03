import React, { useState } from 'react';
import { MoonIcon, SunIcon, BellIcon, FireIcon } from './IconComponents';
import { User, Page, Notification } from '../types';

interface HeaderProps {
  isAuthenticated: boolean;
  user: User | null;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  theme: string;
  toggleTheme: () => void;
  notifications: Notification[];
  onNotificationRead: (id: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated, user, onNavigate, onLogout, theme, toggleTheme, notifications, onNotificationRead }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { label: 'Jobs', page: Page.JOBS },
    { label: 'Savings', page: Page.SAVINGS },
    { label: 'Training', page: Page.TRAINING },
    { label: 'Community', page: Page.COMMUNITY }
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <h1 onClick={() => onNavigate(isAuthenticated ? Page.DASHBOARD : Page.LANDING)} className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green cursor-pointer">
              KaziConnect
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button key={item.label} onClick={() => onNavigate(item.page)} className="text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-yellow transition-colors duration-300 font-medium">
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>
            
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                    <BellIcon className="w-6 h-6" />
                    {unreadCount > 0 && <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-gray-900"></span>}
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 p-4 space-y-2">
                       <h4 className="font-bold">Notifications</h4>
                       {notifications.map(n => (
                         <div key={n.id} onClick={() => onNotificationRead(n.id)} className={`p-2 rounded-md ${!n.read ? 'bg-blue-50 dark:bg-blue-900/50' : ''} cursor-pointer`}>
                           <p className="text-sm">{n.message}</p>
                           <p className="text-xs text-gray-400">{n.time}</p>
                         </div>
                       ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 text-orange-500">
                        <FireIcon className="w-5 h-5"/>
                        <span className="font-bold text-sm">5</span>
                    </div>
                    <button onClick={() => onNavigate(Page.PROFILE)} className="text-gray-700 dark:text-gray-200 hidden sm:block hover:underline">Welcome, {user.name}</button>
                    <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">Logout</button>
                </div>
              </div>
            ) : (
                 <button onClick={() => onNavigate(Page.LANDING)} className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
