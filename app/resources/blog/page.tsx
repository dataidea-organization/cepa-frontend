"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { BlogService } from "@/lib/blog-service";
import { usePaginatedList } from "@/hooks/use-paginated-list";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { FilterDropdown } from "@/components/FilterDropdown";
import { ContentSectionHeader } from "@/components/ContentSectionHeader";

const Blog: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchPage = useCallback(
    (page: number) =>
      BlogService.getBlogPostsPage(
        page,
        undefined,
        selectedCategory === "All" ? undefined : selectedCategory
      ),
    [selectedCategory]
  );

  const {
    items: postsToDisplay,
    hasMore,
    loadMore,
    visibleCount,
    totalCount,
    loading,
    loadingMore,
    error,
  } = usePaginatedList({
    fetchPage,
    resetKey: selectedCategory,
  });

  useEffect(() => {
    BlogService.getCategories()
      .then((cats) => {
        const uniqueCategories = [...new Set(cats.filter((cat: string) => cat))];
        setCategories(["All", ...uniqueCategories]);
      })
      .catch((err) => console.error("Error fetching blog categories:", err));
  }, []);

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

      {/* All Blog Posts */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContentSectionHeader
            title={selectedCategory === "All" ? "All Blog Posts" : `${selectedCategory} Blog Posts`}
            description="Complete collection of policy analysis, research insights, and expert commentary from CEPA."
            filter={
              <FilterDropdown
                label="Category"
                value={selectedCategory}
                options={categories}
                onChange={setSelectedCategory}
              />
            }
          />
          
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

          <LoadMoreButton
            onClick={loadMore}
            hasMore={hasMore}
            visibleCount={visibleCount}
            totalCount={totalCount}
            loading={loadingMore}
          />
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
