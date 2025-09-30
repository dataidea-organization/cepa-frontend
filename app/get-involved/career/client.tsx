"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MapPin, Users, Briefcase, GraduationCap, Award, Calendar, ArrowRight } from "lucide-react";
import { CareerOpportunity } from "@/lib/career-service";

interface CareerClientProps {
  opportunities: CareerOpportunity[];
  hasError: boolean;
}

const CareerClient: React.FC<CareerClientProps> = ({ opportunities }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Full-time':
      case 'Part-time':
        return <Briefcase className="w-5 h-5" />;
      case 'Internship':
        return <GraduationCap className="w-5 h-5" />;
      case 'Fellowship':
        return <Award className="w-5 h-5" />;
      case 'Consultancy':
        return <Users className="w-5 h-5" />;
      default:
        return <Briefcase className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-blue-500/20 text-blue-900 border-blue-500/30';
      case 'Internship':
        return 'bg-green-500/20 text-green-900 border-green-500/30';
      case 'Fellowship':
        return 'bg-purple-500/20 text-purple-900 border-purple-500/30';
      case 'Consultancy':
        return 'bg-orange-500/20 text-orange-900 border-orange-500/30';
      case 'Part-time':
        return 'bg-yellow-500/20 text-yellow-900 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-900 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      {/* Current Opportunities Section */}
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
              Current Opportunities
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              {opportunities.length > 0 
                ? `We have ${opportunities.length} open position${opportunities.length !== 1 ? 's' : ''} available.` 
                : "We're always looking for passionate individuals to join our team."}
            </p>
          </motion.div>

          {opportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map((opportunity, index) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="h-full flex flex-col bg-white/20 border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={`${getTypeColor(opportunity.type)} backdrop-blur-sm border flex items-center gap-1`}>
                          {getTypeIcon(opportunity.type)}
                          {opportunity.type}
                        </Badge>
                        {opportunity.featured && (
                          <Badge className="bg-yellow-500/20 text-yellow-900 border-yellow-500/30 backdrop-blur-sm border">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          {opportunity.location}
                        </div>
                        {opportunity.department && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Briefcase className="w-4 h-4 mr-2" />
                            {opportunity.department}
                          </div>
                        )}
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          Deadline: {formatDate(opportunity.deadline)}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6 line-clamp-3 flex-1">
                        {opportunity.description}
                      </p>
                      <Link href={`/get-involved/career/${opportunity.slug}`} className="w-full">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Card className="p-12 text-center bg-white/20 border border-white/30 backdrop-blur-sm">
                <div className="text-6xl mb-6">📋</div>
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  No Current Openings
                </h3>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  We don&apos;t have any open positions at the moment, but we&apos;re always interested in hearing from talented individuals who share our passion for governance and policy research.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                    <Briefcase className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">Full-time Positions</h4>
                    <p className="text-sm text-muted-foreground">
                      Policy analysts, researchers, communications specialists, and administrative roles.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-secondary/10 rounded-lg border border-secondary/20">
                    <GraduationCap className="w-8 h-8 text-secondary mx-auto mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">Internships</h4>
                    <p className="text-sm text-muted-foreground">
                      Research internships, communications internships, and program support roles.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-accent/10 rounded-lg border border-accent/20">
                    <Award className="w-8 h-8 text-accent mx-auto mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">Fellowships</h4>
                    <p className="text-sm text-muted-foreground">
                      Research fellowships for experienced professionals and academics.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-destructive/10 rounded-lg border border-destructive/20">
                    <Users className="w-8 h-8 text-destructive mx-auto mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">Consultancies</h4>
                    <p className="text-sm text-muted-foreground">
                      Short-term consultancies for specific projects and research initiatives.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20" style={{background: 'linear-gradient(to right, rgb(30 64 175), rgb(245 158 11), rgb(16 185 129), rgb(239 68 68))'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Make a Difference?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-12 max-w-4xl mx-auto"
          >
            {opportunities.length > 0 
              ? "Join us in strengthening governance and democracy across Uganda and East Africa. Your contribution matters."
              : "Even though we don't have open positions right now, we're always interested in connecting with passionate individuals who share our commitment to strengthening governance and democracy in Uganda."}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button asChild size="lg" className="bg-white/20 text-white border border-white/30 hover:bg-white/30 shadow-lg">
              <Link href="/get-involved">
                Get Involved
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white/20 text-white border border-white/30 hover:bg-white/30 shadow-lg">
              <Link href="/about">
                Learn About CEPA
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CareerClient;
