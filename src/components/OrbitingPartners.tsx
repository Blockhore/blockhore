import React from 'react';

interface OrbitingPartnersProps {
  isDark: boolean;
}

export const OrbitingPartners: React.FC<OrbitingPartnersProps> = ({ isDark }) => {
  const partners = [
    { name: 'Ethereum', logo: 'Ξ' },
    { name: 'Polygon', logo: '⬟' },
    { name: 'Solana', logo: '◎' },
    { name: 'Avalanche', logo: '▲' },
    { name: 'Chainlink', logo: '⬢' },
    { name: 'Uniswap', logo: '🦄' }
  ];

  return (
    <div className="relative w-full h-32 mx-auto overflow-hidden">
      {/* Horizontal moving partners */}
      <div className="flex items-center h-full">
        <div className="flex animate-scroll-horizontal hover:pause-animation" style={{ width: 'calc(200% + 32px)' }}>
          {/* Triple the partners for seamless loop */}
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={`partner-${index}`}
              className={`relative flex-shrink-0 w-20 h-20 mx-4 rounded-lg ${
                isDark 
                  ? 'bg-black/60 hover:bg-black/80' 
                  : 'bg-white/60 hover:bg-white/80'
              } backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 group`}
            >
              {/* Glow effect behind logo */}
              <div className={`absolute inset-0 rounded-lg ${
                isDark 
                  ? 'bg-amber-400/20 shadow-lg shadow-amber-400/30' 
                  : 'bg-purple-600/20 shadow-lg shadow-purple-600/30'
              } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <span className={`text-xl ${
                isDark ? 'text-amber-400' : 'text-purple-600'
              } group-hover:animate-pulse`}>
                {partner.logo}
              </span>
              
              {/* Tooltip */}
              <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-mono ${
                isDark 
                  ? 'bg-amber-400 text-black' 
                  : 'bg-purple-600 text-white'
              } opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10`}>
                {partner.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
