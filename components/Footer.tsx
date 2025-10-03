import React from 'react';
import { Page } from '../types';
import { TwitterIcon, LinkedinIcon } from './IconComponents';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const FooterLink: React.FC<{onClick: () => void, children: React.ReactNode}> = ({ onClick, children }) => (
    <li>
        <button onClick={onClick} className="text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-yellow transition-colors duration-300">
            {children}
        </button>
    </li>
);

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">KaziConnect</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Shakisha Akazi. Bizigamire. Wihangire Imirimo.</p>
            <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-brand-blue"><TwitterIcon className="w-6 h-6" /></a>
                <a href="#" className="text-gray-400 hover:text-brand-blue"><LinkedinIcon className="w-6 h-6" /></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200">Platform</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <FooterLink onClick={() => onNavigate(Page.DASHBOARD)}>Dashboard</FooterLink>
              <FooterLink onClick={() => onNavigate(Page.JOBS)}>Jobs</FooterLink>
              <FooterLink onClick={() => onNavigate(Page.SAVINGS)}>Savings</FooterLink>
              <FooterLink onClick={() => onNavigate(Page.TRAINING)}>Training</FooterLink>
              <FooterLink onClick={() => onNavigate(Page.COMMUNITY)}>Community</FooterLink>
            </ul>
          </div>
           <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200">Resources</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-yellow">Blog</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-yellow">Help Center</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-yellow">CV Builder</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-yellow">About Us</a></li>
               <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-yellow">Contact</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-yellow">Partners</a></li>
            </ul>
          </div>
           <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-yellow">Terms of Service</a></li>
               <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-yellow">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} KaziConnect Rwanda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
