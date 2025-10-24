"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FocusAreas: React.FC = () => {
  const focusAreas = [
    {
      id: "parliament-watch",
      title: "Parliament Watch",
      image: "/focus-areas/parliament.jpg",
      description: "Monitoring parliamentary proceedings and ensuring accountability in legislative processes.",
      color: "blue"
    },
    {
      id: "democracy",
      title: "Parliamentary Democracy and Governance",
      image: "/focus-areas/democracy.jpg",
      description: "Strengthening democratic institutions and promoting good governance practices.",
      color: "yellow"
    },
    {
      id: "transparency",
      title: "Transparency and Accountability",
      image: "/focus-areas/transparency.jpg",
      description: "Advocating for open government and holding leaders accountable to citizens.",
      color: "green"
    },
    {
      id: "human-rights",
      title: "Human Rights",
      image: "/focus-areas/human-rights.jpg",
      description: "Protecting and promoting fundamental human rights and freedoms.",
      color: "red"
    },
    {
      id: "health",
      title: "Public Health and Road Safety",
      image: "/focus-areas/health.jpg",
      description: "Improving public health outcomes and road safety across Uganda.",
      color: "blue"
    },
    {
      id: "climate",
      title: "Climate Justice",
      image: "/focus-areas/climate.jpg",
      description: "Addressing climate change impacts and promoting environmental sustainability.",
      color: "green"
    },
    {
      id: "ai",
      title: "Artificial Intelligence (AI)",
      image: "/focus-areas/artificial-intelligence.jpg",
      description: "Leveraging technology and AI for better governance and policy outcomes.",
      color: "blue"
    },
    {
      id: "scrutiny",
      title: "Post Legislative Scrutiny",
      image: "/focus-areas/democracy.jpg",
      description: "Assessing the effectiveness of laws and policies after implementation.",
      color: "yellow"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src="/hero/focus-areas-hero.jpg"
          alt="Our Focus Areas - CEPA"
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
                    style={{ backgroundImage: `url(${area.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-3">{area.title}</h3>
                    <p className="text-sm text-white/90 mb-6 line-clamp-3">{area.description}</p>
                    <Button
                      asChild
                      className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                    >
                      <Link href={`/focus-areas/${area.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
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
