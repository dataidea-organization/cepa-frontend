const NEWS_API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://cepa-backend-production.up.railway.app/resources";

export interface NewsComment {
  id: string;
  article: string;
  author_name: string;
  author_email: string;
  body: string;
  created_at: string;
}

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image?: string;
  slug: string;
  featured: boolean;
  content?: string;
  views_count?: number;
  created_at: string;
  updated_at: string;
}

interface NewsApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsArticle[];
}

// Cache for news articles to avoid redundant API calls
let newsCache: NewsArticle[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export class NewsService {
  private static async fetchNews(): Promise<NewsArticle[]> {
    // Check if we have valid cached data
    if (newsCache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return newsCache;
    }

    try {
      const response = await fetch(`${NEWS_API_BASE}/news/?page_size=100`, {
        next: { revalidate: 600 } // Revalidate every 10 minutes
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch news articles');
      }
      
      const data: NewsApiResponse = await response.json();
      
      // Update cache
      newsCache = data.results;
      cacheTimestamp = Date.now();
      
      return data.results;
    } catch (error) {
      console.error('Error fetching news articles:', error);
      throw error;
    }
  }

  static async getAllNews(): Promise<NewsArticle[]> {
    return this.fetchNews();
  }

  static async getNewsBySlug(slug: string): Promise<NewsArticle | null> {
    const news = await this.fetchNews();
    return news.find(article => article.slug === slug) || null;
  }

  static async getFeaturedNews(): Promise<NewsArticle[]> {
    const news = await this.fetchNews();
    return news.filter(article => article.featured);
  }

  static async getRelatedNews(currentArticleId: string, limit: number = 3): Promise<NewsArticle[]> {
    const news = await this.fetchNews();
    return news.filter(article => article.id !== currentArticleId).slice(0, limit);
  }

  static async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${NEWS_API_BASE}/news/categories/`, {
        next: { revalidate: 600 }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch news categories');
      }

      const categories = await response.json();
      return categories;
    } catch (error) {
      console.error('Error fetching news categories:', error);
      return [];
    }
  }

  static clearCache(): void {
    newsCache = null;
    cacheTimestamp = null;
  }

  static async incrementView(articleId: string): Promise<{ views_count: number }> {
    const response = await fetch(`${NEWS_API_BASE}/news/${articleId}/increment_view/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Failed to increment view");
    return response.json();
  }

  static async getComments(articleId: string): Promise<NewsComment[]> {
    const response = await fetch(`${NEWS_API_BASE}/news/${articleId}/comments/`);
    if (!response.ok) throw new Error("Failed to fetch comments");
    return response.json();
  }

  static async postComment(
    articleId: string,
    data: { author_name: string; author_email: string; body: string }
  ): Promise<NewsComment> {
    const response = await fetch(`${NEWS_API_BASE}/news/${articleId}/comments/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.detail || err.body?.[0] || "Failed to post comment");
    }
    return response.json();
  }
}

export type { NewsArticle, NewsApiResponse };

