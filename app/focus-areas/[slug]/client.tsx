"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Target, Users, Calendar, TrendingUp, FileText, Download } from "lucide-react";
import { FocusAreaService, FocusArea } from "@/lib/focus-area-service";

interface FocusAreaDetailClientProps {
  slug: string;
}

const FocusAreaDetailClient: React.FC<FocusAreaDetailClientProps> = ({ slug }) => {
  const [focusArea, setFocusArea] = useState<FocusArea | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    async function loadFocusArea() {
      try {
        setLoading(true);
        const data = await FocusAreaService.getFocusAreaBySlug(slug);
        if (data) {
          setFocusArea(data);
          setError(null);
        } else {
          setError("Focus area not found");
        }
      } catch (err) {
        console.error("Error loading focus area:", err);
        setError("Failed to load focus area. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadFocusArea();
  }, [slug]);

  const sections = [
    { id: "overview", label: "Overview", icon: Target },
    { id: "outcomes", label: "Outcomes", icon: TrendingUp },
    { id: "partners", label: "Partners", icon: Users },
    { id: "timeline", label: "Timeline", icon: Calendar },
    { id: "resources", label: "Resources", icon: FileText }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 180;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading focus area...</p>
      </div>
    );
  }

  if (error || !focusArea) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-lg text-red-600 mb-4">{error || "Focus area not found"}</p>
        <Button asChild>
          <Link href="/focus-areas">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Focus Areas
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <Image
          src={focusArea.image_url || "/hero/focus-areas-hero.jpg"}
          alt={focusArea.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                asChild
                variant="ghost"
                className="text-white hover:text-white/80 mb-6"
              >
                <Link href="/focus-areas">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Focus Areas
                </Link>
              </Button>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {focusArea.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl">
                {focusArea.overview_summary}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Navigation Bar */}
      <div className="sticky top-24 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 overflow-x-auto py-4">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeSection === section.id
                      ? "bg-[#800020] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-muted/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview Section */}
          <section id="overview" className="mb-16 scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 text-foreground">Overview</h2>

              <Card className="p-8 mb-8 bg-white/40 border border-white/50 backdrop-blur-sm">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {focusArea.overview_summary}
                </p>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-8 bg-white/40 border border-white/50 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-6 text-foreground">Objectives</h3>
                  <ul className="space-y-3">
                    {focusArea.objectives.map((objective, index) => (
                      <li key={objective.id} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground">{objective.text}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-8 bg-white/40 border border-white/50 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-6 text-foreground">Key Activities</h3>
                  <ul className="space-y-3">
                    {focusArea.activities.map((activity, index) => (
                      <li key={activity.id} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground">{activity.text}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </motion.div>
          </section>

          {/* Outcomes Section */}
          <section id="outcomes" className="mb-16 scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 text-foreground">Outcomes & Impact</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {focusArea.outcomes.map((outcome, index) => (
                  <motion.div
                    key={outcome.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 h-full bg-white/40 border border-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <TrendingUp className="h-8 w-8 text-green-600" />
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {outcome.metric}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">{outcome.title}</h3>
                      <p className="text-muted-foreground">{outcome.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Partners Section */}
          <section id="partners" className="mb-16 scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 text-foreground">Our Partners</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {focusArea.partners.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 h-full bg-white/40 border border-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4">
                        <Users className="h-8 w-8 text-blue-600 flex-shrink-0" />
                        <div>
                          <h3 className="text-lg font-bold mb-2 text-foreground">{partner.name}</h3>
                          <Badge className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-100">
                            {partner.type}
                          </Badge>
                          <p className="text-sm text-muted-foreground">{partner.role}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Timeline Section */}
          <section id="timeline" className="mb-16 scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 text-foreground">Timeline & Status</h2>

              <Card className="p-8 mb-8 bg-white/40 border border-white/50 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Program Status</h3>
                    <p className="text-muted-foreground">Started: {focusArea.start_date}</p>
                  </div>
                  <Badge className="bg-green-500 text-white hover:bg-green-500 text-lg px-6 py-2 mt-4 md:mt-0">
                    {focusArea.status}
                  </Badge>
                </div>

                <div className="relative pl-8 border-l-4 border-[#800020]">
                  {focusArea.milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="mb-8 relative"
                    >
                      <div className="absolute -left-10 mt-1 w-4 h-4 rounded-full bg-[#800020] border-4 border-white shadow"></div>
                      <div className="bg-white/60 rounded-lg p-4 backdrop-blur-sm">
                        <span className="text-sm font-bold text-[#800020] mb-1 block">{milestone.year}</span>
                        <p className="text-foreground">{milestone.event}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </section>

          {/* Resources Section */}
          {focusArea.resources && focusArea.resources.length > 0 && (
            <section id="resources" className="mb-16 scroll-mt-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-8 text-foreground">Resources</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {focusArea.resources.map((resource, index) => {
                    // Extract file extension from the file name
                    const fileExtension = resource.name.split('.').pop()?.toUpperCase() || 'FILE';

                    return (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Card className="p-6 h-full bg-white/40 border border-white/50 backdrop-blur-sm hover:shadow-lg transition-all hover:scale-105">
                          <a
                            href={resource.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col h-full"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <FileText className="h-10 w-10 text-[#800020] flex-shrink-0" />
                              <Badge className="bg-[#800020] text-white hover:bg-[#800020]">
                                {fileExtension}
                              </Badge>
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-3 flex-grow">
                              {resource.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-[#800020] font-medium">
                              <Download className="h-4 w-4" />
                              <span>Download</span>
                            </div>
                          </a>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </section>
          )}
        </div>
      </div>

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
            Want to Learn More?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-12 max-w-4xl mx-auto"
          >
            Explore our other focus areas or get in touch to discuss collaboration opportunities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button asChild size="lg" className="bg-[#800020] text-white hover:bg-[#800020]/90">
              <Link href="/focus-areas">
                View All Focus Areas
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-[#800020] text-white hover:bg-[#800020]/90">
              <Link href="/get-involved/contact">
                Contact Us
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FocusAreaDetailClient;
