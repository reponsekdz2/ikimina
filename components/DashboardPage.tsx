
import React from 'react';
import { User, UserRole } from '../types';
import { SeekerDashboard } from './dashboards/SeekerDashboard';
import { EmployerDashboard } from './dashboards/EmployerDashboard';
import { FinancialPartnerDashboard } from './dashboards/FinancialPartnerDashboard';
import { TrainerDashboard } from './dashboards/TrainerDashboard';

interface DashboardPageProps {
  user: User;
}

const renderDashboard = (role: UserRole) => {
  switch (role) {
    case UserRole.SEEKER:
      return <SeekerDashboard />;
    case UserRole.EMPLOYER:
      return <EmployerDashboard />;
    case UserRole.FINANCIAL_PARTNER:
      return <FinancialPartnerDashboard />;
    case UserRole.TRAINER:
      return <TrainerDashboard />;
    default:
      return <div>Invalid user role</div>;
  }
};

export const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/80 pt-28 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
            <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Welcome, {user.name}</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">You are logged in as a <span className="font-semibold text-brand-green">{user.role}</span>.</p>
        </div>
        
        {renderDashboard(user.role)}
      </div>
    </div>
  );
};
