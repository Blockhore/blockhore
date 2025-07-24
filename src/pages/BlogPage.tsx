import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Clock, Tag, TrendingUp, Calendar, RefreshCw, ExternalLink } from 'lucide-react';
import { articleService, ExternalArticle } from '../services/articleService';

interface BlogPageProps {
  isDark: boolean;
}

export const BlogPage: React.FC<BlogPageProps> = ({ isDark }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<ExternalArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    {
      id: 'DEFI',
      title: 'DeFi & Trading',
      description: 'Decentralized finance protocols, yield farming, and trading strategies',
      count: 42,
      color: 'from-blue-500 to-cyan-500',
      icon: '₿'
    },
    {
      id: 'NEWS',
      title: 'Crypto News',
      description: 'Latest cryptocurrency and blockchain news from around the world',
      count: 28,
      color: 'from-purple-500 to-pink-500',
      icon: '🎮'
    },
    {
      id: 'TECH',
      title: 'Blockchain Tech',
      description: 'Layer 2 solutions, consensus mechanisms, and protocol updates',
      count: 35,
      color: 'from-green-500 to-emerald-500',
      icon: '⚡'
    },
    {
      id: 'ANALYSIS',
      title: 'Market Analysis',
      description: 'In-depth market analysis and trading insights',
      count: 24,
      color: 'from-orange-500 to-red-500',
      icon: '📊'
    }
  ];

  const loadArticles = async () => {
    try {
      const fetchedArticles = await articleService.fetchArticles(50);
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

  const popularTags = [
    { name: 'ethereum', count: 45 },
    { name: 'defi', count: 38 },
    { name: 'layer2', count: 28 },
    { name: 'staking', count: 24 },
    { name: 'trading', count: 14 }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const articlesPerPage = 6;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  useEffect(() => {
    loadArticles();
    
    // Auto-refresh every 10 minutes
    const interval = setInterval(loadArticles, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen pt-20 ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 font-mono terminal-glow ${
            isDark ? 'text-amber-400' : 'text-purple-600'
          }`}>
            Knowledge.Blog()
          </h1>
          <p className={`text-lg mb-8 ${
            isDark ? 'text-white/70' : 'text-black/70'
          }`}>
            Deep dives into Web3, blockchain technology, and decentralized finance
          </p>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 ${
            isDark ? 'text-amber-400' : 'text-purple-600'
          }`}>
            <h2 className="text-2xl font-bold font-mono mb-4">Categories.Explore()</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`group relative p-8 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'border-amber-400/20 bg-black/40 hover:border-amber-400/50' 
                    : 'border-purple-600/20 bg-white/40 hover:border-purple-600/50'
                } backdrop-blur-sm`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${category.color} opacity-10`} />
                
                <div className="relative">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className={`text-xl font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-black'
                  }`}>
                    {category.title}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    isDark ? 'text-white/70' : 'text-black/70'
                  }`}>
                    {category.description}
                  </p>
                  <div className={`font-mono text-sm ${
                    isDark ? 'text-amber-400' : 'text-purple-600'
                  }`}>
                    {category.count} articles
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Articles Section */}
            <div className="flex-1">
              {/* Search and Filter */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      isDark ? 'text-amber-400' : 'text-purple-600'
                    }`} />
                    <input
                      type="text"
                      placeholder="search.articles()"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 font-mono text-sm transition-all duration-300 ${
                        isDark 
                          ? 'bg-black/60 border-amber-400/20 text-white placeholder-white/50 focus:border-amber-400' 
                          : 'bg-white/60 border-purple-600/20 text-black placeholder-black/50 focus:border-purple-600'
                      } backdrop-blur-sm focus:outline-none`}
                    />
                  </div>
                  
                  {/* Category Filter */}
                  <div className="relative">
                    <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      isDark ? 'text-amber-400' : 'text-purple-600'
                    }`} />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className={`pl-10 pr-8 py-3 rounded-lg border-2 font-mono text-sm transition-all duration-300 ${
                        isDark 
                          ? 'bg-black/60 border-amber-400/20 text-white focus:border-amber-400' 
                          : 'bg-white/60 border-purple-600/20 text-black focus:border-purple-600'
                      } backdrop-blur-sm focus:outline-none appearance-none cursor-pointer`}
                    >
                      <option value="all">all.categories()</option>
                      <option value="DEFI">defi.articles()</option>
                      <option value="NEWS">news.articles()</option>
                      <option value="TECH">tech.articles()</option>
                      <option value="ANALYSIS">analysis.articles()</option>
                    </select>
                  </div>
                
                  {/* Refresh Button */}
                  <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                      isDark 
                        ? 'border-amber-400/20 text-amber-400 hover:border-amber-400 hover:bg-amber-400/10' 
                        : 'border-purple-600/20 text-purple-600 hover:border-purple-600 hover:bg-purple-600/10'
                    } disabled:opacity-50`}
                  >
                    <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Articles Grid */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`p-6 rounded-lg border-2 animate-pulse ${
                      isDark 
                        ? 'border-amber-400/20 bg-black/40' 
                        : 'border-purple-600/20 bg-white/40'
                    } backdrop-blur-sm`}>
                      <div className={`w-full h-48 rounded-lg mb-4 ${
                        isDark ? 'bg-amber-400/20' : 'bg-purple-600/20'
                      }`} />
                      <div className={`h-4 rounded mb-3 ${
                        isDark ? 'bg-amber-400/20' : 'bg-purple-600/20'
                      }`} />
                      <div className={`h-3 rounded w-3/4 ${
                        isDark ? 'bg-amber-400/20' : 'bg-purple-600/20'
                      }`} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {paginatedArticles.map((article, index) => (
                    <article
                      key={article.id}
                      className={`group p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                        isDark 
                          ? 'border-amber-400/20 bg-black/40 hover:border-amber-400/50 hover:bg-amber-400/5' 
                          : 'border-purple-600/20 bg-white/40 hover:border-purple-600/50 hover:bg-purple-600/5'
                      } backdrop-blur-sm`}
                    >
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {/* Thumbnail */}
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <img
                            src={article.thumbnail}
                            alt={article.title}
                            className="w-full h-48 object-cover transition-all duration-300 filter grayscale group-hover:grayscale-0"
                          />
                        </div>
                        
                        {/* Category Badge */}
                        <div className="mb-3">
                          <span className={`text-xs px-2 py-1 rounded font-mono ${
                            isDark 
                              ? 'bg-amber-400/20 text-amber-400' 
                              : 'bg-purple-600/20 text-purple-600'
                          }`}>
                            {article.category.toUpperCase()}
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className={`text-lg font-bold mb-3 ${
                          isDark ? 'text-white' : 'text-black'
                        } line-clamp-2`}>
                          {article.title}
                        </h3>
                        
                        {/* Excerpt */}
                        <p className={`text-sm mb-4 ${
                          isDark ? 'text-white/70' : 'text-black/70'
                        } line-clamp-3`}>
                          {article.description}
                        </p>
                        
                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-4">
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
                          <div className="flex items-center gap-1">
                            <ExternalLink className={`w-3 h-3 ${
                              isDark ? 'text-white/50' : 'text-black/50'
                            }`} />
                            <span className={`text-xs ${
                              isDark ? 'text-white/50' : 'text-black/50'
                            }`}>
                              {article.source}
                            </span>
                          </div>
                        </div>
                      </a>
                    </article>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-mono text-sm transition-all duration-300 ${
                    currentPage === 1
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:scale-105'
                  } ${
                    isDark 
                      ? 'border-amber-400/20 text-amber-400 hover:border-amber-400 hover:bg-amber-400/10' 
                      : 'border-purple-600/20 text-purple-600 hover:border-purple-600 hover:bg-purple-600/10'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  prev()
                </button>
                
                <div className={`flex items-center gap-2 font-mono text-sm ${
                  isDark ? 'text-white/70' : 'text-black/70'
                }`}>
                  <span>page</span>
                  <span className={`${
                    isDark ? 'text-amber-400' : 'text-purple-600'
                  }`}>
                    {currentPage}
                  </span>
                  <span>of</span>
                  <span className={`${
                    isDark ? 'text-amber-400' : 'text-purple-600'
                  }`}>
                    {totalPages}
                  </span>
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-mono text-sm transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:scale-105'
                  } ${
                    isDark 
                      ? 'border-amber-400/20 text-amber-400 hover:border-amber-400 hover:bg-amber-400/10' 
                      : 'border-purple-600/20 text-purple-600 hover:border-purple-600 hover:bg-purple-600/10'
                  }`}
                >
                  next()
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              <div className="sticky top-24 space-y-6">
                
                {/* Popular Tags */}
                <div className={`p-6 rounded-lg border-2 ${
                  isDark 
                    ? 'border-amber-400/20 bg-black/40' 
                    : 'border-purple-600/20 bg-white/40'
                } backdrop-blur-sm`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className={`w-4 h-4 ${
                      isDark ? 'text-amber-400' : 'text-purple-600'
                    }`} />
                    <h3 className={`font-mono text-sm ${
                      isDark ? 'text-amber-400' : 'text-purple-600'
                    }`}>
                      popular.tags()
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <button
                        key={tag.name}
                        className={`text-xs px-3 py-2 rounded-full border transition-all duration-200 hover:scale-105 ${
                          isDark 
                            ? 'border-amber-400/30 text-white/70 hover:border-amber-400 hover:bg-amber-400/10' 
                            : 'border-purple-600/30 text-black/70 hover:border-purple-600 hover:bg-purple-600/10'
                        }`}
                      >
                        #{tag.name} ({tag.count})
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
