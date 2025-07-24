import React from 'react';
import { useState, useEffect } from 'react';
import { Clock, ExternalLink, RefreshCw } from 'lucide-react';
import { articleService, ExternalArticle } from '../../services/articleService';

interface KnowledgeFeedProps {
  isDark: boolean;
}

export const KnowledgeFeed: React.FC<KnowledgeFeedProps> = ({ isDark }) => {
  const [articles, setArticles] = useState<ExternalArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadArticles = async () => {
    try {
      const fetchedArticles = await articleService.fetchArticles(5);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await articleService.refreshCache();
      await loadArticles();
    } catch (error) {
      console.error('Error refreshing articles:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  useEffect(() => {
    loadArticles();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(loadArticles, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`rounded-lg border-2 ${
      isDark 
        ? 'border-amber-400/20 bg-black/40' 
        : 'border-purple-600/20 bg-white/40'
    } backdrop-blur-sm p-6`}>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            isDark ? 'bg-amber-400' : 'bg-purple-600'
          } animate-pulse`} />
          <span className={`font-mono text-sm ${
            isDark ? 'text-amber-400' : 'text-purple-600'
          }`}>
            knowledge.feed()
          </span>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className={`p-2 rounded border transition-all duration-200 hover:scale-110 ${
            isDark 
              ? 'border-amber-400/30 text-amber-400 hover:bg-amber-400/10' 
              : 'border-purple-600/30 text-purple-600 hover:bg-purple-600/10'
          } disabled:opacity-50`}
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`p-4 rounded border animate-pulse ${
              isDark ? 'border-amber-400/10 bg-amber-400/5' : 'border-purple-600/10 bg-purple-600/5'
            }`}>
              <div className="flex gap-4">
                <div className={`w-20 h-20 rounded-lg ${
                  isDark ? 'bg-amber-400/20' : 'bg-purple-600/20'
                }`} />
                <div className="flex-1 space-y-2">
                  <div className={`h-4 rounded ${
                    isDark ? 'bg-amber-400/20' : 'bg-purple-600/20'
                  }`} />
                  <div className={`h-3 rounded w-3/4 ${
                    isDark ? 'bg-amber-400/20' : 'bg-purple-600/20'
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
      <div className="space-y-4">
        {articles.map((article, index) => (
          <a
            key={article.id}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group p-4 rounded border transition-all duration-200 cursor-pointer ${
              isDark 
                ? 'border-amber-400/10 hover:border-amber-400/30 hover:bg-amber-400/5' 
                : 'border-purple-600/10 hover:border-purple-600/30 hover:bg-purple-600/5'
            } block`}
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
                    [{article.source}]
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
                      <Clock className={`w-3 h-3 ${
                        isDark ? 'text-white/50' : 'text-black/50'
                      }`} />
                      <span className={`${
                        isDark ? 'text-white/50' : 'text-black/50'
                      }`}>
                        {formatTimeAgo(article.pubDate)}
                      </span>
                    </div>
                  </div>
                  
                  <ExternalLink className={`w-4 h-4 ${
                    isDark ? 'text-white/30' : 'text-black/30'
                  } group-hover:${isDark ? 'text-amber-400' : 'text-purple-600'} transition-colors`} />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      )}
    </div>
  );
};
