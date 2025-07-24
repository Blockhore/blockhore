import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureModuleProps {
  title: string;
  command: string;
  description: string;
  icon: LucideIcon;
  isDark: boolean;
}

export const FeatureModule: React.FC<FeatureModuleProps> = ({
  title,
  command,
  description,
  icon: Icon,
  isDark
}) => {
  return (
    <div className={`group relative p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
      isDark 
        ? 'border-amber-400/20 bg-black/40 hover:border-amber-400/50 hover:bg-amber-400/5' 
        : 'border-purple-600/20 bg-white/40 hover:border-purple-600/50 hover:bg-purple-600/5'
    } backdrop-blur-sm hover:scale-105`}>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isDark 
          ? 'bg-gradient-to-r from-amber-400/5 to-amber-400/10' 
          : 'bg-gradient-to-r from-purple-600/5 to-purple-600/10'
      }`} />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <Icon className={`w-6 h-6 ${
            isDark ? 'text-amber-400' : 'text-purple-600'
          } group-hover:animate-pulse`} />
          <span className={`font-mono text-sm ${
            isDark ? 'text-amber-400' : 'text-purple-600'
          }`}>
            {command}
          </span>
        </div>
        
        <h3 className={`text-xl font-bold mb-2 ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          {title}
        </h3>
        
        <p className={`text-sm ${
          isDark ? 'text-white/70' : 'text-black/70'
        }`}>
          {description}
        </p>
      </div>
    </div>
  );
};
