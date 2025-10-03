import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { DashboardLayout } from './components/DashboardPage';
import { AuthModal } from './components/AuthModal';
import { useDarkMode } from './hooks/useDarkMode';
import { User, Page, UserRole } from './types';
import { DashboardOverviewPage } from './components/pages/DashboardOverviewPage';
import { JobsPage } from './components/pages/JobsPage';
import { TrainingPage } from './components/pages/TrainingPage';
import { CommunityPage } from './components/pages/CommunityPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { IkiminaPage } from './components/pages/IkiminaPage';
import { WalletPage } from './components/pages/WalletPage';
import { EntrepreneurshipPage } from './components/pages/EntrepreneurshipPage';
import { Notification } from './components/common/Notification';


const App: React.FC = () => {
  const [theme, toggleTheme] = useDarkMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState<UserRole>(UserRole.SEEKER);
  const [notification, setNotification] = useState<{title: string, message: string} | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleLogin = (role: UserRole) => {
    // Mock login
    const mockUser: User = {
      id: '1',
      name: role === UserRole.SEEKER ? 'Gisa Chris' : 'Kigali Corp',
      role: role,
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    setCurrentPage(Page.DASHBOARD);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage(Page.LANDING);
  };

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
  };

  const openAuthModal = (role: UserRole) => {
    setAuthModalRole(role);
    setIsAuthModalOpen(true);
  };
  
  const showNotification = (title: string, message: string) => {
      setNotification({ title, message });
  }

  const renderPage = () => {
    if (!isAuthenticated || !user) {
      return <LandingPage onAuth={openAuthModal} />;
    }

    const pageContent = () => {
        switch(currentPage) {
            case Page.DASHBOARD:
                return <DashboardOverviewPage user={user} />;
            case Page.JOBS:
                return <JobsPage userRole={user.role} showNotification={showNotification} />;
            case Page.IKIMINA:
                return <IkiminaPage userRole={user.role} />;
            case Page.WALLET:
                return <WalletPage showNotification={showNotification} />;
            case Page.TRAINING:
                return <TrainingPage />;
            case Page.ENTREPRENEURSHIP:
                return <EntrepreneurshipPage userRole={user.role} />;
            case Page.COMMUNITY:
                return <CommunityPage />;
            case Page.PROFILE:
                return <ProfilePage user={user} />;
            default:
                return <DashboardOverviewPage user={user} />;
        }
    }

    return (
        <DashboardLayout user={user} activePage={currentPage} onNavigate={handleNavigation}>
            {pageContent()}
        </DashboardLayout>
    )
  };

  return (
    <div className={`${theme}`}>
      <div className="main-app-bg text-text-primary-light dark:text-text-primary-dark min-h-screen font-sans">
        <Header 
          isAuthenticated={isAuthenticated}
          user={user}
          onNavigate={handleNavigation}
          onLogout={handleLogout}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <main>
          {renderPage()}
        </main>
        {!isAuthenticated && <Footer />}
        {isAuthModalOpen && <AuthModal initialRole={authModalRole} onLogin={handleLogin} onClose={() => setIsAuthModalOpen(false)} />}
        {notification && <Notification title={notification.title} message={notification.message} onClose={() => setNotification(null)} />}
      </div>
    </div>
  );
};

export default App;