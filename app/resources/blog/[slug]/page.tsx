"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { BlogService, BlogPost } from "@/lib/blog-service";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ params }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        // Fetch the specific blog post by slug
        const foundPost = await BlogService.getBlogPostBySlug(params.slug);
        if (foundPost) {
          setPost(foundPost);
          // Fetch related posts
          const related = await BlogService.getRelatedPosts(foundPost.id, 3);
          setRelatedPosts(related);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-muted-foreground">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            {error || "The requested blog post could not be found."}
          </p>
          <Button asChild className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-900 border border-blue-600/30 backdrop-blur-sm font-medium py-2 px-4 rounded-md transition-all duration-200">
            <Link href="/resources/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Education": "bg-primary/10 text-primary border-primary",
      "Governance": "bg-secondary/10 text-secondary border-secondary",
      "Digital Rights": "bg-accent/10 text-accent border-accent",
      "Road Safety": "bg-destructive/10 text-destructive border-destructive",
      "Health": "bg-primary/10 text-primary border-primary",
      "Youth": "bg-secondary/10 text-secondary border-secondary",
      "Budget Analysis": "bg-accent/10 text-accent border-accent",
      "Public Finance": "bg-destructive/10 text-destructive border-destructive"
    };
    return colors[category] || "bg-muted text-muted-foreground border-muted";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
          <img 
            src={post.image || '/blog/default-blog.jpg'} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Badge className={`${getCategoryColor(post.category)} text-sm`}>
                {post.category}
              </Badge>
              <div className="flex items-center text-white/80 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button asChild className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-900 border border-blue-600/30 backdrop-blur-sm font-medium py-2 px-4 rounded-md transition-all duration-200 mb-8">
              <Link href="/resources/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
          
          <article 
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:p-6 prose-blockquote:rounded-r-lg"
            dangerouslySetInnerHTML={{ __html: post.content || post.description }}
          />
          
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className={`${getCategoryColor(post.category)} text-sm`}>
                  <Tag className="w-3 h-3 mr-1" />
                  {post.category}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </span>
              </div>
              <Button asChild className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-900 border border-blue-600/30 backdrop-blur-sm font-medium py-2 px-4 rounded-md transition-all duration-200">
                <Link href="/resources/blog">
                  View All Posts
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Related Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost, index) => {
                const themeColors = ["border-primary", "border-secondary", "border-accent", "border-destructive"];
                const currentColor = themeColors[index % 4];
                
                return (
                  <div key={relatedPost.id} className="relative h-80 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group bg-white/20 border border-white/30 backdrop-blur-sm">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${relatedPost.image || '/blog/default-blog.jpg'})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getCategoryColor(relatedPost.category)} text-xs`}>
                        {relatedPost.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-white/90 mb-3">
                      {new Date(relatedPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                      </p>
                      <Button asChild size="sm" className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm font-medium py-1 px-3 rounded-md transition-all duration-200">
                      <Link href={`/resources/blog/${relatedPost.slug}`}>
                          Read More
              </Link>
            </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;
