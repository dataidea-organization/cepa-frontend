"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { BlogService, BlogPost } from "@/lib/blog-service";

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch blog posts and categories in parallel
        const [posts, cats] = await Promise.all([
          BlogService.getAllBlogPosts(),
          BlogService.getCategories()
        ]);

        setBlogPosts(posts);
        setCategories(['All', ...cats.filter((cat: string) => cat)]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching blog data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter blog posts by selected category
  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  // Only use fetched blog posts from API
  const postsToDisplay = filteredPosts;

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    } catch {
      return dateString;
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-destructive mb-4">Error loading blog posts: {error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (!loading && postsToDisplay.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">No Blog Posts Available</h1>
          <p className="text-xl text-muted-foreground mb-8">There are currently no blog posts to display. Please check back later.</p>
          <Button onClick={() => window.location.reload()}>Refresh Page</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src="/hero/blog-hero.jpg" 
          alt="Blog & Analysis - CEPA"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-8"
            >
              Blog & Analysis
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              In-depth analysis, policy insights, and expert commentary on governance, development, and public policy issues in Uganda and beyond.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Badge
                  variant={category === 'All' ? 'default' : 'secondary'}
                  className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90'
                      : 'bg-[#800020]/20 text-[#800020] border border-[#800020]/30 hover:bg-[#800020]/30'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Featured Analysis
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Latest policy analysis and expert insights from CEPA's research team.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsToDisplay.filter(post => post.featured).map((post, index) => {
              const themeColors = ["border-primary", "border-secondary", "border-accent", "border-destructive"];
              const currentColor = themeColors[index % 4];
              
              return (
                <Card key={post.id} className="relative h-96 overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white/20 border border-white/30 backdrop-blur-sm">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${post.image || '/blog/default-blog.jpg'})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getCategoryColor(post.category)} text-xs`}>
                      {post.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-white/90 mb-3">{formatDate(post.date)}</p>
                    <p className="text-sm text-white/80 mb-4 line-clamp-3">{post.description}</p>
                    <Button asChild size="sm" variant="outline" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90">
                      <Link href={`/resources/blog/${post.slug}`} className="text-black">
                        Read More
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Blog Posts */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              All Blog Posts
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Complete collection of policy analysis, research insights, and expert commentary from CEPA.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsToDisplay.map((post, index) => {
              const themeColors = ["border-primary", "border-secondary", "border-accent", "border-destructive"];
              const currentColor = themeColors[index % 4];
              
              return (
                <Card key={post.id} className="relative h-96 overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white/20 border border-white/30 backdrop-blur-sm">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${post.image || '/blog/default-blog.jpg'})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getCategoryColor(post.category)} text-xs`}>
                      {post.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-white/90 mb-3">{formatDate(post.date)}</p>
                    <p className="text-sm text-white/80 mb-4 line-clamp-3">{post.description}</p>
                    <Button asChild size="sm" variant="outline" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90">
                      <Link href={`/resources/blog/${post.slug}`} className="text-black">
                        Read More
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20" style={{background: 'linear-gradient(to right, rgb(30 64 175), rgb(245 158 11), rgb(16 185 129), rgb(239 68 68))'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stay Informed
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-4xl mx-auto">
            Subscribe to our newsletter to receive the latest policy analysis, research insights, and expert commentary directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90 shadow-lg">
              <Link href="/get-involved#newsletter">
                Subscribe to Newsletter
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90 shadow-lg">
              <Link href="/resources">
                Browse All Resources
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
