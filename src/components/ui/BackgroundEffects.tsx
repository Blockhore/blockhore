import React from 'react';

interface BackgroundEffectsProps {
  isDark: boolean;
  particleCount?: number;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ 
  isDark, 
  particleCount = 30 
}) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating Particles */}
      {Array.from({ length: particleCount }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 ${
            isDark ? 'bg-amber-400' : 'bg-purple-600'
          } rounded-full animate-pulse`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

export const OrbitalStars: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
      
      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 border border-amber-400/10 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute w-80 h-80 border border-amber-400/5 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        <div className="absolute w-64 h-64 border border-amber-400/5 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
      </div>
    </div>
  );
};
