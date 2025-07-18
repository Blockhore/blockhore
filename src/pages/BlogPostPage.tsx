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
  AlertCircle,
  BookOpen
} from 'lucide-react';
import { marked } from 'marked';

interface BlogPostPageProps {
  isDark: boolean;
}

interface PostData {
  title: string;
  date: string;
  author: string;
  tags: string[];
  description: string;
}

interface PostContent {
  data: PostData;
  content: string;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ isDark }) => {
  const { slug } = useParams();
  const [post, setPost] = useState<PostContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load markdown post
  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Use dynamic import to load markdown files
        const posts = import.meta.glob('/src/posts/*.md', { as: 'raw' });
        const postPath = `/src/posts/${slug}.md`;
        
        if (!(postPath in posts)) {
          setError('Post not found');
          setLoading(false);
          return;
        }
        
        const markdownContent = await posts[postPath]();
        const { data, content } = matter(markdownContent);
        
        setPost({
          data: data as PostData,
          content: marked(content)
        });
        
        // Load related posts
        await loadRelatedPosts(data.tags || []);
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  // Load related posts based on tags
  const loadRelatedPosts = async (currentTags: string[]) => {
    try {
      const posts = import.meta.glob('/src/posts/*.md', { as: 'raw' });
      const allPosts = [];
      
      for (const [path, loader] of Object.entries(posts)) {
        const postSlug = path.split('/').pop()?.replace('.md', '');
        if (postSlug === slug) continue; // Skip current post
        
        const markdownContent = await loader();
        const { data } = matter(markdownContent);
        
        // Calculate relevance score based on shared tags
        const sharedTags = (data.tags || []).filter((tag: string) => 
          currentTags.includes(tag)
        );
        
        if (sharedTags.length > 0) {
          allPosts.push({
            slug: postSlug,
            title: data.title,
            description: data.description,
            author: data.author,
            date: data.date,
            tags: data.tags || [],
            sharedTags,
            relevanceScore: sharedTags.length
          });
        }
      }
      
      // Sort by relevance score and take top 3
      const sortedPosts = allPosts
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 3);
      
      setRelatedPosts(sortedPosts);
    } catch (err) {
      console.error('Error loading related posts:', err);
    }
  };

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
    if (!post) return;
    const text = `Check out this article: ${post.data.title}`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen pt-20 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className={`inline-flex items-center gap-3 p-4 rounded-lg ${
            isDark 
              ? 'bg-amber-400/20 text-amber-400' 
              : 'bg-purple-600/20 text-purple-600'
          } animate-pulse`}>
            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span className="font-mono">Loading post...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className={`min-h-screen pt-20 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className={`inline-flex items-center gap-3 p-6 rounded-lg border-2 ${
            isDark 
              ? 'border-red-400/50 bg-red-400/10 text-red-400' 
              : 'border-red-600/50 bg-red-600/10 text-red-600'
          }`}>
            <AlertCircle className="w-8 h-8" />
            <div>
              <h2 className="text-xl font-bold font-mono mb-2">Post.NotFound()</h2>
              <p className="text-sm">The article you're looking for doesn't exist in our knowledge base.</p>
            </div>
          </div>
          
          <div className="mt-8">
            <Link
              to="/blog"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-mono text-sm transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'border-amber-400/20 text-amber-400 hover:border-amber-400 hover:bg-amber-400/10' 
                  : 'border-purple-600/20 text-purple-600 hover:border-purple-600 hover:bg-purple-600/10'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              back.to.blog()
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl md:text-5xl font-bold mb-4 font-mono terminal-glow ${
            isDark ? 'text-amber-400' : 'text-purple-600'
          }`}>
            {post.data.title}
          </h1>
          
          {post.data.description && (
            <p className={`text-lg md:text-xl mb-6 max-w-3xl mx-auto ${
              isDark ? 'text-white/80' : 'text-black/80'
            }`}>
              {post.data.description}
            </p>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
          {/* Author */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${
              isDark ? 'bg-amber-400/20' : 'bg-purple-600/20'
            } flex items-center justify-center`}>
              <User className={`w-5 h-5 ${
                isDark ? 'text-amber-400' : 'text-purple-600'
              }`} />
            </div>
            <div>
              <div className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                {post.data.author}
              </div>
              <div className={`text-xs ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                Author
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className={`w-4 h-4 ${isDark ? 'text-white/50' : 'text-black/50'}`} />
              <span className={`${isDark ? 'text-white/70' : 'text-black/70'}`}>
                {new Date(post.data.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {post.data.tags.map((tag) => (
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
              isDark 
                ? 'prose-invert prose-amber prose-headings:text-amber-400 prose-links:text-amber-400 prose-code:text-amber-400' 
                : 'prose-purple prose-headings:text-purple-600 prose-links:text-purple-600 prose-code:text-purple-600'
            }`}>
              <div 
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </main>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-80">
            <div className="sticky top-24 space-y-6">
              
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className={`p-6 rounded-lg border-2 ${
                  isDark 
                    ? 'border-amber-400/20 bg-black/40' 
                    : 'border-purple-600/20 bg-white/40'
                } backdrop-blur-sm`}>
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className={`w-4 h-4 ${
                      isDark ? 'text-amber-400' : 'text-purple-600'
                    }`} />
                    <h3 className={`font-mono text-sm ${
                      isDark ? 'text-amber-400' : 'text-purple-600'
                    }`}>
                      related.posts()
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        to={`/post/${relatedPost.slug}`}
                        className={`block p-3 rounded border transition-all duration-200 hover:scale-105 ${
                          isDark 
                            ? 'border-amber-400/10 hover:border-amber-400/30 hover:bg-amber-400/5' 
                            : 'border-purple-600/10 hover:border-purple-600/30 hover:bg-purple-600/5'
                        }`}
                      >
                        <h4 className={`text-sm font-medium mb-2 ${
                          isDark ? 'text-white' : 'text-black'
                        } line-clamp-2`}>
                          {relatedPost.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className={`${
                            isDark ? 'text-white/50' : 'text-black/50'
                          }`}>
                            {relatedPost.author}
                          </span>
                          <span className={`${
                            isDark ? 'text-white/50' : 'text-black/50'
                          }`}>
                            {new Date(relatedPost.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {relatedPost.sharedTags.slice(0, 2).map((tag: string) => (
                            <span
                              key={tag}
                              className={`text-xs px-2 py-1 rounded-full ${
                                isDark 
                                  ? 'bg-amber-400/20 text-amber-400' 
                                  : 'bg-purple-600/20 text-purple-600'
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

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
                  {post.data.tags.map((tag) => (
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

    </div>
  );
};
