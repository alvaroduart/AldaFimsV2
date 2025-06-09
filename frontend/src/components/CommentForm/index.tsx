import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { LayoutContainer, MainContent } from './styles';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <LayoutContainer isDarkMode={isDarkMode}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
