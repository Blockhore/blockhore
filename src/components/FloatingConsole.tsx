import React, { useState } from 'react';
import { Terminal, X } from 'lucide-react';

interface FloatingConsoleProps {
  isDark: boolean;
}

export const FloatingConsole: React.FC<FloatingConsoleProps> = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { command: '/home', label: 'Home', description: 'Return to base' },
    { command: '/docs', label: 'Documentation', description: 'Knowledge base' },
    { command: '/blog', label: 'Blog', description: 'Latest updates' },
    { command: '/join.community', label: 'Community', description: 'Connect with others' },
    { command: '/system/about', label: 'About', description: 'System info' }
  ];

  return (
    <>
      {/* Floating Command Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-6 left-6 z-50 w-12 h-12 rounded-full border-2 ${
          isDark 
            ? 'bg-black/80 border-amber-400 text-amber-400 hover:bg-amber-400/10' 
            : 'bg-white/80 border-purple-600 text-purple-600 hover:bg-purple-600/10'
        } backdrop-blur-sm transition-all duration-300 flex items-center justify-center group hover:scale-110`}
      >
        <Terminal className="w-5 h-5 group-hover:animate-pulse" />
      </button>

      {/* Console Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Console Panel */}
          <div className={`w-80 h-full ${
            isDark ? 'bg-black/95' : 'bg-white/95'
          } backdrop-blur-md border-l-2 ${
            isDark ? 'border-amber-400' : 'border-purple-600'
          } transform transition-transform duration-300 ease-out`}>
            
            {/* Console Header */}
            <div className={`p-6 border-b ${
              isDark ? 'border-amber-400/30' : 'border-purple-600/30'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className={`w-5 h-5 ${
                    isDark ? 'text-amber-400' : 'text-purple-600'
                  }`} />
                  <span className={`font-mono text-sm ${
                    isDark ? 'text-amber-400' : 'text-purple-600'
                  }`}>
                    blockhore.console
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-1 rounded hover:bg-amber-400/10 ${
                    isDark ? 'text-amber-400' : 'text-purple-600'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Console Content */}
            <div className="p-6 space-y-4">
              <div className={`text-xs font-mono ${
                isDark ? 'text-amber-400/70' : 'text-purple-600/70'
              }`}>
                $ navigating blockhore.orbit
              </div>
              
              {navItems.map((item, index) => (
                <div
                  key={item.command}
                  className={`group cursor-pointer p-3 rounded border transition-all duration-200 ${
                    isDark 
                      ? 'border-amber-400/20 hover:border-amber-400/50 hover:bg-amber-400/5' 
                      : 'border-purple-600/20 hover:border-purple-600/50 hover:bg-purple-600/5'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`font-mono text-sm ${
                    isDark ? 'text-amber-400' : 'text-purple-600'
                  }`}>
                    {item.command}
                  </div>
                  <div className={`text-xs mt-1 ${
                    isDark ? 'text-white/70' : 'text-black/70'
                  }`}>
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
