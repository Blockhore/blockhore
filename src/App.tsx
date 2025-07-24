import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Add custom cursor styles
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
      
      * {
        cursor: none !important;
        font-family: 'JetBrains Mono', monospace;
      }
      
      .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        mix-blend-mode: difference;
      }
      
      @keyframes orbit {
        0% { transform: translate(-50%, -50%) rotate(0deg) translateX(150px) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg) translateX(150px) rotate(-360deg); }
      }
      
      .terminal-glow {
        text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
      }
    `;
    document.head.appendChild(style);

    // Custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.background = isDark ? '#ffb300' : '#7c3aed';
    cursor.style.boxShadow = `0 0 20px ${isDark ? '#ffb300' : '#7c3aed'}`;
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
      document.head.removeChild(style);
    };
  }, [isDark]);

  // Handle loading completion
  const handleLoadingComplete = () => {
    setShowLoading(false);
    setTimeout(() => setIsLoaded(true), 300);
  };

  return (
    <Router>
      {/* Loading Screen */}
      {showLoading && (
        <LoadingScreen isDark={isDark} onComplete={handleLoadingComplete} />
      )}
      
      {/* Main App */}
      <div className={`transition-all duration-500 ${
        showLoading ? 'opacity-0' : 'opacity-100'
      }`}>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={
            <MainLayout isDark={isDark} onToggleTheme={() => setIsDark(!isDark)}>
              <HomePage isDark={isDark} isLoaded={isLoaded} />
            </MainLayout>
          } />
          
          {/* Blog Route */}
          <Route path="/blog" element={
            <MainLayout isDark={isDark} onToggleTheme={() => setIsDark(!isDark)}>
              <BlogPage isDark={isDark} />
            </MainLayout>
          } />
          
          {/* About Route */}
          <Route path="/about" element={
            <MainLayout isDark={isDark} onToggleTheme={() => setIsDark(!isDark)}>
              <AboutPage isDark={isDark} />
            </MainLayout>
          } />
          
          {/* Contact Route */}
          <Route path="/contact" element={
            <MainLayout isDark={isDark} onToggleTheme={() => setIsDark(!isDark)}>
              <ContactPage isDark={isDark} />
            </MainLayout>
          } />
          
          {/* 404 Not Found Route */}
          <Route path="*" element={
            <MainLayout isDark={isDark} onToggleTheme={() => setIsDark(!isDark)}>
              <NotFoundPage isDark={isDark} />
            </MainLayout>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
