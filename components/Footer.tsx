import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
             <h3 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">KaziConnect</h3>
             <p className="mt-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">Shakisha Akazi. Bizigamire. Wihangire Imirimo.</p>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">Features</h4>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
              <li><a href="#" className="hover:text-brand-primary">Find Jobs</a></li>
              <li><a href="#" className="hover:text-brand-primary">Ikimina Savings</a></li>
              <li><a href="#" className="hover:text-brand-primary">Skills Training</a></li>
              <li><a href="#" className="hover:text-brand-primary">Entrepreneurship</a></li>
            </ul>
          </div>
          <div>
             <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">Company</h4>
             <ul className="mt-4 space-y-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
              <li><a href="#" className="hover:text-brand-primary">About Us</a></li>
              <li><a href="#" className="hover:text-brand-primary">Contact</a></li>
              <li><a href="#" className="hover:text-brand-primary">Partners</a></li>
            </ul>
          </div>
           <div>
             <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">Legal</h4>
             <ul className="mt-4 space-y-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
              <li><a href="#" className="hover:text-brand-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-primary">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border-light dark:border-border-dark pt-8 text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
          <p>&copy; {new Date().getFullYear()} KaziConnect Rwanda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};