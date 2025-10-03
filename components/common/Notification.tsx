import React from 'react';
import { XIcon } from '../IconComponents';

interface NotificationProps {
  title: string;
  message: string;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ title, message, onClose }) => {
  return (
    <div className="fixed top-5 right-5 w-full max-w-sm bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {/* You can add an icon here */}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button onClick={onClose} className="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none">
              <span className="sr-only">Close</span>
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
