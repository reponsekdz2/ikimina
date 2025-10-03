import React from 'react';
import { User } from '../../types';
import { SeekerDashboard } from '../dashboards/SeekerDashboard';
import { EmployerDashboard } from '../dashboards/EmployerDashboard';

interface DashboardOverviewPageProps {
  user: User;
}

export const DashboardOverviewPage: React.FC<DashboardOverviewPageProps> = ({ user }) => {
  return (
    <>
      <div className="mb-8">
          <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">Welcome back, {user.name}!</p>
      </div>
      {user.role === 'Job Seeker' ? <SeekerDashboard /> : <EmployerDashboard />}
    </>
  );
};
