"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const FocusAreas: React.FC = () => {
  const focusAreas = [
    {
      id: "parliament-watch",
      title: "Parliament Watch",
      image: "/focus-areas/parliament.jpg",
      description: "Monitoring parliamentary proceedings and ensuring accountability in legislative processes.",
      details: "We track parliamentary sessions, analyze voting patterns, monitor committee activities, and assess the quality of legislative debates to ensure transparency and accountability in Uganda's parliament.",
      activities: [
        "Real-time monitoring of parliamentary sessions",
        "Analysis of voting patterns and attendance",
        "Committee oversight and reporting",
        "Legislative impact assessments"
      ],
      color: "blue"
    },
    {
      id: "democracy",
      title: "Parliamentary Democracy and Governance",
      image: "/focus-areas/democracy.jpg",
      description: "Strengthening democratic institutions and promoting good governance practices.",
      details: "We work to enhance democratic processes, improve institutional capacity, and promote participatory governance at all levels of government.",
      activities: [
        "Democratic institution strengthening",
        "Electoral process monitoring",
        "Governance capacity building",
        "Citizen participation enhancement"
      ],
      color: "yellow"
    },
    {
      id: "transparency",
      title: "Transparency and Accountability",
      image: "/focus-areas/transparency.jpg",
      description: "Advocating for open government and holding leaders accountable to citizens.",
      details: "We promote transparency in government operations, advocate for access to information, and work to ensure public officials are held accountable for their actions.",
      activities: [
        "Access to information advocacy",
        "Public expenditure tracking",
        "Anti-corruption initiatives",
        "Government transparency monitoring"
      ],
      color: "green"
    },
    {
      id: "human-rights",
      title: "Human Rights",
      image: "/focus-areas/human-rights.jpg",
      description: "Protecting and promoting fundamental human rights and freedoms.",
      details: "We monitor human rights violations, advocate for policy reforms, and work to ensure that all Ugandans can enjoy their fundamental rights and freedoms.",
      activities: [
        "Human rights monitoring and reporting",
        "Policy advocacy for rights protection",
        "Legal aid and support services",
        "Rights awareness campaigns"
      ],
      color: "red"
    },
    {
      id: "health",
      title: "Public Health and Road Safety",
      image: "/focus-areas/health.jpg",
      description: "Improving public health outcomes and road safety across Uganda.",
      details: "We conduct research on public health issues, advocate for better healthcare policies, and work to improve road safety through evidence-based interventions.",
      activities: [
        "Public health policy research",
        "Healthcare system analysis",
        "Road safety advocacy",
        "Health awareness campaigns"
      ],
      color: "blue"
    },
    {
      id: "climate",
      title: "Climate Justice",
      image: "/focus-areas/climate.jpg",
      description: "Addressing climate change impacts and promoting environmental sustainability.",
      details: "We research climate change impacts on Uganda, advocate for sustainable policies, and work with communities to build resilience against climate-related challenges.",
      activities: [
        "Climate impact assessments",
        "Environmental policy advocacy",
        "Community resilience building",
        "Sustainable development promotion"
      ],
      color: "green"
    },
    {
      id: "ai",
      title: "Artificial Intelligence (AI)",
      image: "/focus-areas/artificial-intelligence.jpg",
      description: "Leveraging technology and AI for better governance and policy outcomes.",
      details: "We explore how AI and technology can improve governance, enhance service delivery, and support evidence-based policy making in Uganda.",
      activities: [
        "AI policy research and analysis",
        "Technology governance frameworks",
        "Digital rights advocacy",
        "Innovation in public service delivery"
      ],
      color: "blue"
    },
    {
      id: "scrutiny",
      title: "Post Legislative Scrutiny",
      image: "/focus-areas/democracy.jpg",
      description: "Assessing the effectiveness of laws and policies after implementation.",
      details: "We conduct systematic reviews of implemented policies and laws to assess their effectiveness, identify gaps, and recommend improvements for better outcomes.",
      activities: [
        "Policy effectiveness evaluations",
        "Legislative impact assessments",
        "Implementation monitoring",
        "Policy improvement recommendations"
      ],
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

      {/* Detailed Focus Areas */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">          
          <div className="space-y-16">
            {focusAreas.map((area, index) => {
              const themeColors = ["border-primary", "border-accent", "border-secondary", "border-destructive"];
              const currentColor = themeColors[index % 4];
              
              return (
                <motion.div 
                  key={`${area.id}-details`} 
                  id={`${area.id}-details`} 
                  className="scroll-mt-20"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div 
                      className={index % 2 === 0 ? "order-1" : "order-2"}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className="mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                          {area.title}
                        </h2>
                      </motion.div>
                      <motion.p 
                        className="text-lg text-muted-foreground mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        viewport={{ once: true }}
                      >
                        {area.description}
                      </motion.p>
                      <motion.p 
                        className="text-muted-foreground mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        viewport={{ once: true }}
                      >
                        {area.details}
                      </motion.p>
                      
                      <motion.div 
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                        viewport={{ once: true }}
                      >
                        <h3 className="text-xl font-semibold text-foreground mb-4">Key Activities:</h3>
                        <ul className="space-y-3">
                          {area.activities.map((activity, actIndex) => (
                            <motion.li 
                              key={actIndex} 
                              className="text-muted-foreground"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 1.2 + actIndex * 0.1 }}
                              viewport={{ once: true }}
                            >
                              {activity}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </motion.div>
                    
                    <motion.div 
                      className={index % 2 === 0 ? "order-2" : "order-1"}
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <Card className="relative h-80 overflow-hidden hover:shadow-lg transition-all duration-300 group bg-white/20 border border-white/30 backdrop-blur-sm">
                        <div 
                          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                          style={{ backgroundImage: `url(${area.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 p-6 text-white"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                          viewport={{ once: true }}
                        >
                          <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                          <p className="text-sm text-white/90 mb-4">{area.description}</p>
                          <motion.div 
                            className="bg-white/20 backdrop-blur-sm rounded-lg p-3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            viewport={{ once: true }}
                          >
                            <p className="text-xs text-white font-medium">
                              Impact: Contributing to better governance and policy outcomes in Uganda
                            </p>
                          </motion.div>
                        </motion.div>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
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
            <Button asChild size="lg" className="bg-white/20 text-white border border-white/30 hover:bg-white/30 shadow-lg">
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