"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { NewsService, NewsArticle } from "@/lib/news-service";

interface NewsDetailPageProps {
  params: {
    slug: string;
  };
}

const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ params }) => {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Fetch the specific article by slug
        const foundArticle = await NewsService.getNewsBySlug(params.slug);
        if (foundArticle) {
          setArticle(foundArticle);
          // Fetch related articles
          const related = await NewsService.getRelatedNews(foundArticle.id, 3);
          setRelatedArticles(related);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            {error || "The requested news article could not be found."}
          </p>
          <Button asChild className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-900 border border-blue-600/30 backdrop-blur-sm font-medium py-2 px-4 rounded-md transition-all duration-200">
            <Link href="/resources/news">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const _oldNewsArticles = {
    "ministry-of-health-seeks-ugx450bn-for-emergency-medical-services-for-road-crash-victims": {
      id: "ministry-health-ugx450bn-emergency-services",
      title: "Ministry of Health Seeks UGX450Bn for Emergency Medical Services for Road Crash Victims",
      date: "September 2023",
      category: "Health",
      image: "/news/health-emergency-services.jpg",
      content: `
        <p>The Ministry of Health has revealed that in order for Uganda to reduce incidences of deaths resulting from road crash victims failure to access Emergency Health Services (EHS) in time after encountering road crashes, the Government will need to raise UGX450Bn for the purchase and operationalisation of ambulances within 5years.</p>
        
        <p>The call was made by Maria Nkalubo, Principal Operations Officer-Ministry of Health while addressing MPs on both the Health Committee and Parliamentary Forum on Road Safety during an Advocacy meeting organised by the Centre for Policy Analysis (CEPA), where the Civil society group decried the low funding to emergency health services. They cited studies from the World Health Organisation (WHO) that noted that functional emergency services can reduce 54% of preventable deaths in Low- and Middle-Income Countries, such as Uganda. Nkalubo remarked,</p>
        
        <blockquote class="border-l-4 border-primary pl-4 my-6 italic text-lg">
          <p>"In terms of figures, the requirement is [UGX]450bn in a period of five years, that is how expensive EHS is, and when we presented this to Ministry of Finance, they chased us away saying this is a whole budget for Gov't, so we had to go back and crook some smaller figures. Annually for 300 ambulances, we need [UGX]10bn for operating the road ambulances and this covers fuel, maintenance, and human resource, while [UGX]1.8bn is needed to operate the 14 marine ambulances annually."</p>
        </blockquote>
        
        <p>Her remarks were in response to revelations made by Esther Busiku, CEPA's Program Officer who noted that while Uganda has made some progress regarding emergency care for victims, a lot needs to be done to improve the situation, especially with regard to how victims are handled before they access professional care.</p>
        
        <blockquote class="border-l-4 border-secondary pl-4 my-6 italic text-lg">
          <p>"Uganda's national emergency medical system is still lacking and underdeveloped, which calls for the need to establish a well-coordinated and organized system if we are to save the lives of the crash victims. While the Country has made some progress [regarding] emergency care for victims, a lot still remains to better the situation especially with regard to how victims are handled before they access professional care, [such as], the [quality of] first responders, [are they) trained/skilled personnel, standard of vehicles to transport victims, time of arrival of professional help…"</p>
        </blockquote>
        
        <p>Gerald Mutungi, Assistant Commissioner (Non-Communicable Diseases) Ministry of Health, raised concern over the increased number of road crash injuries in Uganda in the past five years, from 50,665 in 2017 to 155,188 in 2022, and yet these figures aren't matched with emergency cares specialists putting most road crash victims at the mercy of first responders who are mostly police and bystanders yet these don't have the requisite training for handling road crash victims.</p>
        
        <p>He also revealed that although there have been calls to ban ambulances bought by MPs because they don't have the requisite components to qualify as ambulances but rather Patient Transport Vehicles, they are better than transporting patients at the back of police patrol vehicles.</p>
        
        <p>Seth Wambede (Bugokho North) decried the lack of standardisation of ambulances in Uganda, stating that the situation is worsened by the failure to service these ambulances, and this ends up jeopardising the lives of the patients being transported.</p>
        
        <p>Nkalubo, while reacting to this, revealed that there are 173 Type A ambulances that the Ministry of Health is planning to phase out in Uganda, and this started with the purchase of 140 Type B ambulances, with more 100 Type B ambulance expected at the end of 2023, and the reason these are being phased out is because many are old, dilapidated, empty and many are found moving around with onions and jerrycans in the cabin, and with no stretchers for the patients.</p>
      `
    },
    "world-remembrance-day-for-road-traffic-victims-should-be-a-day-to-propel-action": {
      id: "world-remembrance-day-road-traffic-victims",
      title: "World Remembrance Day For Road Traffic Victims Should be a Day to Propel Action",
      date: "November 2023",
      category: "Road Safety",
      image: "/news/road-safety-remembrance.jpg",
      content: `
        <p>As Uganda commemorates World Remembrance Day for Road Traffic Victims, the Centre for Policy Analysis (CEPA) calls for concrete action to address the growing road safety crisis and implement effective measures to reduce traffic-related deaths.</p>
        
        <p>Road traffic accidents continue to be a major public health concern in Uganda, with thousands of lives lost annually due to preventable causes. This day serves as a reminder of the urgent need for comprehensive road safety measures and policy reforms.</p>
        
        <p>CEPA has been at the forefront of advocating for improved road safety policies, working closely with parliamentarians, government officials, and civil society organizations to develop evidence-based solutions that can save lives and reduce the economic burden of road crashes.</p>
        
        <p>Key areas of focus include:</p>
        <ul class="list-disc pl-6 my-4 space-y-2">
          <li>Strengthening road safety legislation and enforcement</li>
          <li>Improving emergency medical services for crash victims</li>
          <li>Enhancing driver education and licensing standards</li>
          <li>Investing in safer road infrastructure</li>
          <li>Promoting public awareness campaigns</li>
        </ul>
        
        <p>Through our ongoing advocacy efforts, CEPA continues to push for the implementation of the National Road Safety Action Plan and other critical policy measures that can make Uganda's roads safer for all users.</p>
      `
    },
    "financing-safer-roads-cepa-rallies-stakeholders-for-increased-road-safety-investment": {
      id: "financing-safer-roads-stakeholders",
      title: "Financing Safer Roads: CEPA Rallies Stakeholders for Increased Road Safety Investment",
      date: "July 2025",
      category: "Road Safety",
      image: "/news/financing-safer-roads.jpg",
      content: `
        <p>CEPA convened key stakeholders to discuss strategies for increasing investment in road safety infrastructure and programs across Uganda to reduce traffic accidents and fatalities.</p>
        
        <p>The stakeholder meeting brought together representatives from government ministries, development partners, civil society organizations, and the private sector to explore innovative financing mechanisms for road safety initiatives.</p>
        
        <p>Key outcomes from the meeting include:</p>
        <ul class="list-disc pl-6 my-4 space-y-2">
          <li>Development of a comprehensive road safety financing framework</li>
          <li>Identification of potential funding sources and partnerships</li>
          <li>Creation of a multi-stakeholder coordination mechanism</li>
          <li>Establishment of monitoring and evaluation frameworks</li>
        </ul>
        
        <p>This initiative is part of CEPA's broader commitment to improving road safety outcomes in Uganda through evidence-based advocacy and stakeholder engagement.</p>
      `
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Health": "bg-primary/10 text-primary border-primary",
      "Road Safety": "bg-secondary/10 text-secondary border-secondary",
      "Advocacy": "bg-accent/10 text-accent border-accent",
      "Education": "bg-destructive/10 text-destructive border-destructive",
      "Governance": "bg-primary/10 text-primary border-primary",
      "Digital Rights": "bg-secondary/10 text-secondary border-secondary"
    };
    return colors[category] || "bg-muted text-muted-foreground border-muted";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src={article.image || '/news/default-news.jpg'} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Badge className={`${getCategoryColor(article.category)} text-sm`}>
                {article.category}
              </Badge>
              <div className="flex items-center text-white/80 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                {article.date}
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button asChild className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-900 border border-blue-600/30 backdrop-blur-sm font-medium py-2 px-4 rounded-md transition-all duration-200 mb-8">
              <Link href="/resources/news">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Link>
            </Button>
          </div>
          
          <article 
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:p-6 prose-blockquote:rounded-r-lg"
            dangerouslySetInnerHTML={{ __html: article.content || article.description }}
          />
          
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className={`${getCategoryColor(article.category)} text-sm`}>
                  <Tag className="w-3 h-3 mr-1" />
                  {article.category}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Published on {article.date}
                </span>
              </div>
              <Button asChild className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-900 border border-blue-600/30 backdrop-blur-sm font-medium py-2 px-4 rounded-md transition-all duration-200">
                <Link href="/resources/news">
                  View All News
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedArticles
              .map((relatedArticle, index) => {
                const themeColors = ["border-primary", "border-secondary", "border-accent", "border-destructive"];
                const currentColor = themeColors[index % 4];
                
                return (
                  <div key={relatedArticle.id} className="relative h-80 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group bg-white/20 border border-white/30 backdrop-blur-sm">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${relatedArticle.image || '/events/default-event.jpg'})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getCategoryColor(relatedArticle.category)} text-xs`}>
                        {relatedArticle.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-sm text-white/90 mb-3">
                        {relatedArticle.date}
                      </p>
                      <Button asChild size="sm" className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm font-medium py-1 px-3 rounded-md transition-all duration-200">
                        <Link href={`/resources/news/${relatedArticle.slug}`}>
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

export default NewsDetailPage;
