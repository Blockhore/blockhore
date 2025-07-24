import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: '/Home', href: '/' },
    { label: '/Blog', href: '/blog' },
    { label: '/About', href: '/about' },
    { label: '/Contact', href: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${
      isDark 
        ? 'bg-black/80 border-amber-400/20' 
        : 'bg-white/80 border-purple-600/20'
    } backdrop-blur-md border-b-2 transition-all duration-300`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/assets/logo.svg" 
                alt="Blockhore Logo" 
                className={`w-10h h-10 ${
                  isDark ? 'text-amber-400' : 'text-purple-600'
                }`}
                style={{ filter: isDark ? 'brightness(0) saturate(100%) invert(85%) sepia(95%) saturate(1347%) hue-rotate(359deg) brightness(102%) contrast(101%)' : 'brightness(0) saturate(100%) invert(25%) sepia(95%) saturate(2466%) hue-rotate(258deg) brightness(95%) contrast(101%)' }}
              />
              <span className={`text-xl font-bold font-mono ${
                isDark ? 'text-amber-400' : 'text-purple-600'
              }`}>
                
              </span>
            </Link>
          </div>

          {/* Desktop Navigation & Controls */}
          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`font-mono text-sm transition-all duration-200 hover:scale-105 ${
                    location.pathname === item.href
                      ? isDark 
                        ? 'text-amber-400' 
                        : 'text-purple-600'
                      : 
                    isDark 
                      ? 'text-white/80 hover:text-amber-400' 
                      : 'text-black/80 hover:text-purple-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Light/Dark Toggle */}
            <button
              onClick={onToggleTheme}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 hover:scale-105 flex-shrink-0 ${
                isDark 
                  ? 'border-amber-400/30 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20' 
                  : 'border-purple-600/30 bg-purple-600/10 text-purple-600 hover:bg-purple-600/20'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="text-xs font-mono hidden sm:inline">
                {isDark ? 'Light' : 'Dark'}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg border transition-all duration-300 ${
                isDark 
                  ? 'border-amber-400/30 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20' 
                  : 'border-purple-600/30 bg-purple-600/10 text-purple-600 hover:bg-purple-600/20'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden mt-4 pt-4 border-t ${
            isDark ? 'border-amber-400/20' : 'border-purple-600/20'
          }`}>
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-mono text-sm py-2 px-3 rounded transition-all duration-200 ${
                    location.pathname === item.href
                      ? isDark 
                        ? 'text-amber-400 bg-amber-400/10' 
                        : 'text-purple-600 bg-purple-600/10'
                      : 
                    isDark 
                      ? 'text-white/80 hover:text-amber-400 hover:bg-amber-400/10' 
                      : 'text-black/80 hover:text-purple-600 hover:bg-purple-600/10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
