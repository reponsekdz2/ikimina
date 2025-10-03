import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">KaziConnect</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Shakisha Akazi. Bizigamire. Wihangire Imirimo.</p>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} KaziConnect Rwanda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
