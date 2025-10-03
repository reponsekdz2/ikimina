import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { DashboardPage } from './components/DashboardPage';
import { JobsPage } from './components/pages/JobsPage';
import { SavingsPage } from './components/pages/SavingsPage';
import { TrainingPage } from './components/pages/TrainingPage';
import { CommunityPage } from './components/pages/CommunityPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { UserRole, User, Page, Notification } from './types';
import { useDarkMode } from './hooks/useDarkMode';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [initialRole, setInitialRole] = useState<UserRole>(UserRole.SEEKER);
  const [theme, toggleTheme] = useDarkMode();

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: 'Your application for Frontend Developer was viewed.', time: '2 hours ago', read: false },
    { id: 2, message: 'New job matched your profile: UI/UX Designer.', time: '1 day ago', read: false },
    { id: 3, message: 'Welcome to KaziConnect! Complete your profile to get started.', time: '3 days ago', read: true },
  ]);

  const handleNotificationRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  useEffect(() => {
    document.body.classList.add('transition-colors', 'duration-500');
  }, []);

  const handleRoleSelection = (role: UserRole) => {
    setInitialRole(role);
    setCurrentPage(Page.AUTH);
  };

  const handleLogin = (role: UserRole, name?: string) => {
    const userName = name || (role === UserRole.SEEKER ? 'Aline U.' : 'Kigali Corp');
    setCurrentUser({ role, name: userName });
    setIsAuthenticated(true);
    setCurrentPage(Page.DASHBOARD);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentPage(Page.LANDING);
  };

  const handleNavigation = (page: Page) => {
    const protectedPages = [Page.DASHBOARD, Page.JOBS, Page.SAVINGS, Page.TRAINING, Page.COMMUNITY, Page.PROFILE, Page.CV_BUILDER, Page.PITCH_ZONE];
    if (protectedPages.includes(page) && !isAuthenticated) {
      setCurrentPage(Page.LANDING);
    } else {
      setCurrentPage(page);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case Page.AUTH:
        return <AuthPage initialRole={initialRole} onLogin={handleLogin} />;
      case Page.DASHBOARD:
        return currentUser ? <DashboardPage user={currentUser} /> : <LandingPage onSelectRole={handleRoleSelection} />;
      case Page.JOBS:
        return <JobsPage />;
      case Page.SAVINGS:
        return <SavingsPage />;
      case Page.TRAINING:
        return <TrainingPage />;
      case Page.COMMUNITY:
        return <CommunityPage onNavigate={handleNavigation} />;
      case Page.PROFILE:
         return currentUser ? <ProfilePage user={currentUser} onNavigate={handleNavigation} /> : <LandingPage onSelectRole={handleRoleSelection} />;
      case Page.CV_BUILDER:
         return currentUser ? <ProfilePage user={currentUser} onNavigate={handleNavigation} /> : <LandingPage onSelectRole={handleRoleSelection} />; // Or a dedicated CV builder page
      case Page.PITCH_ZONE:
        return <CommunityPage onNavigate={handleNavigation} />; // Simplified to be part of community
      case Page.LANDING:
      default:
        return <LandingPage onSelectRole={handleRoleSelection} />;
    }
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
            notifications={notifications}
            onNotificationRead={handleNotificationRead}
        />
        <main className="min-h-screen">
          {renderCurrentPage()}
        </main>
        <Footer onNavigate={handleNavigation} />
      </div>
    </div>
  );
};

export default App;
