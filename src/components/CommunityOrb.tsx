import React, { useState } from 'react';
import { Users, X } from 'lucide-react';

interface CommunityOrbProps {
  isDark: boolean;
}

export const CommunityOrb: React.FC<CommunityOrbProps> = ({ isDark }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      {/* Draggable 3D Orb */}
      <div className="relative flex items-center justify-center">
        <div 
          className={`w-32 h-32 mx-auto rounded-full border-4 ${
            isDark 
              ? 'border-amber-400 bg-gradient-to-br from-amber-400/20 to-amber-400/5' 
              : 'border-purple-600 bg-gradient-to-br from-purple-600/20 to-purple-600/5'
          } backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg ${
            isDark ? 'hover:shadow-amber-400/50' : 'hover:shadow-purple-600/50'
          } group flex items-center justify-center`}
          onClick={() => setShowPopup(true)}
        >
          <Users className={`w-8 h-8 ${
            isDark ? 'text-amber-400' : 'text-purple-600'
          } group-hover:animate-pulse`} />
          
          {/* Tooltip */}
          <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded text-xs font-mono ${
            isDark 
              ? 'bg-amber-400 text-black' 
              : 'bg-purple-600 text-white'
          } opacity-0 group-hover:opacity-100 transition-opacity`}>
            join.orbit()
          </div>
        </div>
        
        {/* Orbital rings around orb */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`w-40 h-40 border ${
            isDark ? 'border-amber-400/20' : 'border-purple-600/20'
          } rounded-full animate-spin`} style={{ animationDuration: '10s' }} />
          <div className={`absolute w-48 h-48 border ${
            isDark ? 'border-amber-400/10' : 'border-purple-600/10'
          } rounded-full animate-spin`} style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        </div>
      </div>

      {/* Popup Command Window */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={`w-96 max-w-90vw ${
            isDark ? 'bg-black/95' : 'bg-white/95'
          } backdrop-blur-md rounded-lg border-2 ${
            isDark ? 'border-amber-400' : 'border-purple-600'
          } p-6`}>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className={`w-5 h-5 ${
                  isDark ? 'text-amber-400' : 'text-purple-600'
                }`} />
                <span className={`font-mono text-sm ${
                  isDark ? 'text-amber-400' : 'text-purple-600'
                }`}>
                  join.community()
                </span>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className={`p-1 rounded hover:bg-amber-400/10 ${
                  isDark ? 'text-amber-400' : 'text-purple-600'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                Welcome to the Orbit
              </div>
              
              <div className={`text-sm ${
                isDark ? 'text-white/70' : 'text-black/70'
              }`}>
                Join our community of Web3 learners and builders. Connect with fellow orbiters and explore the knowledge galaxy together.
              </div>

              <div className="space-y-3">
                {['Discord', 'Telegram', 'Twitter'].map((platform) => (
                  <button
                    key={platform}
                    className={`w-full p-3 rounded border-2 transition-all duration-200 ${
                      isDark 
                        ? 'border-amber-400/20 hover:border-amber-400/50 hover:bg-amber-400/5' 
                        : 'border-purple-600/20 hover:border-purple-600/50 hover:bg-purple-600/5'
                    }`}
                  >
                    <span className={`font-mono text-sm ${
                      isDark ? 'text-amber-400' : 'text-purple-600'
                    }`}>
                      {'>'} join.{platform.toLowerCase()}()
                    </span>
                  </button>
                ))}
              </div>

              <button
                className={`w-full p-3 rounded ${
                  isDark 
                    ? 'bg-amber-400 text-black hover:bg-amber-400/90' 
                    : 'bg-purple-600 text-white hover:bg-purple-600/90'
                } font-mono transition-all duration-200`}
              >
                {'>'} initiate()
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
