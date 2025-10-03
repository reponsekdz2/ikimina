import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { DashboardPage } from './components/DashboardPage';
import { UserRole, User, Page } from './types';
import { useDarkMode } from './hooks/useDarkMode';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [initialRole, setInitialRole] = useState<UserRole>(UserRole.SEEKER);
  const [theme, toggleTheme] = useDarkMode();

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
    if (page === Page.DASHBOARD && !isAuthenticated) {
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
