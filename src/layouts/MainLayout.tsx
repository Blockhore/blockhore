import React from 'react';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  isDark, 
  onToggleTheme 
}) => {
  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      <Navbar isDark={isDark} onToggleTheme={onToggleTheme} />
      <main>
        {children}
      </main>
      <Footer isDark={isDark} />
    </div>
  );
};
