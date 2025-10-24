"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  ExternalLink,
  Linkedin,
  Twitter,
  ArrowLeft,
  Users,
  Briefcase,
  Image as ImageIcon,
  FileText,
} from "lucide-react";
import { cohortService, CohortDetail } from "@/lib/cohort-service";

export default function CohortDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [cohort, setCohort] = useState<CohortDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    async function fetchCohort() {
      try {
        const data = await cohortService.getCohortBySlug(slug);
        setCohort(data);
      } catch (err) {
        setError("Failed to load cohort details");
        console.error("Error fetching cohort:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCohort();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "fellows", "projects", "events", "gallery"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "fellows", label: "Fellows", icon: Users, show: cohort?.fellows && cohort.fellows.length > 0 },
    { id: "projects", label: "Projects", icon: Briefcase, show: cohort?.projects && cohort.projects.length > 0 },
    { id: "events", label: "Events", icon: Calendar, show: cohort?.events && cohort.events.length > 0 },
    { id: "gallery", label: "Gallery", icon: ImageIcon, show: cohort?.gallery_images && cohort.gallery_images.length > 0 },
  ].filter(item => item.show !== false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cohort details...</p>
        </div>
      </div>
    );
  }

  if (error || !cohort) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cohort Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The cohort you're looking for doesn't exist."}</p>
          <Button className="bg-[#800020] hover:bg-[#800020]/90 text-white border border-[#800020]" asChild>
            <Link href="/get-involved/fellowships">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Fellowships
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Button className="bg-[#800020]/20 hover:bg-[#800020]/30 text-white border border-[#800020] backdrop-blur-sm" asChild>
          <Link href="/get-involved/fellowships">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Fellowships
          </Link>
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">
        {/* Side Navigation - Desktop Only */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <nav className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 space-y-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-4 mb-4">
                On This Page
              </h3>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-md transition-all ${
                      activeSection === item.id
                        ? "bg-red-900/80 text-white shadow-md"
                        : "text-gray-700 hover:bg-red-900/10"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Hero Section */}
          <section className="relative py-12">
            {cohort.hero_image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8"
            >
              <Image
                src={cohort.hero_image}
                alt={cohort.name}
                fill
                className="object-cover"
              />
            </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge className="mb-4">{cohort.year}</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                {cohort.name}
              </h1>
            </motion.div>
          </section>

          {/* Overview Section */}
          <section id="overview" className="py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {cohort.overview}
              </p>
            </motion.div>
          </section>

          <Separator className="my-8" />

          {/* Fellows Section */}
          {cohort.fellows && cohort.fellows.length > 0 && (
            <section id="fellows" className="py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Users className="h-6 w-6 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Fellows</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cohort.fellows.map((fellow, index) => (
                  <motion.div
                    key={fellow.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <Card className="h-96 hover:shadow-lg transition-shadow overflow-hidden p-0 border-0">
                      <div className="relative h-full w-full group">
                        {fellow.profile_image ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={fellow.profile_image}
                              alt={fellow.name}
                              fill
                              className="object-cover"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                            {/* Content at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                              <h3 className="text-2xl font-bold mb-1">
                                {fellow.name}
                              </h3>
                              {fellow.position && (
                                <p className="text-sm text-blue-300 mb-3">
                                  {fellow.position}
                                </p>
                              )}
                              <p className="text-sm text-gray-200 mb-4 line-clamp-3">
                                {fellow.bio}
                              </p>
                              <div className="flex gap-3">
                                {fellow.linkedin_url && (
                                  <a
                                    href={fellow.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-blue-300 transition-colors"
                                  >
                                    <Linkedin className="h-5 w-5" />
                                  </a>
                                )}
                                {fellow.twitter_url && (
                                  <a
                                    href={fellow.twitter_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-blue-300 transition-colors"
                                  >
                                    <Twitter className="h-5 w-5" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-end">
                            <div className="p-6 text-white">
                              <h3 className="text-2xl font-bold mb-1">
                                {fellow.name}
                              </h3>
                              {fellow.position && (
                                <p className="text-sm text-blue-200 mb-3">
                                  {fellow.position}
                                </p>
                              )}
                              <p className="text-sm text-gray-100 mb-4">
                                {fellow.bio}
                              </p>
                              <div className="flex gap-3">
                                {fellow.linkedin_url && (
                                  <a
                                    href={fellow.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-blue-200 transition-colors"
                                  >
                                    <Linkedin className="h-5 w-5" />
                                  </a>
                                )}
                                {fellow.twitter_url && (
                                  <a
                                    href={fellow.twitter_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-blue-200 transition-colors"
                                  >
                                    <Twitter className="h-5 w-5" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            </section>
          )}

          {/* Projects Section */}
          {cohort.projects && cohort.projects.length > 0 && (
            <>
              <Separator className="my-8" />
              <section id="projects" className="py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cohort.projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    >
                      <Card className="h-full bg-white/60 backdrop-blur-sm border-0 shadow-md hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                          {project.image && (
                            <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                          <p className="text-gray-600 mb-4">{project.description}</p>
                          {project.project_url && (
                            <a
                              href={project.project_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-600 hover:text-blue-800"
                            >
                              View Project
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              </section>
            </>
          )}

          {/* Events Section */}
          {cohort.events && cohort.events.length > 0 && (
            <>
              <Separator className="my-8" />
              <section id="events" className="py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Events</h2>
                </div>

                <div className="space-y-4">
                  {cohort.events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    >
                      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-md hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Calendar className="h-8 w-8 text-blue-600" />
                              </div>
                            </div>
                            <div className="flex-grow">
                              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                <span className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {new Date(event.event_date).toLocaleDateString()}
                                </span>
                                {event.location && (
                                  <span className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {event.location}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-700">{event.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              </section>
            </>
          )}

          {/* Gallery Section */}
          {cohort.gallery_images && cohort.gallery_images.length > 0 && (
            <>
              <Separator className="my-8" />
              <section id="gallery" className="py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <ImageIcon className="h-6 w-6 text-blue-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Gallery</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {cohort.gallery_images.map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.1 + index * 0.05 }}
                      className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                    >
                      <Image
                        src={image.image}
                        alt={image.caption || "Gallery image"}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                      {image.caption && (
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all flex items-end p-4">
                          <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            {image.caption}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              </section>
            </>
          )}

          {/* Call to Action */}
          <section className="py-16">
            <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Interested in Joining?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Learn more about our fellowship programs and how to apply.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#800020] hover:bg-[#800020]/90 text-white border border-[#800020]" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button className="bg-[#800020] hover:bg-[#800020]/90 text-white border border-[#800020]" size="lg" asChild>
                <Link href="/get-involved/fellowships">View All Cohorts</Link>
              </Button>
            </div>
          </motion.div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
