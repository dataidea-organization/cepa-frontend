"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        // Fetch more posts to ensure we get all content
        const response = await fetch('https://cepa-backend-production.up.railway.app/resources/blog/?page_size=100');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data: BlogApiResponse = await response.json();
        setBlogPosts(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Fallback blog posts in case API fails
  const fallbackBlogPosts = [
    {
      id: "education-are-we-doing-good-job-children",
      title: "Education: Are we doing a good job with our children?",
      date: "February 2022",
      category: "Education",
      description: "An analysis of Uganda's education sector challenges, particularly the impact of COVID-19 lockdowns on learners and the need for increased government investment in education.",
      image: "/blog/education-children.jpg",
      slug: "education-are-we-doing-a-good-job-with-our-children",
      featured: true
    },
    {
      id: "parliament-approving-decisions-wrong-reasons",
      title: "Parliament Approving Decisions for all the Wrong Reasons",
      date: "March 2022",
      category: "Governance",
      description: "A critical examination of parliamentary decision-making processes and the need for more evidence-based policy formulation in Uganda's legislative body.",
      image: "/blog/parliament-decisions.jpg",
      slug: "parliament-approving-decisions-for-all-the-wrong-reasons",
      featured: true
    },
    {
      id: "data-protection-digital-age-analysis",
      title: "Data Protection in the Digital Age: An Analysis of Uganda's Data Protection and Privacy Bill 2015",
      date: "April 2022",
      category: "Digital Rights",
      description: "Comprehensive analysis of Uganda's proposed data protection legislation and its implications for digital rights, privacy, and cybersecurity in the country.",
      image: "/blog/data-protection.jpg",
      slug: "data-protection-in-the-digital-age-an-analysis-of-ugandas-data-protection-and-privacy-bill-2015",
      featured: true
    },
    {
      id: "road-safety-uganda-comprehensive-regulations",
      title: "Road Safety in Uganda: Why Uganda Needs Comprehensive Regulations for Road Users",
      date: "May 2022",
      category: "Road Safety",
      description: "Analysis of road safety challenges in Uganda and recommendations for comprehensive regulatory framework to reduce traffic accidents and fatalities.",
      image: "/blog/road-safety-regulations.jpg",
      slug: "road-safety-in-uganda-why-uganda-needs-comprehensive-regulations-for-road-users",
      featured: false
    },
    {
      id: "parliamentary-oversight-accountability-service-delivery",
      title: "Parliamentary Oversight in Accountability Affects Service Delivery in Public Institutions",
      date: "June 2022",
      category: "Governance",
      description: "Examination of how effective parliamentary oversight mechanisms can improve accountability and service delivery in Uganda's public institutions.",
      image: "/blog/parliamentary-oversight.jpg",
      slug: "parliamentary-oversight-in-accountability-affects-service-delivery-in-public-institutions",
      featured: false
    },
    {
      id: "health-sector-resources-properly",
      title: "Health Sector: We are still not using the little resources allocated properly",
      date: "July 2022",
      category: "Health",
      description: "Critical analysis of resource allocation and utilization in Uganda's health sector, highlighting inefficiencies and recommendations for improvement.",
      image: "/blog/health-sector-resources.jpg",
      slug: "health-sector-we-are-still-not-using-the-little-resources-allocated-properly",
      featured: false
    },
    {
      id: "affirmative-action-youth-misunderstood",
      title: "Affirmative Action to the Youth was Misunderstood: Can we do better?",
      date: "August 2022",
      category: "Youth",
      description: "Analysis of youth affirmative action policies in Uganda, examining their effectiveness and proposing better approaches to youth empowerment.",
      image: "/blog/youth-affirmative-action.jpg",
      slug: "affirmative-action-to-the-youth-was-misunderstood-can-we-do-better",
      featured: false
    },
    {
      id: "budget-framework-paper-young-peoples-interests",
      title: "Analysis of the 2020-2021 Budget Framework Paper: Where the Young People's Interests? A Look at ICT and Taxation",
      date: "September 2022",
      category: "Budget Analysis",
      description: "Detailed analysis of Uganda's budget framework paper focusing on youth interests, ICT development, and taxation policies affecting young people.",
      image: "/blog/budget-framework-youth.jpg",
      slug: "analysis-of-the-2020-2021-budget-framework-paper-where-the-young-peoples-interests-a-look-at-ict-and-taxation",
      featured: false
    },
    {
      id: "parliament-needs-change-loans-handling",
      title: "Parliament Needs to Change its Mode of Loans Handling",
      date: "October 2022",
      category: "Public Finance",
      description: "Analysis of parliamentary oversight of loan approvals and recommendations for improving transparency and accountability in debt management.",
      image: "/blog/parliament-loans.jpg",
      slug: "parliament-needs-to-change-its-mode-of-loans-handling",
      featured: false
    },
    {
      id: "reproductive-health-public-health-concern",
      title: "Reproductive Health is a Public Health Concern",
      date: "November 2022",
      category: "Health",
      description: "Examination of reproductive health challenges in Uganda and the need for comprehensive policies to address maternal and child health issues.",
      image: "/blog/reproductive-health.jpg",
      slug: "reproductive-health-is-a-public-health-concern",
      featured: false
    }
  ];

  // Use API data if available, otherwise use fallback
  const postsToDisplay = blogPosts.length > 0 ? blogPosts : fallbackBlogPosts;

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

  if (error && postsToDisplay.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-destructive mb-4">Error loading blog posts: {error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
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
                    <Button asChild size="sm" variant="outline" className="bg-white/20 text-white border border-white/30 hover:bg-white/30">
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
                    <Button asChild size="sm" variant="outline" className="bg-white/20 text-white border border-white/30 hover:bg-white/30">
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
            <Button asChild size="lg" className="bg-white/20 text-white border border-white/30 hover:bg-white/30 shadow-lg">
              <Link href="/get-involved#newsletter">
                Subscribe to Newsletter
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white/20 text-white border border-white/30 hover:bg-white/30 shadow-lg">
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
