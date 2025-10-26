"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface Publication {
  id: string;
  title: string;
  type: string;
  date: string;
  description: string;
  category: string;
  url?: string;
  pdf?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

interface PublicationsApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Publication[];
}

const Publications: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch publications and categories in parallel
        const [publicationsResponse, categoriesResponse] = await Promise.all([
          fetch('https://cepa-backend-production.up.railway.app/resources/publications/?page_size=100'),
          fetch('https://cepa-backend-production.up.railway.app/resources/publications/categories/')
        ]);

        if (!publicationsResponse.ok) {
          throw new Error('Failed to fetch publications');
        }

        const publicationsData: PublicationsApiResponse = await publicationsResponse.json();
        setPublications(publicationsData.results);

        // Set categories with "All" at the beginning
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(['All', ...categoriesData.filter((cat: string) => cat)]);
        } else {
          setCategories(['All']);
        }

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching publications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fallback publications in case API fails
  const fallbackPublications = [
    {
      id: "policy-brief-democratic-governance",
      title: "Policy Brief: Advancing Democratic Governance: Leveraging Digital Tools for Inclusive Parliamentary Monitoring in Africa and Beyond",
      type: "Policy Brief",
      date: "2024",
      description: "This policy brief explores how digital tools can enhance parliamentary monitoring and democratic governance across Africa, providing recommendations for inclusive and effective oversight mechanisms.",
      category: "Governance",
      url: "https://cepa.or.ug/blogs/policy-brief-advancing-democratic-governance-leveraging-digital-tools-for-inclusive-parliamentary-monitoring-in-africa-and-beyond/",
      pdf: "/publications/policy-brief-democratic-governance.pdf",
      featured: true
    },
    {
      id: "budget-analysis-2024",
      title: "Policy Paper: Analyzing the Practicability and Sustainability of Uganda's FY2024-25 Budget: Challenges, Implications and Policy Recommendations",
      type: "Policy Paper",
      date: "2024",
      description: "A comprehensive analysis of Uganda's 2024-25 budget framework, examining its sustainability and providing evidence-based policy recommendations for improved fiscal management.",
      category: "Public Finance",
      url: "https://cepa.or.ug/blogs/policy-paper-analyzing-the-practicability-and-sustainability-of-ugandas-fy2024-25-budget-challenges-implications-and-policy-recommendations/",
      pdf: "/publications/policy-paper-budget-analysis.pdf",
      featured: true
    },
    {
      id: "access-information-press-freedom",
      title: "Policy Paper: Strengthening Access to Information and Press Freedom in Uganda: Policy Recommendations for Enhancing Transparency, Accountability and Citizen Participation",
      type: "Policy Paper",
      date: "2024",
      description: "This policy paper examines the current state of access to information and press freedom in Uganda, offering strategic recommendations to enhance transparency and citizen participation in governance.",
      category: "Transparency",
      url: "https://cepa.or.ug/blogs/policy-paper-strengthening-access-to-information-and-press-freedom-in-uganda-policy-recommendations-for-enhancing-transparency-accountability-and-citizen-participation/",
      pdf: "/publications/policy-paper-press-freedom.pdf",
      featured: true
    },
    // {
    //   id: "ngo-bill-analysis",
    //   title: "A Brief Analysis of the Non-Governmental Organisations Bill 2015",
    //   type: "Analysis",
    //   date: "2015",
    //   description: "Critical analysis of the NGO Bill 2015, examining its implications for civil society organizations and democratic space in Uganda.",
    //   category: "Civil Society",
    //   url: "https://cepa.or.ug/blogs/a-brief-analysis-of-the-non-governmental-organisations-bill-2015/",
    //   pdf: null,
    //   featured: false
    // },
    // {
    //   id: "parliamentary-oversight",
    //   title: "Parliamentary Oversight in Accountability Affects Service Delivery in Public Institutions",
    //   type: "Research Report",
    //   date: "2024",
    //   description: "Investigating the relationship between parliamentary oversight mechanisms and service delivery outcomes in Uganda's public institutions.",
    //   category: "Accountability",
    //   url: "https://cepa.or.ug/blogs/parliamentary-oversight-in-accountability-affects-service-delivery-in-public-institutions/",
    //   pdf: null,
    //   featured: false
    // },
    {
      id: "data-protection-analysis",
      title: "Data Protection in the Digital Age: An Analysis of Uganda's Data Protection and Privacy Bill 2015",
      type: "Analysis",
      date: "2015",
      description: "Comprehensive analysis of Uganda's Data Protection and Privacy Bill, examining its provisions and implications for digital rights and privacy protection.",
      category: "Digital Rights",
      url: "https://cepa.or.ug/blogs/data-protection-in-the-digital-age-an-analysis-of-ugandas-data-protection-and-privacy-bill-2015/",
      pdf: null,
      featured: false
    },
    {
      id: "children-amendment-bill",
      title: "An Analytical Overview of Uganda's Proposed Children Amendment Bill 2015",
      type: "Analysis",
      date: "2015",
      description: "Detailed analysis of the Children Amendment Bill 2015, focusing on its potential impact on child rights and protection in Uganda.",
      category: "Human Rights",
      url: "https://cepa.or.ug/blogs/an-analytical-overview-of-ugandas-proposed-children-amendment-bill-2015/",
      pdf: "/publications/children-amendment-bill-analysis.pdf",
      featured: false
    },
    // {
    //   id: "public-finance-management",
    //   title: "Five Things We Learnt from the Passing of the Public Finance Management Amendment Bill 2015",
    //   type: "Analysis",
    //   date: "2015",
    //   description: "Key insights and lessons learned from the passage of the Public Finance Management Amendment Bill, highlighting its significance for fiscal governance.",
    //   category: "Public Finance",
    //   url: "https://cepa.or.ug/blogs/five-things-we-learnt-from-the-passing-of-the-public-finance-management-amendment-bill-2015/",
    //   pdf: null,
    //   featured: false
    // },
    // {
    //   id: "parliamentary-pensions",
    //   title: "Flaws in the Recently Passed Parliamentary Pensions Amendment Bill 2014",
    //   type: "Analysis",
    //   date: "2014",
    //   description: "Critical examination of the Parliamentary Pensions Amendment Bill, identifying key flaws and their implications for legislative accountability.",
    //   category: "Governance",
    //   url: "https://cepa.or.ug/blogs/flaws-in-the-recently-passed-parliamentary-pensions-amendment-bill-2014/",
    //   pdf: null,
    //   featured: false
    // },
    {
      id: "tobacco-control-bill",
      title: "Comprehensive Ban on Tobacco Advertising in the Recently Passed Tobacco Control Bill is Within Public Interest",
      type: "Analysis",
      date: "2024",
      description: "Analysis of the Tobacco Control Bill's advertising restrictions, arguing for their alignment with public health interests and constitutional rights.",
      category: "Public Health",
      url: "https://cepa.or.ug/blogs/comprehensive-ban-on-tobacco-advertising-in-the-recently-passed-tobbaco-control-bill-is-within-public-interest-and-does-not-infringe-tobacco-companies-intellectual-property-rights/",
      pdf: "/publications/tobacco-control-bill-analysis.pdf",
      featured: false
    }
  ];

  // Use API data if available, otherwise use fallback
  const publicationsToDisplay = publications.length > 0 ? publications : fallbackPublications;

  // Filter publications by selected category
  const filteredPublications = selectedCategory === "All"
    ? publicationsToDisplay
    : publicationsToDisplay.filter(pub => pub.category === selectedCategory);

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
      "Governance": "bg-primary/10 text-primary border-primary",
      "Public Finance": "bg-secondary/10 text-secondary border-secondary",
      "Transparency": "bg-accent/10 text-accent border-accent",
      "Civil Society": "bg-destructive/10 text-destructive border-destructive",
      "Accountability": "bg-primary/10 text-primary border-primary",
      "Digital Rights": "bg-secondary/10 text-secondary border-secondary",
      "Human Rights": "bg-accent/10 text-accent border-accent",
      "Public Health": "bg-destructive/10 text-destructive border-destructive",
    };
    return colors[category] || "bg-muted text-muted-foreground border-muted";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-muted-foreground">Loading publications...</p>
        </div>
      </div>
    );
  }

  if (error && publicationsToDisplay.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-destructive mb-4">Error loading publications: {error}</p>
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
          src="/hero/publications-hero.jpg" 
          alt="Publications - CEPA Research"
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
              Publications
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Explore our research publications, policy briefs, and analytical reports covering governance, democracy, and policy analysis in Uganda.
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

      {/* Featured Publications */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Featured Publications
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Our latest research and policy analysis on critical governance and development issues in Uganda.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPublications.filter(pub => pub.featured).map((publication, index) => (
              <motion.div
                key={publication.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative h-96 overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white/20 border border-white/30 backdrop-blur-sm">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(/publications/default-publications.jpg)` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getCategoryColor(publication.category)} text-xs`}>
                      {publication.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/20 text-white border-white/30 text-xs">
                      {publication.type}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{publication.title}</h3>
                    <p className="text-sm text-white/90 mb-3">{formatDate(publication.date)}</p>
                    <p className="text-sm text-white/80 mb-4 line-clamp-3">{publication.description}</p>
                    <div className="flex gap-2">
                      {publication.pdf && (
                        <Button asChild size="sm" variant="outline" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90">
                          <a href={publication.pdf} target="_blank" rel="noopener noreferrer">
                            Download PDF
                          </a>
                        </Button>
                      )}
                      {publication.url && (
                        <Button asChild size="sm" variant="outline" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90">
                          <a href={publication.url} target="_blank" rel="noopener noreferrer">
                            View Online
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* All Publications */}
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
              All Publications
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Complete collection of our research publications, policy briefs, and analytical reports.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPublications.map((publication, index) => (
              <motion.div
                key={publication.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative h-96 overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white/20 border border-white/30 backdrop-blur-sm">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(/publications/default-publications.jpg)` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getCategoryColor(publication.category)} text-xs`}>
                      {publication.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/20 text-white border-white/30 text-xs">
                      {publication.type}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{publication.title}</h3>
                    <p className="text-sm text-white/90 mb-3">{formatDate(publication.date)}</p>
                    <p className="text-sm text-white/80 mb-4 line-clamp-3">{publication.description}</p>
                    <div className="flex gap-2">
                      {publication.pdf && (
                        <Button asChild size="sm" variant="outline" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90">
                          <a href={publication.pdf} target="_blank" rel="noopener noreferrer">
                            Download PDF
                          </a>
                        </Button>
                      )}
                      {publication.url && (
                        <Button asChild size="sm" variant="outline" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90">
                          <a href={publication.url} target="_blank" rel="noopener noreferrer">
                            View Online
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-20" style={{background: 'linear-gradient(to right, rgb(30 64 175), rgb(245 158 11), rgb(16 185 129), rgb(239 68 68))'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Stay Informed
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-12 max-w-4xl mx-auto"
          >
            Subscribe to our newsletter to receive the latest publications, research updates, and policy insights directly to your inbox.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
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
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Publications;
