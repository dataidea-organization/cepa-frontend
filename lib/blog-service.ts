interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image?: string;
  slug: string;
  featured: boolean;
  content?: string;
  created_at: string;
  updated_at: string;
}

interface BlogApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BlogPost[];
}

// Cache for blog posts to avoid redundant API calls
let blogPostsCache: BlogPost[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 5 minutes

export class BlogService {
  private static async fetchBlogPosts(): Promise<BlogPost[]> {
    // Check if we have valid cached data
    if (blogPostsCache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return blogPostsCache;
    }

    try {
      const response = await fetch('https://cepa-backend-production.up.railway.app/resources/blog/?page_size=100', {
        next: { revalidate: 300 } // Revalidate every 5 minutes
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      
      const data: BlogApiResponse = await response.json();
      
      // Update cache
      blogPostsCache = data.results;
      cacheTimestamp = Date.now();
      
      return data.results;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  }

  static async getAllBlogPosts(): Promise<BlogPost[]> {
    return this.fetchBlogPosts();
  }

  static async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.fetchBlogPosts();
    return posts.find(post => post.slug === slug) || null;
  }

  static async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    const posts = await this.fetchBlogPosts();
    return posts.filter(post => post.featured);
  }

  static async getRelatedPosts(currentPostId: string, limit: number = 3): Promise<BlogPost[]> {
    const posts = await this.fetchBlogPosts();
    return posts.filter(post => post.id !== currentPostId).slice(0, limit);
  }

  static async getCategories(): Promise<string[]> {
    try {
      const response = await fetch('https://cepa-backend-production.up.railway.app/resources/blog/categories/', {
        next: { revalidate: 300 }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blog categories');
      }

      const categories = await response.json();
      return categories;
    } catch (error) {
      console.error('Error fetching blog categories:', error);
      return [];
    }
  }

  static clearCache(): void {
    blogPostsCache = null;
    cacheTimestamp = null;
  }
}

export type { BlogPost, BlogApiResponse };
