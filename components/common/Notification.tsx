import React from 'react';
import { XIcon, CheckCircleIcon } from '../IconComponents';

interface NotificationProps {
  title: string;
  message: string;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ title, message, onClose }) => {
  return (
    <div className="fixed top-24 right-5 w-full max-w-sm glass-card shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden z-[200] animate-notification-in">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">{title}</p>
            <p className="mt-1 text-sm text-text-secondary-light dark:text-text-secondary-dark">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button onClick={onClose} className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none">
              <span className="sr-only">Close</span>
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};