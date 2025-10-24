"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface Podcast {
  id: string;
  title: string;
  description: string;
  youtube_id: string;
  youtube_embed_url: string;
  thumbnail?: string;
  duration?: string;
  category?: string;
  date: string;
  guest?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

const Podcasts: React.FC = () => {
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch podcasts and categories in parallel
        const [podcastsResponse, categoriesResponse] = await Promise.all([
          fetch('https://cepa-backend-production.up.railway.app/multimedia/podcasts/'),
          fetch('https://cepa-backend-production.up.railway.app/multimedia/podcasts/categories/')
        ]);

        if (!podcastsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const podcastsData = await podcastsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setPodcasts(podcastsData.results || podcastsData);
        setCategories(['All', ...categoriesData.filter((cat: string) => cat)]);
        setError(null);
      } catch (err) {
        console.error('Error fetching podcasts:', err);
        setError('Failed to load podcasts. Please try again later.');
        
        // Fallback data
        setPodcasts([]);
        setCategories(['All']);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openPodcastModal = (podcast: Podcast) => {
    setSelectedPodcast(podcast);
    setIsModalOpen(true);
  };

  const closePodcastModal = () => {
    setSelectedPodcast(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        closePodcastModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const filteredPodcasts = selectedCategory === "All" 
    ? podcasts 
    : podcasts.filter(podcast => podcast.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading podcasts...</p>
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero/podcast-hero.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Podcasts
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
            >
              In-depth conversations with thought leaders, policymakers, and experts shaping Uganda's future
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
            </motion.div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
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

        {/* Podcasts Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPodcasts.map((podcast, index) => (
            <motion.div
              key={podcast.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative h-96 overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white/20 border border-white/30 backdrop-blur-sm">
              <img
                src={podcast.thumbnail || `/videos/default-podcast.jpg`}
                alt={podcast.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/videos/default-podcast.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 cursor-pointer" onClick={() => openPodcastModal(podcast)}>
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  {podcast.category && (
                    <span className="bg-primary/90 text-white px-2 py-1 rounded text-xs">{podcast.category}</span>
                  )}
                  {podcast.duration && (
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">{podcast.duration}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{podcast.title}</h3>
                <p className="text-white/90 text-sm mb-3 line-clamp-2">{podcast.description}</p>
                {podcast.guest && (
                  <p className="text-white/80 text-xs mb-2 italic">
                    <span className="font-semibold">Guest:</span> {podcast.guest}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">{new Date(podcast.date).toLocaleDateString()}</span>
                  <Button size="sm" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90 rounded-md px-4 py-2" onClick={() => openPodcastModal(podcast)}>
                    Play Now
                  </Button>
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
            Stay Updated with Policy Insights
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-12 max-w-4xl mx-auto"
          >
            Subscribe to our podcast for the latest policy analysis, expert interviews, and in-depth discussions on Uganda's development journey.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button size="lg" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90 shadow-lg">
              Subscribe on YouTube
            </Button>
            <Button size="lg" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90 shadow-lg">
              Follow on Social Media
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Podcast Modal */}
      {isModalOpen && selectedPodcast && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={closePodcastModal}>
          <div className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={closePodcastModal}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedPodcast.youtube_id}?autoplay=1&rel=0`}
                title={selectedPodcast.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">{selectedPodcast.title}</h3>
              <p className="text-muted-foreground mb-4">{selectedPodcast.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                {selectedPodcast.category && (
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full">{selectedPodcast.category}</span>
                )}
                {selectedPodcast.duration && <span>{selectedPodcast.duration}</span>}
                <span>{new Date(selectedPodcast.date).toLocaleDateString()}</span>
              </div>
              {selectedPodcast.guest && (
                <p className="text-sm text-muted-foreground">
                  <strong>Guest:</strong> {selectedPodcast.guest}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Podcasts;
