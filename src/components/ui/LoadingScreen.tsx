import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  isDark: boolean;
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isDark, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingSteps = [
    'Initializing Blockhore Protocol...',
    'Connecting to Web3 Nodes...',
    'Syncing with Knowledge Layer...',
    'Loading Orbital Systems...',
    'Establishing Secure Connection...',
    'System Online. Welcome to the Orbit.'
  ];

  useEffect(() => {
    const stepDuration = 500; // 500ms per step
    const totalDuration = stepDuration * loadingSteps.length;

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 300); // Small delay before hiding
          return 100;
        }
        return prev + (100 / (totalDuration / 50)); // Update every 50ms
      });
    }, 50);

    // Step animation
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [onComplete, loadingSteps.length]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${
      isDark ? 'bg-black' : 'bg-white'
    } transition-all duration-500`}>
      
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 ${
              isDark ? 'bg-amber-400' : 'bg-purple-600'
            } rounded-full animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-md w-full">
        
        {/* Logo with pulse animation */}
        <div className="mb-8">
          <img 
            src="/assets/logo.svg" 
            alt="Blockhore Logo" 
            className="mx-auto animate-pulse"
            style={{ 
              filter: isDark 
                ? 'brightness(0) saturate(100%) invert(85%) sepia(95%) saturate(1347%) hue-rotate(359deg) brightness(102%) contrast(101%)' 
                : 'brightness(0) saturate(100%) invert(25%) sepia(95%) saturate(2466%) hue-rotate(258deg) brightness(95%) contrast(101%)'
            }}
          />
        </div>

        {/* Loading steps */}
        <div className="mb-8 h-6">
          <div className={`font-mono text-sm transition-all duration-300 ${
            isDark ? 'text-white/80' : 'text-black/80'
          }`}>
            {loadingSteps[currentStep]}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className={`w-full h-2 rounded-full ${
            isDark ? 'bg-white/10' : 'bg-black/10'
          } overflow-hidden`}>
            <div
              className={`h-full rounded-full transition-all duration-100 ${
                isDark 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500' 
                  : 'bg-gradient-to-r from-purple-600 to-purple-700'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={`text-xs font-mono mt-2 ${
            isDark ? 'text-white/60' : 'text-black/60'
          }`}>
            {Math.round(progress)}%
          </div>
        </div>

        {/* Terminal-style loading dots */}
        <div className="flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                isDark ? 'bg-amber-400' : 'bg-purple-600'
              } animate-bounce`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Command line style indicator */}
        <div className={`mt-6 font-mono text-xs ${
          isDark ? 'text-amber-400/70' : 'text-purple-600/70'
        }`}>
          $ blockhore.init() --mode=orbital
        </div>
      </div>
    </div>
  );
};
