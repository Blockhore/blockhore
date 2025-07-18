import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Share2, 
  Twitter, 
  MessageCircle, 
  Linkedin, 
  Copy, 
  Check,
  ArrowLeft,
  Eye,
  ChevronUp,
  Github,
} from 'lucide-react';

interface BlogPostPageProps {
  isDark: boolean;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ isDark }) => {
  const { slug } = useParams();
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Mock article data - in real app, this would come from API/CMS
  const article = {
    id: 1,
    slug: 'understanding-ethereum-staking-rewards',
    title: 'Understanding Ethereum 2.0 Staking Rewards',
    subtitle: 'Deep dive into ETH staking mechanisms, rewards calculation, and validator requirements for maximum yield optimization.',
    heroImage: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1200',
    author: {
      name: 'Alex Chen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      bio: 'DeFi researcher and blockchain developer'
    },
    publishDate: '2025-01-15',
    readTime: '8 min',
    category: 'DeFi',
    tags: ['ethereum', 'staking', 'defi', 'rewards', 'validator'],
    views: 1247,
    content: `
# Introduction to Ethereum Staking

Ethereum 2.0 has revolutionized the way we think about blockchain consensus mechanisms. The transition from Proof of Work to Proof of Stake has opened up new opportunities for token holders to participate in network security while earning rewards.

## How Staking Works

Staking involves locking up your ETH tokens to become a validator on the Ethereum network. Validators are responsible for:

- Processing transactions
- Creating new blocks
- Maintaining network security
- Earning rewards for honest behavior

### Minimum Requirements

To become a validator, you need:

1. **32 ETH minimum** - This is the base requirement for running a validator node
2. **Technical setup** - Running validator software 24/7
3. **Slashing risk awareness** - Understanding penalties for malicious behavior

> "Staking is not just about earning rewards; it's about securing the future of decentralized finance." - Vitalik Buterin

## Reward Calculation

The staking rewards are calculated based on several factors:

\`\`\`javascript
const calculateRewards = (stakedAmount, networkParticipation, uptime) => {
  const baseReward = stakedAmount * 0.05; // 5% base APR
  const participationBonus = baseReward * (networkParticipation / 100);
  const uptimeMultiplier = uptime / 100;
  
  return (baseReward + participationBonus) * uptimeMultiplier;
};
\`\`\`

### Current Reward Rates

As of January 2025, the average staking rewards are:

- **Solo staking**: 4.2% - 5.8% APR
- **Liquid staking**: 3.8% - 5.2% APR
- **Centralized exchanges**: 3.5% - 4.8% APR

## Risks and Considerations

While staking can be profitable, there are several risks to consider:

### Slashing Conditions

Validators can lose part of their stake if they:

- Go offline for extended periods
- Submit conflicting attestations
- Propose invalid blocks

### Liquidity Considerations

When you stake ETH directly:

- Funds are locked until withdrawals are enabled
- No immediate access to your staked tokens
- Opportunity cost of not using ETH elsewhere

## Liquid Staking Solutions

Liquid staking protocols like Lido and Rocket Pool offer alternatives:

- **Immediate liquidity** through derivative tokens
- **Lower barriers to entry** (no 32 ETH minimum)
- **Professional validation** services

## Conclusion

Ethereum staking represents a fundamental shift in how blockchain networks achieve consensus. While the rewards can be attractive, it's essential to understand the technical requirements, risks, and various staking options available.

The future of Ethereum depends on a robust validator network, and staking provides an opportunity for token holders to contribute to this vision while earning rewards.
    `
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'DeFi Yield Farming Strategies 2025',
      excerpt: 'Latest yield farming opportunities and risk assessment techniques.',
      thumbnail: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2025-01-12',
      readTime: '10 min'
    },
    {
      id: 3,
      title: 'Layer 2 Scaling Solutions Comparison',
      excerpt: 'Technical analysis of Arbitrum, Optimism, and Polygon performance.',
      thumbnail: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2025-01-13',
      readTime: '15 min'
    },
    {
      id: 4,
      title: 'Smart Contract Security Best Practices',
      excerpt: 'Essential security patterns and audit checklist for developers.',
      thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2025-01-10',
      readTime: '18 min'
    }
  ];

  const sidebarTags = ['ethereum', 'staking', 'defi', 'rewards', 'validator', 'pos', 'consensus'];

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Copy link functionality
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Share functions
  const shareToTwitter = () => {
    const text = `Check out this article: ${article.title}`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  // Render markdown content (simplified - in real app, use a proper markdown parser)
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className={`text-3xl font-bold mb-6 mt-8 font-mono ${isDark ? 'text-amber-400' : 'text-purple-600'}`}>{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className={`text-2xl font-bold mb-4 mt-6 font-mono ${isDark ? 'text-amber-400' : 'text-purple-600'}`}>{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className={`text-xl font-bold mb-3 mt-5 font-mono ${isDark ? 'text-amber-400' : 'text-purple-600'}`}>{line.slice(4)}</h3>;
      }
      if (line.startsWith('> ')) {
        return (
          <blockquote key={index} className={`border-l-4 pl-4 py-2 my-4 italic ${
            isDark ? 'border-amber-400/50 bg-amber-400/5 text-white/80' : 'border-purple-600/50 bg-purple-600/5 text-black/80'
          }`}>
            {line.slice(2)}
          </blockquote>
        );
      }
      if (line.startsWith('```')) {
        return null; // Handle code blocks separately
      }
      if (line.match(/^\d+\./)) {
        return <li key={index} className={`mb-2 ${isDark ? 'text-white/90' : 'text-black/90'}`}>{line.replace(/^\d+\.\s*/, '')}</li>;
      }
      if (line.startsWith('- ')) {
        return <li key={index} className={`mb-2 ${isDark ? 'text-white/90' : 'text-black/90'}`}>{line.slice(2)}</li>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className={`mb-4 leading-relaxed ${isDark ? 'text-white/90' : 'text-black/90'}`}>{line}</p>;
    });
  };

  return (
    <div className={`min-h-screen pt-20 ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Link
          to="/blog"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-mono text-sm transition-all duration-300 hover:scale-105 ${
            isDark 
              ? 'border-amber-400/20 text-amber-400 hover:border-amber-400 hover:bg-amber-400/10' 
              : 'border-purple-600/20 text-purple-600 hover:border-purple-600 hover:bg-purple-600/10'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          back.to.blog()
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        {/* Hero Image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl md:text-5xl font-bold mb-4 font-mono terminal-glow ${
            isDark ? 'text-amber-400' : 'text-purple-600'
          }`}>
            {article.title}
          </h1>
          
          {article.subtitle && (
            <p className={`text-lg md:text-xl mb-6 max-w-3xl mx-auto ${
              isDark ? 'text-white/80' : 'text-black/80'
            }`}>
              {article.subtitle}
            </p>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
          {/* Author */}
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                {article.author.name}
              </div>
              <div className={`text-xs ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                {article.author.bio}
              </div>
            </div>
          </div>

          {/* Date & Read Time */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className={`w-4 h-4 ${isDark ? 'text-white/50' : 'text-black/50'}`} />
              <span className={`${isDark ? 'text-white/70' : 'text-black/70'}`}>
                {article.publishDate}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className={`w-4 h-4 ${isDark ? 'text-white/50' : 'text-black/50'}`} />
              <span className={`${isDark ? 'text-white/70' : 'text-black/70'}`}>
                {article.readTime} read
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className={`w-4 h-4 ${isDark ? 'text-white/50' : 'text-black/50'}`} />
              <span className={`${isDark ? 'text-white/70' : 'text-black/70'}`}>
                {article.views}
              </span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <span className={`px-3 py-1 rounded-full text-sm font-mono ${
            isDark 
              ? 'bg-amber-400 text-black' 
              : 'bg-purple-600 text-white'
          }`}>
            {article.category}
          </span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-sm ${
                isDark 
                  ? 'bg-amber-400/20 text-amber-400' 
                  : 'bg-purple-600/20 text-purple-600'
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Article Content */}
          <main className="flex-1 max-w-none lg:max-w-3xl">
            <article className={`prose prose-lg max-w-none ${
              isDark ? 'prose-invert' : ''
            }`}>
              <div className="text-lg leading-relaxed">
                {renderContent(article.content)}
              </div>
            </article>
          </main>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-80">
            <div className="sticky top-24 space-y-6">
              
              {/* Tags */}
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
                    article.tags()
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sidebarTags.map((tag) => (
                    <button
                      key={tag}
                      className={`text-xs px-3 py-2 rounded-full border transition-all duration-200 hover:scale-105 ${
                        isDark 
                          ? 'border-amber-400/30 text-white/70 hover:border-amber-400 hover:bg-amber-400/10' 
                          : 'border-purple-600/30 text-black/70 hover:border-purple-600 hover:bg-purple-600/10'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Share Buttons */}
              <div className={`p-6 rounded-lg border-2 ${
                isDark 
                  ? 'border-amber-400/20 bg-black/40' 
                  : 'border-purple-600/20 bg-white/40'
              } backdrop-blur-sm`}>
                <div className="flex items-center gap-2 mb-4">
                  <Share2 className={`w-4 h-4 ${
                    isDark ? 'text-amber-400' : 'text-purple-600'
                  }`} />
                  <h3 className={`font-mono text-sm ${
                    isDark ? 'text-amber-400' : 'text-purple-600'
                  }`}>
                    share.article()
                  </h3>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={shareToTwitter}
                    className={`w-full flex items-center gap-3 p-3 rounded border transition-all duration-200 hover:scale-105 ${
                      isDark 
                        ? 'border-amber-400/20 hover:border-amber-400/50 hover:bg-amber-400/5' 
                        : 'border-purple-600/20 hover:border-purple-600/50 hover:bg-purple-600/5'
                    }`}
                  >
                    <Twitter className="w-4 h-4" />
                    <span className="text-sm">Twitter</span>
                  </button>
                  <button
                    onClick={shareToLinkedIn}
                    className={`w-full flex items-center gap-3 p-3 rounded border transition-all duration-200 hover:scale-105 ${
                      isDark 
                        ? 'border-amber-400/20 hover:border-amber-400/50 hover:bg-amber-400/5' 
                        : 'border-purple-600/20 hover:border-purple-600/50 hover:bg-purple-600/5'
                    }`}
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm">LinkedIn</span>
                  </button>
                  <button
                    onClick={copyLink}
                    className={`w-full flex items-center gap-3 p-3 rounded border transition-all duration-200 hover:scale-105 ${
                      isDark 
                        ? 'border-amber-400/20 hover:border-amber-400/50 hover:bg-amber-400/5' 
                        : 'border-purple-600/20 hover:border-purple-600/50 hover:bg-purple-600/5'
                    }`}
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Copy Link</span>
                  </button>
                </div>
              </div>

              {/* CTA */}
              <div className={`p-6 rounded-lg border-2 ${
                isDark 
                  ? 'border-amber-400/20 bg-black/40' 
                  : 'border-purple-600/20 bg-white/40'
              } backdrop-blur-sm text-center`}>
                <h3 className={`font-mono text-sm mb-4 ${
                  isDark ? 'text-amber-400' : 'text-purple-600'
                }`}>
                  join.community()
                </h3>
                <p className={`text-sm mb-4 ${
                  isDark ? 'text-white/70' : 'text-black/70'
                }`}>
                  Connect with fellow Web3 learners and builders
                </p>
                <button className={`w-full px-4 py-3 rounded font-mono text-sm transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-amber-400 text-black hover:bg-amber-400/90' 
                    : 'bg-purple-600 text-white hover:bg-purple-600/90'
                } terminal-glow`}>
                  {'>'} join.orbit()
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Posts */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 ${
            isDark ? 'text-amber-400' : 'text-purple-600'
          }`}>
            <h2 className="text-2xl font-bold font-mono mb-4">related.articles()</h2>
            <div className={`text-sm ${
              isDark ? 'text-white/60' : 'text-black/60'
            }`}>
              You might also like these knowledge transmissions...
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post, index) => (
              <article
                key={post.id}
                className={`group p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                  isDark 
                    ? 'border-amber-400/20 bg-black/40 hover:border-amber-400/50 hover:bg-amber-400/5' 
                    : 'border-purple-600/20 bg-white/40 hover:border-purple-600/50 hover:bg-purple-600/5'
                } backdrop-blur-sm`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link 
                  to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
                  className="block"
                >
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-40 object-cover transition-all duration-300 filter grayscale group-hover:grayscale-0"
                    />
                  </div>
                  
                  <h3 className={`text-lg font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-black'
                  } line-clamp-2`}>
                    {post.title}
                  </h3>
                  
                  <p className={`text-sm mb-4 ${
                    isDark ? 'text-white/70' : 'text-black/70'
                  } line-clamp-3`}>
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
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
                      <Clock className={`w-3 h-3 ${
                        isDark ? 'text-white/50' : 'text-black/50'
                      }`} />
                      <span className={`${
                        isDark ? 'text-white/50' : 'text-black/50'
                      }`}>
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom Bar */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 ${
        isDark ? 'bg-black/95' : 'bg-white/95'
      } backdrop-blur-md border-t-2 ${
        isDark ? 'border-amber-400/20' : 'border-purple-600/20'
      } p-4`}>
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={copyLink}
            className={`flex items-center gap-2 px-4 py-2 rounded border transition-all duration-200 ${
              isDark 
                ? 'border-amber-400/30 text-amber-400 hover:bg-amber-400/10' 
                : 'border-purple-600/30 text-purple-600 hover:bg-purple-600/10'
            }`}
          >
            <Copy className="w-4 h-4" />
            <span className="text-sm">Copy</span>
          </button>
          
          <button
            onClick={shareToTwitter}
            className={`flex items-center gap-2 px-4 py-2 rounded border transition-all duration-200 ${
              isDark 
                ? 'border-amber-400/30 text-amber-400 hover:bg-amber-400/10' 
                : 'border-purple-600/30 text-purple-600 hover:bg-purple-600/10'
            }`}
          >
            <Twitter className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
          
          <button className={`flex-1 px-4 py-2 rounded font-mono text-sm transition-all duration-300 ${
            isDark 
              ? 'bg-amber-400 text-black hover:bg-amber-400/90' 
              : 'bg-purple-600 text-white hover:bg-purple-600/90'
          }`}>
            Join Community
          </button>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-20 lg:bottom-6 right-6 w-12 h-12 rounded-full border-2 ${
            isDark 
              ? 'bg-black/80 border-amber-400 text-amber-400 hover:bg-amber-400/10' 
              : 'bg-white/80 border-purple-600 text-purple-600 hover:bg-purple-600/10'
          } backdrop-blur-sm transition-all duration-300 flex items-center justify-center hover:scale-110 z-40`}
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Copy Toast */}
      {showCopiedToast && (
        <div className={`fixed top-24 right-6 px-4 py-2 rounded-lg ${
          isDark 
            ? 'bg-amber-400 text-black' 
            : 'bg-purple-600 text-white'
        } font-mono text-sm flex items-center gap-2 z-50 animate-pulse`}>
          <Check className="w-4 h-4" />
          Link copied!
        </div>
      )}

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
