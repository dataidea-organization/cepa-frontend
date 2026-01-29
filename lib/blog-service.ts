const BLOG_API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://cepa-backend-production.up.railway.app/resources";

export interface BlogComment {
  id: string;
  post: string;
  author_name: string;
  author_email: string;
  body: string;
  created_at: string;
}

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
  views_count?: number;
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
      const response = await fetch(`${BLOG_API_BASE}/blog/?page_size=100`, {
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
      const response = await fetch(`${BLOG_API_BASE}/blog/categories/`, {
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

  static async incrementView(postId: string): Promise<{ views_count: number }> {
    const response = await fetch(`${BLOG_API_BASE}/blog/${postId}/increment_view/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Failed to increment view");
    return response.json();
  }

  static async getComments(postId: string): Promise<BlogComment[]> {
    const response = await fetch(`${BLOG_API_BASE}/blog/${postId}/comments/`);
    if (!response.ok) throw new Error("Failed to fetch comments");
    return response.json();
  }

  static async postComment(
    postId: string,
    data: { author_name: string; author_email: string; body: string }
  ): Promise<BlogComment> {
    const response = await fetch(`${BLOG_API_BASE}/blog/${postId}/comments/`, {
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

export type { BlogPost, BlogApiResponse };
