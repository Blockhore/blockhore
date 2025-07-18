import React, { useState, useEffect } from 'react';
import { Sun, Moon, BookOpen, Users, Zap, Globe, Twitter, MessageCircle, Github, Linkedin } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LoadingScreen } from './components/LoadingScreen';
import { TypewriterText } from './components/TypewriterText';
import { OrbitalStars } from './components/OrbitalStars';
import { FeatureModule } from './components/FeatureModule';
import { KnowledgeFeed } from './components/KnowledgeFeed';
import { CommunityOrb } from './components/CommunityOrb';
import { OrbitingPartners } from './components/OrbitingPartners';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
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

  const terminalTexts = [
    'Initializing Blockhore Protocol...',
    'Syncing with Knowledge Layer...',
    'Connecting to Web3 Nodes...',
    'System Online. Welcome to the Orbit.'
  ];

  const features = [
    {
      title: 'From Zero to Degen',
      command: 'learn()',
      description: 'Comprehensive Web3 education from basics to advanced concepts',
      icon: BookOpen
    },
    {
      title: 'Active & Chill Community',
      command: 'discuss()',
      description: 'Connect with fellow learners and industry experts',
      icon: Users
    },
    {
      title: 'Web3 Jobs & Airdrops',
      command: 'sync()',
      description: 'Stay updated with opportunities and latest news',
      icon: Zap
    },
    {
      title: 'Global Network',
      command: 'connect()',
      description: 'Access worldwide blockchain communities and resources',
      icon: Globe
    }
  ];

  return (
    <Router>
      {/* Loading Screen */}
      {showLoading && (
        <LoadingScreen isDark={isDark} onComplete={handleLoadingComplete} />
      )}
      
      {/* Main App */}
      <Routes>
        {/* Home Route */}
        <Route path="/" element={
          <div className={`min-h-screen transition-all duration-500 ${
            isDark 
              ? 'bg-black text-white' 
              : 'bg-white text-black'
          } ${showLoading ? 'opacity-0' : 'opacity-100'}`}>
            
            {/* Navbar */}
            <Navbar isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />
          
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
              <OrbitalStars />
            
              <div className="relative z-10 text-center px-6">
                <div className={`mb-8 transition-all duration-1000 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <h1 className={`text-6xl md:text-8xl font-bold mb-6 terminal-glow ${
                    isDark ? 'text-amber-400' : 'text-purple-600'
                  }`}>
                    BLOCKHORE
                  </h1>
                
                  <div className={`text-xl md:text-2xl mb-8 font-mono ${
                    isDark ? 'text-white/80' : 'text-black/80'
                  }`}>
                    <TypewriterText texts={terminalTexts} />
                  </div>
                
                  <div className={`text-lg mb-12 ${
                    isDark ? 'text-white/60' : 'text-black/60'
                  }`}>
                    Orbiting Education. Attracting Innovation.
                  </div>
                
                  <button className={`px-8 py-4 rounded-lg font-mono text-lg transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? 'bg-amber-400 text-black hover:bg-amber-400/90' 
                      : 'bg-purple-600 text-white hover:bg-purple-600/90'
                  }`}>
                    {'> enter.blockhore()'}
                  </button>
                </div>
              </div>
            </section>

            {/* Feature Modules */}
            <section className="py-20 px-6">
              <div className="max-w-6xl mx-auto">
                <div className={`text-center mb-16 ${
                  isDark ? 'text-amber-400' : 'text-purple-600'
                }`}>
                  <h2 className="text-3xl font-bold font-mono mb-4">System.Modules()</h2>
                  <div className={`text-sm ${
                    isDark ? 'text-white/60' : 'text-black/60'
                  }`}>
                    Initializing core functionalities...
                  </div>
                </div>
              
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {features.map((feature, index) => (
                    <FeatureModule
                      key={feature.command}
                      {...feature}
                      isDark={isDark}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Knowledge Feed */}
            <section className="py-20 px-6">
              <div className="max-w-4xl mx-auto">
                <div className={`text-center mb-16 ${
                  isDark ? 'text-amber-400' : 'text-purple-600'
                }`}>
                  <h2 className="text-3xl font-bold font-mono mb-4">Knowledge.Stream()</h2>
                  <div className={`text-sm ${
                    isDark ? 'text-white/60' : 'text-black/60'
                  }`}>
                    Latest transmissions from the knowledge layer...
                  </div>
                </div>
              
                <KnowledgeFeed isDark={isDark} />
              
                {/* See All Articles Button */}
                <div className="text-center mt-8">
                  <Link
                    to="/blog"
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-mono text-sm transition-all duration-300 hover:scale-105 ${
                      isDark 
                        ? 'border-amber-400/30 text-amber-400 hover:border-amber-400 hover:bg-amber-400/10' 
                        : 'border-purple-600/30 text-purple-600 hover:border-purple-600 hover:bg-purple-600/10'
                    }`}
                  >
                    <span>/see_all_articles</span>
                    <span className={`text-xs ${
                      isDark ? 'text-white/50' : 'text-black/50'
                    }`}>
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </section>

            {/* Community Section */}
            <section className="py-20 px-6">
              <div className="max-w-4xl mx-auto text-center">
                <div className={`mb-16 ${
                  isDark ? 'text-amber-400' : 'text-purple-600'
                }`}>
                  <h2 className="text-3xl font-bold font-mono mb-4">Community.Orbit()</h2>
                  <div className={`text-sm ${
                    isDark ? 'text-white/60' : 'text-black/60'
                  }`}>
                    Join the orbital community of Web3 explorers...
                  </div>
                </div>
              
                <CommunityOrb isDark={isDark} />
              </div>
            </section>

            {/* Partners */}
            <section className="py-20 px-6">
              <div className="max-w-6xl mx-auto text-center">
                <div className={`mb-16 ${
                  isDark ? 'text-amber-400' : 'text-purple-600'
                }`}>
                  <h2 className="text-3xl font-bold font-mono mb-4">Partner.Network()</h2>
                  <div className={`text-sm ${
                    isDark ? 'text-white/60' : 'text-black/60'
                  }`}>
                    Integrated with leading blockchain protocols...
                  </div>
                </div>
              
                <OrbitingPartners isDark={isDark} />
              </div>
            </section>

            {/* Footer */}
            <footer className={`py-12 px-6 border-t-2 ${
              isDark 
                ? 'border-amber-400/20 bg-black/40' 
                : 'border-purple-600/20 bg-white/40'
            } backdrop-blur-sm`}>
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <div className={`font-mono text-sm ${
                    isDark ? 'text-amber-400' : 'text-purple-600'
                  }`}>
                    Blockhore.Orbit // Build 2025.07.15 // All nodes secure.
                  </div>
                </div>
              
                <div className="flex justify-center gap-6">
                  {[
                    { icon: Twitter, label: 'Twitter' },
                    { icon: MessageCircle, label: 'Discord' },
                    { icon: Github, label: 'Github' },
                    { icon: Linkedin, label: 'LinkedIn' }
                  ].map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      className={`p-3 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                        isDark 
                          ? 'border-amber-400/20 hover:border-amber-400 hover:bg-amber-400/10' 
                          : 'border-purple-600/20 hover:border-purple-600 hover:bg-purple-600/10'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${
                        isDark ? 'text-amber-400' : 'text-purple-600'
                      }`} />
                    </button>
                  ))}
                </div>
                
                <div className={`text-center mt-8 text-sm ${
                  isDark ? 'text-white/50' : 'text-black/50'
                }`}>
                  © 2025 Blockhore. All rights reserved.
                </div>
                
              </div>
            </footer>
          </div>
        } />
        
        {/* Blog Routes */}
        <Route path="/blog" element={
          <>
            <Navbar isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />
            <BlogPage isDark={isDark} />
          </>
        } />
        <Route path="/blog/:slug" element={
          <>
            <Navbar isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />
            <BlogPostPage isDark={isDark} />
          </>
        } />
        
        {/* About Route */}
        <Route path="/about" element={
          <>
            <Navbar isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />
            <AboutPage isDark={isDark} />
          </>
        } />
        
        {/* Contact Route */}
        <Route path="/contact" element={
          <>
            <Navbar isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />
            <ContactPage isDark={isDark} />
          </>
        } />
        
        {/* 404 Not Found Route */}
        <Route path="*" element={
          <>
            <Navbar isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />
            <NotFoundPage isDark={isDark} />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
