"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Bell, Calendar, AlertCircle, ExternalLink, ArrowRight } from "lucide-react";
import { Announcement } from "@/lib/announcement-service";

interface AnnouncementsClientProps {
  announcements: Announcement[];
  hasError: boolean;
}

const AnnouncementsClient: React.FC<AnnouncementsClientProps> = ({ announcements }) => {

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'General':
        return 'bg-blue-500/20 text-blue-900 border-blue-500/30';
      case 'Event':
        return 'bg-green-500/20 text-green-900 border-green-500/30';
      case 'Program':
        return 'bg-purple-500/20 text-purple-900 border-purple-500/30';
      case 'Partnership':
        return 'bg-orange-500/20 text-orange-900 border-orange-500/30';
      case 'Achievement':
        return 'bg-yellow-500/20 text-yellow-900 border-yellow-500/30';
      case 'Policy':
        return 'bg-indigo-500/20 text-indigo-900 border-indigo-500/30';
      case 'Urgent':
        return 'bg-red-500/20 text-red-900 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-900 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500/20 text-red-900 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-900 border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-900 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-900 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-900 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry >= 0;
  };

  return (
    <>

      {/* Announcements Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Current Announcements
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              {announcements.length > 0
                ? `Showing ${announcements.length} announcement${announcements.length !== 1 ? 's' : ''}`
                : "No announcements available"}
            </p>
          </motion.div>

          {announcements.length > 0 ? (
            <div className="space-y-6">
              {announcements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card className="bg-white/20 border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
                    <CardHeader>
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={`${getTypeColor(announcement.type)} backdrop-blur-sm border flex items-center gap-1`}>
                            <Bell className="w-3 h-3" />
                            {announcement.type}
                          </Badge>
                          <Badge className={`${getPriorityColor(announcement.priority)} backdrop-blur-sm border`}>
                            {announcement.priority.toUpperCase()}
                          </Badge>
                          {announcement.featured && (
                            <Badge className="bg-yellow-500/20 text-yellow-900 border-yellow-500/30 backdrop-blur-sm border">
                              Featured
                            </Badge>
                          )}
                          {isExpiringSoon(announcement.expiry_date) && (
                            <Badge className="bg-orange-500/20 text-orange-900 border-orange-500/30 backdrop-blur-sm border flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              Expiring Soon
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(announcement.published_date)}
                        </div>
                      </div>
                      
                      <CardTitle className="text-2xl">{announcement.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        {announcement.summary}
                      </p>
                      
                      {announcement.expiry_date && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Valid until: {formatDate(announcement.expiry_date)}
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-3">
                        <Link href={`/get-involved/announcements/${announcement.slug}`}>
                          <Button className="bg-[#800020] hover:bg-[#800020]/90 text-white border border-[#800020] backdrop-blur-sm font-medium flex items-center gap-2">
                            Read More
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                        
                        {announcement.external_link && (
                          <a href={announcement.external_link} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="border-[#800020] text-white hover:bg-[#800020]/10 backdrop-blur-sm flex items-center gap-2">
                              External Link
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </a>
                        )}
                      </div>
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
                <div className="text-6xl mb-6">📢</div>
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  No Announcements Found
                </h3>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  There are no announcements at this time. Please check back later for updates.
                </p>
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
            Stay Updated
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-12 max-w-4xl mx-auto"
          >
            Subscribe to our newsletter to receive the latest announcements and updates directly to your inbox.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button asChild size="lg" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90 shadow-lg">
              <Link href="/get-involved">
                Explore More Ways to Get Involved
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AnnouncementsClient;
