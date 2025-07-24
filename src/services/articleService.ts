interface ExternalArticle {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  author: string;
  category: string;
  thumbnail: string;
  source: string;
}

interface RSSFeed {
  url: string;
  name: string;
  category: string;
}

class ArticleService {
  private feeds: RSSFeed[] = [
    {
      url: 'https://cointelegraph.com/rss',
      name: 'Cointelegraph',
      category: 'NEWS'
    },
    {
      url: 'https://decrypt.co/feed',
      name: 'Decrypt',
      category: 'TECH'
    },
    {
      url: 'https://thedefiant.io/feed',
      name: 'The Defiant',
      category: 'DEFI'
    },
    {
      url: 'https://blockhore.netlify.app/feed',
      name: 'Bloghore',
      category: 'EDUCAT'
    }
  ];

  private cache: Map<string, { articles: ExternalArticle[], timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  async fetchArticles(limit: number = 10): Promise<ExternalArticle[]> {
    const cacheKey = 'all_articles';
    const cached = this.cache.get(cacheKey);
    
    // Return cached data if still valid
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.articles.slice(0, limit);
    }

    try {
      const allArticles: ExternalArticle[] = [];
      
      // Fetch from all feeds
      for (const feed of this.feeds) {
        try {
          const articles = await this.fetchFromFeed(feed);
          allArticles.push(...articles);
        } catch (error) {
          console.warn(`Failed to fetch from ${feed.name}:`, error);
        }
      }

      // Sort by publication date (newest first)
      allArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

      // Cache the results
      this.cache.set(cacheKey, {
        articles: allArticles,
        timestamp: Date.now()
      });

      return allArticles.slice(0, limit);
    } catch (error) {
      console.error('Error fetching articles:', error);
      
      // Return cached data if available, even if expired
      if (cached) {
        return cached.articles.slice(0, limit);
      }
      
      // Return fallback articles if no cache available
      return this.getFallbackArticles().slice(0, limit);
    }
  }

  private async fetchFromFeed(feed: RSSFeed): Promise<ExternalArticle[]> {
    // Using a CORS proxy service for RSS feeds
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
    
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(`RSS parsing error: ${data.message}`);
    }

    return data.items.map((item: any, index: number) => ({
      id: `${feed.name.toLowerCase()}-${Date.now()}-${index}`,
      title: this.cleanTitle(item.title),
      description: this.cleanDescription(item.description || item.content),
      link: item.link,
      pubDate: item.pubDate,
      author: item.author || feed.name,
      category: feed.category,
      thumbnail: this.extractThumbnail(item),
      source: feed.name
    }));
  }

  private cleanTitle(title: string): string {
    return title.replace(/<[^>]*>/g, '').trim();
  }

  private cleanDescription(description: string): string {
    return description
      .replace(/<[^>]*>/g, '')
      .replace(/&[^;]+;/g, ' ')
      .trim()
      .substring(0, 200) + '...';
  }

  private extractThumbnail(item: any): string {
    // Try to extract image from various RSS fields
    if (item.thumbnail) return item.thumbnail;
    if (item.enclosure?.link) return item.enclosure.link;
    
    // Extract from description/content
    const imgMatch = item.description?.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch) return imgMatch[1];
    
    // Fallback to category-based stock images
    const fallbackImages = [
      'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400'
    ];
    
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  }

  private getFallbackArticles(): ExternalArticle[] {
    return [
      {
        id: 'fallback-1',
        title: 'Bitcoin Reaches New All-Time High',
        description: 'Bitcoin continues its bullish momentum as institutional adoption grows...',
        link: 'https://cointelegraph.com',
        pubDate: new Date().toISOString(),
        author: 'Crypto News',
        category: 'NEWS',
        thumbnail: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400',
        source: 'Fallback'
      },
      {
        id: 'fallback-2',
        title: 'DeFi Protocol Launches New Yield Farming',
        description: 'A new decentralized finance protocol offers innovative yield farming opportunities...',
        link: 'https://thedefiant.io',
        pubDate: new Date(Date.now() - 3600000).toISOString(),
        author: 'DeFi News',
        category: 'DEFI',
        thumbnail: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400',
        source: 'Fallback'
      }
    ];
  }

  // Method to manually refresh cache
  async refreshCache(): Promise<void> {
    this.cache.clear();
    await this.fetchArticles();
  }

  // Method to get articles by category
  async getArticlesByCategory(category: string, limit: number = 5): Promise<ExternalArticle[]> {
    const allArticles = await this.fetchArticles(50);
    return allArticles
      .filter(article => article.category === category)
      .slice(0, limit);
  }
}

export const articleService = new ArticleService();
export type { ExternalArticle };
