import React from 'react';

// Basic button, ripple effect would require more complex CSS or JS
export const RippleButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => {
  return (
    <button className={`px-5 py-2.5 font-medium rounded-lg transition-all duration-300 ${className}`} {...props}>
      {children}
    </button>
  );
};
