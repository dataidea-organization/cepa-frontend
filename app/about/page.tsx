"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src="/hero/about-hero.jpg" 
          alt="About CEPA - Centre for Policy Analysis"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About CEPA
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto">
              The Centre for Policy Analysis (CEPA) is a leading think tank in Uganda dedicated to shaping public policy and strengthening democratic governance through high-quality research, collaboration, and citizen engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Who We Are
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              The Centre for Policy Analysis (CEPA) is a leading think tank in Uganda dedicated to shaping public policy and strengthening democratic governance through high-quality research, collaboration, and citizen engagement.
            </p>
          </div>
          
          <div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16"
          >
            <div
            >
              <div className="space-y-6">
                <div 
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Evidence-Based Research</h3>
                    <p className="text-muted-foreground">We conduct rigorous, independent research to inform policy decisions and strengthen democratic governance in Uganda.</p>
                  </div>
                </div>
                
                <div 
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Collaborative Approach</h3>
                    <p className="text-muted-foreground">We work closely with parliamentarians, government officials, civil society, and citizens to drive meaningful reforms.</p>
                  </div>
                </div>
                
                <div 
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Parliament Watch Uganda</h3>
                    <p className="text-muted-foreground">Our flagship program empowers stakeholders to engage with legislative processes and promote transparency.</p>
                  </div>
                </div>
              </div>
              
              <div
                className="mt-8"
              >
                <Button asChild size="lg" className="shadow-lg bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90">
                  <a href="/get-involved">Join Our Mission</a>
                </Button>
              </div>
            </div>
            
            <div 
              className="grid grid-cols-2 gap-6"
            >
              <div
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white/20 border border-white/30 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-primary mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Years of Impact</div>
                </Card>
              </div>
              <div
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white/20 border border-white/30 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-secondary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Policy Reports</div>
                </Card>
              </div>
              <div
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white/20 border border-white/30 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-accent mb-2">100+</div>
                  <div className="text-sm text-muted-foreground">Stakeholders Engaged</div>
                </Card>
              </div>
              <div
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white/20 border border-white/30 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-destructive mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Partner Organizations</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="py-16 bg-gradient-to-br from-blue-50 via-yellow-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              CEPA was established with a vision to create a more transparent, accountable, and democratic Uganda through rigorous policy research and advocacy.
            </p>
          </div>
          
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div
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
            </div>
            
            <div
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
            </div>
            
            <div
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
            </div>
          </div>
        </div>
      </section>

      {/* What Sets CEPA Apart */}
      <section id="what-sets-cepa-apart" className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What Sets CEPA Apart
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              CEPA distinguishes itself through innovative approaches and collaborative methodologies that drive meaningful change in Uganda's governance landscape.
            </p>
          </div>
          
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div
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
            </div>
            
            <div
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
            </div>
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section id="our-partners" className="py-20 bg-gradient-to-br from-blue-50 via-yellow-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Partners
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              We work with a diverse network of organizations, institutions, and stakeholders to advance our mission of strengthening democratic governance and promoting evidence-based policy analysis.
            </p>
          </div>
          
          <div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 items-center"
          >
            {/* GRSP */}
            <div
              className="w-full h-full"
            >
              <div className="bg-white/20 border border-white/30 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all duration-300 shadow-md hover:shadow-lg w-full h-full flex items-center justify-center min-h-[200px]">
                <img 
                  src="/partners/grsp.png" 
                  alt="Global Road Safety Partnership" 
                  className="h-16 w-auto object-contain mx-auto"
                />
              </div>
            </div>

            {/* UPFYA */}
            <div
              className="w-full h-full"
            >
              <div className="bg-white/20 border border-white/30 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all duration-300 shadow-md hover:shadow-lg w-full h-full flex items-center justify-center min-h-[200px]">
                <img 
                  src="/partners/upfya.jpg" 
                  alt="Uganda Parliamentary Forum for Youth Affairs" 
                  className="h-16 w-auto object-contain mx-auto"
                />
              </div>
            </div>

            {/* Twaweza */}
            <div
              className="w-full h-full"
            >
              <div className="bg-white/20 border border-white/30 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all duration-300 shadow-md hover:shadow-lg w-full h-full flex items-center justify-center min-h-[200px]">
                <img 
                  src="/partners/twaweza.png" 
                  alt="Twaweza East Africa" 
                  className="h-16 w-auto object-contain mx-auto"
                />
              </div>
            </div>

            {/* WFD */}
            <div
              className="w-full h-full"
            >
              <div className="bg-white/20 border border-white/30 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all duration-300 shadow-md hover:shadow-lg w-full h-full flex items-center justify-center min-h-[200px]">
                <img 
                  src="/partners/wfd.png" 
                  alt="Westminster Foundation for Democracy" 
                  className="h-16 w-auto object-contain mx-auto"
                />
              </div>
            </div>

            {/* KAS */}
            <div
              className="w-full h-full"
            >
              <div className="bg-white/20 border border-white/30 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all duration-300 shadow-md hover:shadow-lg w-full h-full flex items-center justify-center min-h-[200px]">
                <img 
                  src="/partners/kas.png" 
                  alt="Konrad-Adenauer-Stiftung" 
                  className="h-16 w-auto object-contain mx-auto"
                />
              </div>
            </div>

            {/* GAPP */}
            <div
              className="w-full h-full"
            >
              <div className="bg-white/20 border border-white/30 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all duration-300 shadow-md hover:shadow-lg w-full h-full flex items-center justify-center min-h-[200px]">
                <img 
                  src="/partners/gapp.jpeg" 
                  alt="Global Action for Policy and Practice" 
                  className="h-16 w-auto object-contain mx-auto"
                />
              </div>
            </div>

            {/* Diakonia */}
            <div
              className="w-full h-full"
            >
              <div className="bg-white/20 border border-white/30 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all duration-300 shadow-md hover:shadow-lg w-full h-full flex items-center justify-center min-h-[200px]">
                <img 
                  src="/partners/diakonia.jpeg" 
                  alt="Diakonia" 
                  className="h-16 w-auto object-contain mx-auto"
                />
              </div>
            </div>

            {/* NED */}
            <div
              className="w-full h-full"
            >
              <div className="bg-white/20 border border-white/30 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all duration-300 shadow-md hover:shadow-lg w-full h-full flex items-center justify-center min-h-[200px]">
                <img 
                  src="/partners/ned.jpeg" 
                  alt="National Endowment for Democracy" 
                  className="h-16 w-auto object-contain mx-auto"
                />
              </div>
            </div>

            {/* AFIDEP */}
            <div
              className="w-full h-full"
            >
              <div className="bg-white/20 border border-white/30 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all duration-300 shadow-md hover:shadow-lg w-full h-full flex items-center justify-center min-h-[200px]">
                <img 
                  src="/partners/afidep.jpg" 
                  alt="African Institute for Development Policy" 
                  className="h-16 w-auto object-contain mx-auto"
                />
              </div>
            </div>
          </div>

          <div 
            className="text-center mt-12"
          >
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our partnerships enable us to leverage diverse expertise, resources, and networks to create meaningful impact in Uganda's governance landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section id="our-team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Meet the dedicated professionals who drive CEPA's mission of strengthening democratic governance and promoting evidence-based policy analysis in Uganda.
            </p>
          </div>
          
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Executive Director */}
            <div
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
            </div>

            {/* Communication Manager */}
            <div
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
            </div>

            {/* Programmes Officer */}
            <div
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
            </div>

            {/* Programmes Associate - Rebecca */}
            <div
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
            </div>

            {/* Programme Associate - Thembo */}
            <div
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
            </div>

            {/* Programme Associate - Prisca */}
            <div
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
            </div>

            {/* Programme Associate - Dominic */}
            <div
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
            </div>

            {/* Production Lead - Rashid */}
            <div
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
            </div>

            {/* Volunteer - Timothy */}
            <div
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
            </div>

            {/* Volunteer - Faith */}
            <div
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
            </div>

            {/* Volunteer - Fraide */}
            <div
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
            </div>
          </div>

          <div
            className="text-center mt-12"
          >
            <Button asChild size="lg" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90">
              <Link href="/get-involved/career">
                Join Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20" style={{background: 'linear-gradient(to right, rgb(30 64 175), rgb(245 158 11), rgb(16 185 129), rgb(239 68 68))'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Join Us in Building a Better Uganda
          </h2>
          <p 
            className="text-xl text-white/90 mb-12 max-w-4xl mx-auto"
          >
            Whether through research, advocacy, or direct engagement, there are many ways to contribute to our mission of strengthening democratic governance and promoting transparency in Uganda.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button asChild size="lg" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90 shadow-lg">
              <Link href="/get-involved/donate">
                Support Us
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-[#800020]/20 text-white border border-[#800020] hover:bg-[#800020]/30 shadow-lg backdrop-blur-sm">
              <Link href="/get-involved/career">
                Explore Careers
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;