import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Zap, Globe } from 'lucide-react';
import { TypewriterText } from '../components/ui/TypewriterText';
import { OrbitalStars } from '../components/ui/BackgroundEffects';
import { FeatureModule } from '../components/home/FeatureModule';
import { KnowledgeFeed } from '../components/home/KnowledgeFeed';
import { CommunityOrb } from '../components/home/CommunityOrb';
import { OrbitingPartners } from '../components/home/OrbitingPartners';

interface HomePageProps {
  isDark: boolean;
  isLoaded: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ isDark, isLoaded }) => {
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
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
    </div>
  );
};
