import React from 'react';
import { Clock, ExternalLink, User } from 'lucide-react';

interface KnowledgeFeedProps {
  isDark: boolean;
}

export const KnowledgeFeed: React.FC<KnowledgeFeedProps> = ({ isDark }) => {
  const articles = [
    {
      id: 'block-452',
      title: 'Crypto & Green Economy',
      timeAgo: '2 days ago',
      category: 'DEFI',
      author: 'Alex Chen',
      date: 'July 13, 2025',
      description: 'Exploring how cryptocurrency projects are integrating sustainable practices and carbon-neutral solutions.',
      thumbnail: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'block-453',
      title: 'Latest Airdrops: July 2025',
      timeAgo: '1 day ago',
      category: 'AIRDROPS',
      author: 'Sarah Kim',
      date: 'July 14, 2025',
      description: 'Comprehensive guide to the most promising airdrops and token distributions happening this month.',
      thumbnail: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'block-454',
      title: 'Web3 vs AI: The Integration',
      timeAgo: '3 hours ago',
      category: 'TECH',
      author: 'Marcus Rodriguez',
      date: 'July 15, 2025',
      description: 'How artificial intelligence is revolutionizing blockchain technology and creating new possibilities.',
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'block-455',
      title: 'Layer 2 Solutions Deep Dive',
      timeAgo: '5 hours ago',
      category: 'LAYER2',
      author: 'Emma Thompson',
      date: 'July 15, 2025',
      description: 'Technical analysis of the latest Layer 2 scaling solutions and their impact on transaction costs.',
      thumbnail: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'block-456',
      title: 'NFT Utilities in 2025',
      timeAgo: '8 hours ago',
      category: 'NFT',
      author: 'David Park',
      date: 'July 15, 2025',
      description: 'Beyond digital art: exploring real-world utilities and practical applications of NFT technology.',
      thumbnail: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className={`rounded-lg border-2 ${
      isDark 
        ? 'border-amber-400/20 bg-black/40' 
        : 'border-purple-600/20 bg-white/40'
    } backdrop-blur-sm p-6`}>
      
      <div className="flex items-center gap-2 mb-6">
        <div className={`w-2 h-2 rounded-full ${
          isDark ? 'bg-amber-400' : 'bg-purple-600'
        } animate-pulse`} />
        <span className={`font-mono text-sm ${
          isDark ? 'text-amber-400' : 'text-purple-600'
        }`}>
          knowledge.feed()
        </span>
      </div>

      <div className="space-y-4">
        {articles.map((article, index) => (
          <div
            key={article.id}
            className={`group p-4 rounded border transition-all duration-200 cursor-pointer ${
              isDark 
                ? 'border-amber-400/10 hover:border-amber-400/30 hover:bg-amber-400/5' 
                : 'border-purple-600/10 hover:border-purple-600/30 hover:bg-purple-600/5'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex gap-4">
              {/* Thumbnail */}
              <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover transition-all duration-300 filter grayscale group-hover:grayscale-0"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`font-mono text-xs ${
                    isDark ? 'text-amber-400/70' : 'text-purple-600/70'
                  }`}>
                    [{article.id}]
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    isDark 
                      ? 'bg-amber-400/20 text-amber-400' 
                      : 'bg-purple-600/20 text-purple-600'
                  }`}>
                    {article.category}
                  </span>
                </div>
                
                <h4 className={`font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-black'
                } line-clamp-1`}>
                  {article.title}
                </h4>
                
                <p className={`text-sm mb-3 ${
                  isDark ? 'text-white/70' : 'text-black/70'
                } line-clamp-2`}>
                  {article.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <User className={`w-3 h-3 ${
                        isDark ? 'text-white/50' : 'text-black/50'
                      }`} />
                      <span className={`${
                        isDark ? 'text-white/50' : 'text-black/50'
                      }`}>
                        {article.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className={`w-3 h-3 ${
                        isDark ? 'text-white/50' : 'text-black/50'
                      }`} />
                      <span className={`${
                        isDark ? 'text-white/50' : 'text-black/50'
                      }`}>
                        {article.date}
                      </span>
                    </div>
                  </div>
                  
                  <ExternalLink className={`w-4 h-4 ${
                    isDark ? 'text-white/30' : 'text-black/30'
                  } group-hover:${isDark ? 'text-amber-400' : 'text-purple-600'} transition-colors`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
