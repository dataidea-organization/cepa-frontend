"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src="/hero/about-hero.jpg" 
          alt="About CEPA - Center for Policy Analysis"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              About CEPA
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto"
            >
              The Centre for Policy Analysis (CEPA) is a leading think tank in Uganda dedicated to shaping public policy and strengthening democratic governance through high-quality research, collaboration, and citizen engagement.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Who We Are
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              The Centre for Policy Analysis (CEPA) is a leading think tank in Uganda dedicated to shaping public policy and strengthening democratic governance through high-quality research, collaboration, and citizen engagement.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Evidence-Based Research</h3>
                    <p className="text-muted-foreground">We conduct rigorous, independent research to inform policy decisions and strengthen democratic governance in Uganda.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Collaborative Approach</h3>
                    <p className="text-muted-foreground">We work closely with parliamentarians, government officials, civil society, and citizens to drive meaningful reforms.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Parliament Watch Uganda</h3>
                    <p className="text-muted-foreground">Our flagship program empowers stakeholders to engage with legislative processes and promote transparency.</p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Button asChild size="lg" className="shadow-lg bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30">
                  <a href="/get-involved">Join Our Mission</a>
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white/20 border border-white/30 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-primary mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Years of Impact</div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white/20 border border-white/30 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-secondary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Policy Reports</div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white/20 border border-white/30 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-accent mb-2">100+</div>
                  <div className="text-sm text-muted-foreground">Stakeholders Engaged</div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white/20 border border-white/30 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-destructive mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Partner Organizations</div>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="py-16 bg-gradient-to-br from-blue-50 via-yellow-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              CEPA was established with a vision to create a more transparent, accountable, and democratic Uganda through rigorous policy research and advocacy.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white/20 border border-white/30 backdrop-blur-sm h-full flex flex-col">
                <CardHeader>
                  <div className="text-4xl mb-4">🎯</div>
                  <CardTitle className="text-xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center">
                  <CardDescription className="text-base">
                    To build a democratic society where governance systems and public institutions are transparent, accountable, and responsive to the needs of all citizens.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white/20 border border-white/30 backdrop-blur-sm h-full flex flex-col">
                <CardHeader>
                  <div className="text-4xl mb-4">⚖️</div>
                  <CardTitle className="text-xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center">
                  <CardDescription className="text-base">
                    To shape public policy and strengthen democratic governance by delivering high-quality research, fostering collaboration, and empowering citizens to engage meaningfully with decision-making processes.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white/20 border border-white/30 backdrop-blur-sm h-full flex flex-col">
                <CardHeader>
                  <div className="text-4xl mb-4">🌟</div>
                  <CardTitle className="text-xl">Our Values</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center">
                  <CardDescription className="text-base">
                    Integrity, independence, excellence, and commitment to democratic principles guide all our work and interactions.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What Sets CEPA Apart */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What Sets CEPA Apart
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              CEPA distinguishes itself through innovative approaches and collaborative methodologies that drive meaningful change in Uganda's governance landscape.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow bg-white/20 border border-white/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">A Unique Consortium Model</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    CEPA integrates the expertise and resources of various partner organizations, creating a robust platform for multi-disciplinary approaches to governance challenges.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow bg-white/20 border border-white/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-secondary">Thought Leadership and Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    We pioneer new methodologies and approaches to policy analysis, setting standards for evidence-based governance research in Uganda and beyond.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Meet the dedicated professionals who drive CEPA's mission of strengthening democratic governance and promoting evidence-based policy analysis in Uganda.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Executive Director */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden text-center hover:shadow-lg transition-all duration-300 bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 p-0">
                <div className="relative h-80 w-full">
                  <img 
                    src="/team-images/timothy-chemonges.jpg" 
                    alt="Chemonges M. Timothy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1 text-white">Chemonges M. Timothy</h3>
                    <p className="text-white/90 font-semibold mb-4">Executive Director</p>
                    <Button 
                      asChild 
                      size="sm" 
                      className="bg-white/20 text-white border border-white/30 hover:bg-white/30 hover:text-white transition-all"
                    >
                      <a href="https://www.linkedin.com/in/timothy-chemonges-1a47a4173/?originalSubdomain=ug" target="_blank" rel="noopener noreferrer">
                        See Profile
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Communication Manager */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden text-center hover:shadow-lg transition-all duration-300 bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 p-0">
                <div className="relative h-80 w-full">
                  <img 
                    src="/team-images/angella-kemirembe.jpg" 
                    alt="Angella Hilda Kemirembe"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1 text-white">Angella Hilda Kemirembe</h3>
                    <p className="text-white/90 font-semibold mb-4">Communication Manager</p>
                    <Button 
                      asChild 
                      size="sm" 
                      className="bg-white/20 text-white border border-white/30 hover:bg-white/30 hover:text-white transition-all"
                    >
                      <a href="https://ug.linkedin.com/in/angella-hilda-kemirembe-35111a9b" target="_blank" rel="noopener noreferrer">
                        See Profile
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Programmes Officer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden text-center hover:shadow-lg transition-all duration-300 bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 p-0">
                <div className="relative h-80 w-full">
                  <img 
                    src="/team-images/joseph-tahinduka.jpg" 
                    alt="Joseph Tahinduka"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1 text-white">Joseph Tahinduka</h3>
                    <p className="text-white/90 font-semibold mb-4">Programmes Officer</p>
                    <Button 
                      asChild 
                      size="sm" 
                      className="bg-white/20 text-white border border-white/30 hover:bg-white/30 hover:text-white transition-all"
                    >
                      <a href="https://www.linkedin.com/in/tahinduka-joseph-8ba5401b5/" target="_blank" rel="noopener noreferrer">
                        See Profile
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Programmes Associate - Rebecca */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden text-center hover:shadow-lg transition-all duration-300 bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 p-0">
                <div className="relative h-80 w-full">
                  <img 
                    src="/team-images/rebecca-karagwa.jpg" 
                    alt="Rebecca Karagwa"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1 text-white">Rebecca Karagwa</h3>
                    <p className="text-white/90 font-semibold mb-4">Programmes Associate</p>
                    <Button 
                      asChild 
                      size="sm" 
                      className="bg-white/20 text-white border border-white/30 hover:bg-white/30 hover:text-white transition-all"
                    >
                      <a href="https://www.linkedin.com/in/rebecca-karagwa-10a7b3133/" target="_blank" rel="noopener noreferrer">
                        See Profile
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Programme Associate - Thembo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden text-center hover:shadow-lg transition-all duration-300 bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 p-0">
                <div className="relative h-80 w-full">
                  <img 
                    src="/team-images/thembo-misairi.jpg" 
                    alt="Thembo Kahungu Misairi"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1 text-white">Thembo Kahungu Misairi</h3>
                    <p className="text-white/90 font-semibold mb-4">Programme Associate</p>
                    <Button 
                      asChild 
                      size="sm" 
                      className="bg-white/20 text-white border border-white/30 hover:bg-white/30 hover:text-white transition-all"
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        See Profile
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Programme Associate - Prisca */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden text-center hover:shadow-lg transition-all duration-300 bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 p-0">
                <div className="relative h-80 w-full">
                  <img 
                    src="/team-images/prisca-wanyenya.jpg" 
                    alt="Prisca Wanyenya"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1 text-white">Prisca Wanyenya</h3>
                    <p className="text-white/90 font-semibold mb-4">Programme Associate</p>
                    <Button 
                      asChild 
                      size="sm" 
                      className="bg-white/20 text-white border border-white/30 hover:bg-white/30 hover:text-white transition-all"
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        See Profile
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Programme Associate - Dominic */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden text-center hover:shadow-lg transition-all duration-300 bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 p-0">
                <div className="relative h-80 w-full">
                  <img 
                    src="/team-images/dominic-ochola.jpg" 
                    alt="Dominic Ochola"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1 text-white">Dominic Ochola</h3>
                    <p className="text-white/90 font-semibold mb-4">Programme Associate</p>
                    <Button 
                      asChild 
                      size="sm" 
                      className="bg-white/20 text-white border border-white/30 hover:bg-white/30 hover:text-white transition-all"
                    >
                      <a href="https://www.linkedin.com/in/dominic-ochola" target="_blank" rel="noopener noreferrer">
                        See Profile
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Production Lead - Rashid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden text-center hover:shadow-lg transition-all duration-300 bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 p-0">
                <div className="relative h-80 w-full">
                  <img 
                    src="/team-images/rashid-kasule.jpg" 
                    alt="Rashid Kasule"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1 text-white">Rashid Kasule</h3>
                    <p className="text-white/90 font-semibold mb-4">Production Lead</p>
                    <Button 
                      asChild 
                      size="sm" 
                      className="bg-white/20 text-white border border-white/30 hover:bg-white/30 hover:text-white transition-all"
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        See Profile
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Volunteer - Timothy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.0 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden text-center hover:shadow-lg transition-all duration-300 bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 p-0">
                <div className="relative h-80 w-full">
                  <img 
                    src="/team-images/timothy-ainebyoona.jpg" 
                    alt="Timothy Ainebyoona"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1 text-white">Timothy Ainebyoona</h3>
                    <p className="text-white/90 font-semibold mb-4">Volunteer</p>
                    <Button 
                      asChild 
                      size="sm" 
                      className="bg-white/20 text-white border border-white/30 hover:bg-white/30 hover:text-white transition-all"
                    >
                      <a href="http://www.LinkedIn.com/in/timothy-ainebyoona-31906a216" target="_blank" rel="noopener noreferrer">
                        See Profile
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Volunteer - Faith */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.2 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden text-center hover:shadow-lg transition-all duration-300 bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 p-0">
                <div className="relative h-80 w-full">
                  <img 
                    src="/team-images/faith-uwizeye.jpg" 
                    alt="Faith Uwizeye"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1 text-white">Faith Uwizeye</h3>
                    <p className="text-white/90 font-semibold mb-4">Volunteer</p>
                    <Button 
                      asChild 
                      size="sm" 
                      className="bg-white/20 text-white border border-white/30 hover:bg-white/30 hover:text-white transition-all"
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        See Profile
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Volunteer - Fraide */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.4 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden text-center hover:shadow-lg transition-all duration-300 bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 p-0">
                <div className="relative h-80 w-full">
                  <img 
                    src="/team-images/fraide-solomon.jpg" 
                    alt="Fraide Solomon"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1 text-white">Fraide Solomon</h3>
                    <p className="text-white/90 font-semibold mb-4">Volunteer</p>
                    <Button 
                      asChild 
                      size="sm" 
                      className="bg-white/20 text-white border border-white/30 hover:bg-white/30 hover:text-white transition-all"
                    >
                      <a href="https://www.linkedin.com/in/fraide-solomon-101491311" target="_blank" rel="noopener noreferrer">
                        See Profile
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30">
              <Link href="/get-involved/career">
                Join Our Team
              </Link>
            </Button>
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
            Join Us in Building a Better Uganda
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-12 max-w-4xl mx-auto"
          >
            Whether through research, advocacy, or direct engagement, there are many ways to contribute to our mission of strengthening democratic governance and promoting transparency in Uganda.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button asChild size="lg" className="bg-white/20 text-white border border-white/30 hover:bg-white/30 shadow-lg">
              <Link href="/get-involved#donate">
                Donate Now
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white/20 text-white border border-white/30 hover:bg-white/30 shadow-lg">
              <Link href="/get-involved#careers">
                Explore Careers
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;