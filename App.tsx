import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { DashboardLayout } from './components/DashboardPage';
import { DashboardOverviewPage } from './components/pages/DashboardOverviewPage';
import { JobsPage } from './components/pages/JobsPage';
import { TrainingPage } from './components/pages/TrainingPage';
import { CommunityPage } from './components/pages/CommunityPage';
import { ProfilePage } from './components/pages/ProfilePage';

import { UserRole, User, Page } from './types';
import { useDarkMode } from './hooks/useDarkMode';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [initialRole, setInitialRole] = useState<UserRole>(UserRole.SEEKER);
  const [theme, toggleTheme] = useDarkMode();

  useEffect(() => {
    document.body.classList.add('transition-colors', 'duration-500');
  }, []);

  const handleRoleSelection = (role: UserRole) => {
    setInitialRole(role);
    setAuthModalOpen(true);
  };

  const handleLogin = (role: UserRole, name?: string) => {
    const userName = name || (role === UserRole.SEEKER ? 'Aline U.' : 'Kigali Corp');
    setCurrentUser({ role, name: userName });
    setIsAuthenticated(true);
    setAuthModalOpen(false);
    setCurrentPage(Page.DASHBOARD);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentPage(Page.LANDING);
  };

  const handleNavigation = (page: Page) => {
    if (!isAuthenticated && page !== Page.LANDING) {
      setCurrentPage(Page.LANDING);
    } else {
      setCurrentPage(page);
    }
  };

  const renderAuthenticatedPage = () => {
    if (!currentUser) return <LandingPage onSelectRole={handleRoleSelection} />;
    
    let pageContent;
    switch (currentPage) {
        case Page.JOBS:
            pageContent = <JobsPage userRole={currentUser.role} />;
            break;
        case Page.TRAINING:
            pageContent = <TrainingPage />;
            break;
        case Page.COMMUNITY:
            pageContent = <CommunityPage />;
            break;
        case Page.PROFILE:
            pageContent = <ProfilePage />;
            break;
        case Page.DASHBOARD:
        default:
            pageContent = <DashboardOverviewPage user={currentUser} />;
    }

    return (
      <DashboardLayout user={currentUser} activePage={currentPage} onNavigate={handleNavigation}>
        {pageContent}
      </DashboardLayout>
    );
  };

  return (
    <div className={`font-sans text-gray-800 dark:text-gray-200 ${theme}`}>
      <div className="bg-white dark:bg-gray-900">
        <Header 
            isAuthenticated={isAuthenticated}
            user={currentUser}
            onNavigate={handleNavigation}
            onLogout={handleLogout}
            theme={theme}
            toggleTheme={toggleTheme}
        />
        <main className="min-h-screen">
          {isAuthenticated ? renderAuthenticatedPage() : <LandingPage onSelectRole={handleRoleSelection} />}
        </main>
        {isAuthModalOpen && <AuthModal initialRole={initialRole} onLogin={handleLogin} onClose={() => setAuthModalOpen(false)}/>}
        {!isAuthenticated && <Footer />}
      </div>
    </div>
  );
};

export default App;