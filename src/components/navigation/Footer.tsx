import React from 'react';
import { Twitter, MessageCircle, Github, Linkedin } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDark }) => {
  return (
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
  );
};
