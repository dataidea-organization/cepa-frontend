"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface GalleryImage {
  id: string;
  image: string;
  alt_text: string;
  caption: string;
  order: number;
  created_at: string;
  updated_at: string;
}

interface GalleryGroup {
  id: string;
  title: string;
  description: string;
  featured: boolean;
  images: GalleryImage[];
  thumbnail?: string;
  created_at: string;
  updated_at: string;
}

const Gallery: React.FC = () => {
  const [galleryGroups, setGalleryGroups] = useState<GalleryGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('https://cepa-backend-production.up.railway.app/multimedia/gallery-groups/');

        if (!response.ok) {
          throw new Error('Failed to fetch gallery data');
        }

        const data = await response.json();
        setGalleryGroups(data.results || data);
        setError(null);
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError('Failed to load gallery. Please try again later.');
        
        // Fallback data
        setGalleryGroups([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  // Filter gallery groups based on selection
  const filteredGroups = selectedGroup === "All"
    ? galleryGroups
    : galleryGroups.filter(group => group.id === selectedGroup);

  // Use backend data or show empty state
  const displayGalleryGroups = filteredGroups;

  if (!loading && galleryGroups.length === 0) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden">
          <img 
            src="/hero/gallery-hero.jpg" 
            alt="Gallery - CEPA"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">Gallery</h1>
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
                Explore our collection of photos from events, workshops, conferences, and activities that showcase CEPA's work in action.
              </p>
            </div>
          </div>
        </section>

        {/* Empty State */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">Coming Soon</h2>
            <p className="text-xl text-muted-foreground mb-8">
              We're working on adding our photo gallery. Check back soon to see our collection of event photos and activities.
            </p>
            <Button asChild size="lg">
              <Link href="/get-involved">Get Involved</Link>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src="/hero/gallery-hero.jpg" 
          alt="Gallery - CEPA"
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
              Gallery
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Explore our collection of photos from events, workshops, conferences, and activities that showcase CEPA's work in action.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
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
              Our Photo Gallery
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              A visual journey through CEPA's activities, events, and impact in Uganda's governance and policy landscape.
            </p>
          </motion.div>

          {/* Gallery Group Filters */}
          {galleryGroups.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Badge
                  variant="default"
                  className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                    selectedGroup === "All"
                      ? 'bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90'
                      : 'bg-[#800020]/20 text-[#800020] border border-[#800020]/30 hover:bg-[#800020]/30'
                  }`}
                  onClick={() => setSelectedGroup("All")}
                >
                  All
                </Badge>
              </motion.div>
              {galleryGroups.map((group, index) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Badge
                    variant="secondary"
                    className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                      selectedGroup === group.id
                        ? 'bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90'
                        : 'bg-[#800020]/20 text-[#800020] border border-[#800020]/30 hover:bg-[#800020]/30'
                    }`}
                    onClick={() => setSelectedGroup(group.id)}
                  >
                    {group.title}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          )}

          {displayGalleryGroups.length === 0 && selectedGroup !== "All" ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No images found in this gallery group.</p>
              <Button onClick={() => setSelectedGroup("All")} className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90">
                View All Galleries
              </Button>
            </div>
          ) : displayGalleryGroups.every(group => !group.images || group.images.length === 0) ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-xl text-muted-foreground">No images available for this gallery.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayGalleryGroups.map((group) => (
                group.images && group.images.length > 0 ? (
                  group.images.map((image, imageIndex) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: imageIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Card
                        className="relative h-64 overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white/20 border border-white/30 backdrop-blur-sm cursor-pointer"
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundImage: `url(${image.image || '/gallery/default-image.jpg'})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                            {image.alt_text || image.caption || 'Gallery Image'}
                          </h3>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                ) : null
              )).flat().filter(Boolean)}
            </div>
          )}
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
            Stay Connected
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Subscribe to our channels to get notified about new multimedia content and stay updated with our latest work.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90 shadow-lg">
              <Link href="/resources#newsletters">
                Subscribe to Newsletter
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90 shadow-lg">
              <Link href="/get-involved">
                Get Involved
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
