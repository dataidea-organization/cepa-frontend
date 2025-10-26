"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FocusAreaService, FocusAreaListItem } from "@/lib/focus-area-service";

const FocusAreas: React.FC = () => {
  const [focusAreas, setFocusAreas] = useState<FocusAreaListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFocusAreas() {
      try {
        setLoading(true);
        const data = await FocusAreaService.getAllFocusAreas();
        setFocusAreas(data);
        setError(null);
      } catch (err) {
        console.error("Error loading focus areas:", err);
        setError("Failed to load focus areas. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadFocusAreas();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="/hero/focus-areas-hero.jpg"
          alt="Our Focus Areas - CEPA"
          fill
          className="object-cover"
          priority
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
              Our Focus Areas
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              We work across multiple domains to create positive change in Uganda's governance landscape through evidence-based research and advocacy.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Focus Areas Cards Grid */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Loading focus areas...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-lg text-red-600">{error}</p>
            </div>
          ) : focusAreas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No focus areas available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="relative h-[400px] overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white/20 border border-white/30 backdrop-blur-sm">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: area.image_url ? `url(${area.image_url})` : `url(/hero/focus-areas-hero.jpg)` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-3">{area.title}</h3>
                      <p className="text-sm text-white/90 mb-6 line-clamp-3">{area.overview_summary}</p>
                      <Button
                        asChild
                        className="w-full bg-[#800020] hover:bg-[#600018] text-white border-none"
                      >
                        <Link href={`/focus-areas/${area.slug}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
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
            Interested in Our Work?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-12 max-w-4xl mx-auto"
          >
            Learn more about our research, publications, and how you can get involved in advancing good governance in Uganda.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button asChild size="lg" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90 shadow-lg">
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

export default FocusAreas;
