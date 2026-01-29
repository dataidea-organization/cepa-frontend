"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SlidingPartnersCarousel from "@/components/SlidingPartnersCarousel";
import { AboutService, AboutPageData } from "@/lib/about-service";

const About: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<Record<number, number>>({});
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Fetch about page data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AboutService.getAboutPageData();
        setAboutData(data);

        // Initialize counts for animation
        const initialCounts: Record<number, number> = {};
        data.stats.forEach((stat) => {
          initialCounts[stat.id] = 0;
        });
        setCounts(initialCounts);
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Animate stats
  useEffect(() => {
    if (!aboutData || hasAnimated || !aboutData.stats.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate each stat card
          aboutData.stats.forEach((stat) => {
            const targetValue = stat.value;
            const duration = 2000; // 2 seconds
            const steps = 50;
            const increment = targetValue / steps;
            const stepDuration = duration / steps;
            let currentValue = 0;

            const interval = setInterval(() => {
              currentValue += increment;
              if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(interval);
              }
              setCounts(prev => ({ ...prev, [stat.id]: Math.floor(currentValue) }));
            }, stepDuration);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [aboutData, hasAnimated]);

  if (loading || !aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const { hero, who_we_are, stats, our_story, what_sets_us_apart, call_to_action, team, partners } = aboutData;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {hero && (
        <section className="relative h-96 overflow-hidden">
          <img
            src={hero.hero_image_url || "/hero/about-hero.jpg"}
            alt={hero.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto">
                {hero.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Who We Are */}
      {who_we_are && (
        <section id="who-we-are" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {who_we_are.title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                {who_we_are.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
              <div>
                <div className="space-y-6">
                  {who_we_are.features.map((feature, index) => (
                    <div key={feature.id} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-12 h-12 ${
                        index === 0 ? 'bg-primary/10' :
                        index === 1 ? 'bg-secondary/10' :
                        'bg-accent/10'
                      } rounded-lg flex items-center justify-center`}>
                        <span className="text-2xl">{feature.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button asChild size="lg" className="shadow-lg bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90">
                    <a href="/get-involved">Join Our Mission</a>
                  </Button>
                </div>
              </div>

              <div ref={statsRef} className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={stat.id}>
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white/20 border border-white/30 backdrop-blur-sm">
                      <div className={`text-3xl font-bold mb-2 ${
                        index === 0 ? 'text-primary' :
                        index === 1 ? 'text-secondary' :
                        index === 2 ? 'text-accent' :
                        'text-destructive'
                      }`}>
                        {counts[stat.id] || 0}+
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Our Story */}
      {our_story && (
        <section id="story" className="py-16 bg-gradient-to-br from-blue-50 via-yellow-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {our_story.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {our_story.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {our_story.cards.map((card) => (
                <div key={card.id} className="h-full">
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white/20 border border-white/30 backdrop-blur-sm h-full flex flex-col">
                    <CardHeader>
                      <div className="text-4xl mb-4">{card.icon}</div>
                      <CardTitle className="text-xl">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-center">
                      <CardDescription className="text-base">
                        {card.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What Sets CEPA Apart */}
      {what_sets_us_apart && (
        <section id="what-sets-cepa-apart" className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {what_sets_us_apart.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {what_sets_us_apart.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {what_sets_us_apart.cards.map((card, index) => (
                <div key={card.id}>
                  <Card className="p-6 hover:shadow-lg transition-shadow bg-white/20 border border-white/30 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className={`text-xl ${index === 0 ? 'text-primary' : 'text-secondary'}`}>
                        {card.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {card.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Partners */}
      <section id="our-partners" className="py-20 bg-gradient-to-br from-blue-50 via-yellow-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Partners
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              We work with a diverse network of organizations, institutions, and stakeholders to advance our mission of strengthening democratic governance and promoting evidence-based policy analysis.
            </p>
          </div>

          <SlidingPartnersCarousel partners={partners || []} />

          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our partnerships enable us to leverage diverse expertise, resources, and networks to create meaningful impact in Uganda's governance landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section id="our-team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Meet the dedicated professionals who drive CEPA's mission of strengthening democratic governance and promoting evidence-based policy analysis in Uganda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team && team.length > 0 ? (
              team.map((member) => (
                <div key={member.id}>
                  <Card className="relative overflow-hidden text-center hover:shadow-lg transition-all duration-300 bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 p-0">
                    <div className="relative h-80 w-full">
                      <img
                        src={member.profile_image_url || '/team-images/default-avatar.jpg'}
                        alt={member.name}
                        className="w-full h-full object-cover object-[50%_20%]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-bold mb-1 text-white">{member.name}</h3>
                        <p className="text-white/90 font-semibold mb-4">{member.role}</p>
                        {member.linkedin_url && member.linkedin_url !== '#' && (
                          <Button
                            asChild
                            size="sm"
                            className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90 transition-all"
                          >
                            <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer">
                              See Profile
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-muted-foreground">No team members found</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90">
              <Link href="/get-involved/career">
                Join Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {call_to_action && (
        <section className="py-20" style={{background: 'linear-gradient(to right, rgb(30 64 175), rgb(245 158 11), rgb(16 185 129), rgb(239 68 68))'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {call_to_action.title}
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-4xl mx-auto">
              {call_to_action.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-green-800 text-white border border-green-800 hover:bg-green-900 shadow-lg">
                <Link href="/get-involved/donate">
                  Support Us
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90 shadow-lg">
                <Link href="/get-involved/career">
                  Explore Careers
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default About;