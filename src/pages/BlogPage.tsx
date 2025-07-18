import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronLeft, ChevronRight, Clock, User, Eye, Tag, TrendingUp, Calendar, Twitter, MessageCircle, Github, Linkedin, } from 'lucide-react';

interface BlogPageProps {
  isDark: boolean;
}

export const BlogPage: React.FC<BlogPageProps> = ({ isDark }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    {
      id: 'defi',
      title: 'DeFi & Trading',
      description: 'Decentralized finance protocols, yield farming, and trading strategies',
      count: 42,
      color: 'from-blue-500 to-cyan-500',
      icon: '₿'
    },
    {
      id: 'nft',
      title: 'NFTs & Gaming',
      description: 'Non-fungible tokens, blockchain gaming, and digital collectibles',
      count: 28,
      color: 'from-purple-500 to-pink-500',
      icon: '🎮'
    },
    {
      id: 'tech',
      title: 'Blockchain Tech',
      description: 'Layer 2 solutions, consensus mechanisms, and protocol updates',
      count: 35,
      color: 'from-green-500 to-emerald-500',
      icon: '⚡'
    }
  ];

  const articles = [
    {
      id: 1,
      title: 'Understanding Ethereum 2.0 Staking Rewards',
      excerpt: 'Deep dive into ETH staking mechanisms, rewards calculation, and validator requirements for maximum yield.',
      category: 'defi',
      author: 'Alex Chen',
      date: '2025-01-15',
      readTime: '8 min',
      views: 1247,
      thumbnail: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['ethereum', 'staking', 'defi']
    },
    {
      id: 2,
      title: 'NFT Marketplace Analysis: OpenSea vs Blur',
      excerpt: 'Comprehensive comparison of leading NFT marketplaces, fees, features, and trading volume analysis.',
      category: 'nft',
      author: 'Sarah Kim',
      date: '2025-01-14',
      readTime: '12 min',
      views: 892,
      thumbnail: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['nft', 'marketplace', 'trading']
    },
    {
      id: 3,
      title: 'Layer 2 Scaling Solutions Comparison',
      excerpt: 'Technical analysis of Arbitrum, Optimism, and Polygon - performance, costs, and ecosystem growth.',
      category: 'tech',
      author: 'Marcus Rodriguez',
      date: '2025-01-13',
      readTime: '15 min',
      views: 2156,
      thumbnail: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['layer2', 'scaling', 'ethereum']
    },
    {
      id: 4,
      title: 'DeFi Yield Farming Strategies 2025',
      excerpt: 'Latest yield farming opportunities, risk assessment, and portfolio optimization techniques.',
      category: 'defi',
      author: 'Emma Thompson',
      date: '2025-01-12',
      readTime: '10 min',
      views: 1543,
      thumbnail: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['defi', 'yield', 'farming']
    },
    {
      id: 5,
      title: 'Web3 Gaming: Play-to-Earn Revolution',
      excerpt: 'Exploring the future of blockchain gaming, tokenomics, and sustainable play-to-earn models.',
      category: 'nft',
      author: 'David Park',
      date: '2025-01-11',
      readTime: '7 min',
      views: 967,
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['gaming', 'web3', 'p2e']
    },
    {
      id: 6,
      title: 'Smart Contract Security Best Practices',
      excerpt: 'Essential security patterns, common vulnerabilities, and audit checklist for smart contract developers.',
      category: 'tech',
      author: 'Lisa Wang',
      date: '2025-01-10',
      readTime: '18 min',
      views: 1876,
      thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['security', 'smart-contracts', 'development']
    }
  ];

  const popularTags = [
    { name: 'ethereum', count: 45 },
    { name: 'defi', count: 38 },
    { name: 'nft', count: 32 },
    { name: 'layer2', count: 28 },
    { name: 'staking', count: 24 },
    { name: 'gaming', count: 19 },
    { name: 'security', count: 16 },
    { name: 'trading', count: 14 }
  ];

  const recentPosts = [
    { title: 'Crypto Market Analysis Q1 2025', date: '2025-01-15', views: 892 },
    { title: 'New DeFi Protocols to Watch', date: '2025-01-14', views: 1247 },
    { title: 'NFT Trends and Predictions', date: '2025-01-13', views: 756 },
    { title: 'Blockchain Interoperability Guide', date: '2025-01-12', views: 1543 }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const articlesPerPage = 6;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

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
                <div className="flex flex-col md:flex-row gap-4">
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
                      <option value="defi">defi.articles()</option>
                      <option value="nft">nft.articles()</option>
                      <option value="tech">tech.articles()</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {paginatedArticles.map((article, index) => (
                  <article
                    key={article.id}
                    className={`group p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                      isDark 
                        ? 'border-amber-400/20 bg-black/40 hover:border-amber-400/50 hover:bg-amber-400/5' 
                        : 'border-purple-600/20 bg-white/40 hover:border-purple-600/50 hover:bg-purple-600/5'
                    } backdrop-blur-sm`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Link 
                      to={`/blog/${article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
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
                      {article.excerpt}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-4">
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
                            {article.readTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className={`w-3 h-3 ${
                          isDark ? 'text-white/50' : 'text-black/50'
                        }`} />
                        <span className={`${
                          isDark ? 'text-white/50' : 'text-black/50'
                        }`}>
                          {article.views}
                        </span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-2 py-1 rounded-full ${
                            isDark 
                              ? 'bg-white/10 text-white/60' 
                              : 'bg-black/10 text-black/60'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    </Link>
                  </article>
                ))}
              </div>

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

                {/* Recent Posts */}
                <div className={`p-6 rounded-lg border-2 ${
                  isDark 
                    ? 'border-amber-400/20 bg-black/40' 
                    : 'border-purple-600/20 bg-white/40'
                } backdrop-blur-sm`}>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className={`w-4 h-4 ${
                      isDark ? 'text-amber-400' : 'text-purple-600'
                    }`} />
                    <h3 className={`font-mono text-sm ${
                      isDark ? 'text-amber-400' : 'text-purple-600'
                    }`}>
                      recent.posts()
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {recentPosts.map((post, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded border cursor-pointer transition-all duration-200 hover:scale-105 ${
                          isDark 
                            ? 'border-amber-400/10 hover:border-amber-400/30 hover:bg-amber-400/5' 
                            : 'border-purple-600/10 hover:border-purple-600/30 hover:bg-purple-600/5'
                        }`}
                      >
                        <h4 className={`text-sm font-medium mb-2 ${
                          isDark ? 'text-white' : 'text-black'
                        } line-clamp-2`}>
                          {post.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <Calendar className={`w-3 h-3 ${
                              isDark ? 'text-white/50' : 'text-black/50'
                            }`} />
                            <span className={`${
                              isDark ? 'text-white/50' : 'text-black/50'
                            }`}>
                              {post.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className={`w-3 h-3 ${
                              isDark ? 'text-white/50' : 'text-black/50'
                            }`} />
                            <span className={`${
                              isDark ? 'text-white/50' : 'text-black/50'
                            }`}>
                              {post.views}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};
