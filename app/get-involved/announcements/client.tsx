"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Bell, Calendar, AlertCircle, ExternalLink, ArrowRight } from "lucide-react";
import { Announcement } from "@/lib/announcement-service";

export interface AnnouncementDisplay extends Announcement {
  formattedPublishedDate: string;
  formattedExpiryDate?: string;
  expiringSoon: boolean;
}

interface AnnouncementsClientProps {
  announcements: AnnouncementDisplay[];
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="h-full p-0 gap-0 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
                    {/* Image Section */}
                    <div className="relative w-full h-44 flex-shrink-0 bg-gradient-to-br from-[#800020]/10 to-[#800020]/5">
                      {announcement.image ? (
                        <Image
                          src={announcement.image}
                          alt={announcement.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Bell className="w-12 h-12 text-[#800020]/30" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <Badge className={`${getTypeColor(announcement.type)} backdrop-blur-sm border flex items-center gap-1 text-xs`}>
                          <Bell className="w-3 h-3" />
                          {announcement.type}
                        </Badge>
                        {announcement.featured && (
                          <Badge className="bg-yellow-500/90 text-yellow-900 border-yellow-600 backdrop-blur-sm border text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <CardContent className="flex-1 p-5 flex flex-col">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <Badge className={`${getPriorityColor(announcement.priority)} backdrop-blur-sm border text-xs`}>
                          {announcement.priority.toUpperCase()}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          {announcement.formattedPublishedDate}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {announcement.title}
                      </h3>

                      <p className="text-muted-foreground text-sm line-clamp-3 mb-3 flex-1">
                        {announcement.summary}
                      </p>

                      {announcement.expiringSoon && announcement.formattedExpiryDate && (
                        <div className="flex items-center text-xs text-orange-600 mb-3">
                          <AlertCircle className="w-3.5 h-3.5 mr-1" />
                          Expires: {announcement.formattedExpiryDate}
                        </div>
                      )}

                      <div className="flex flex-col gap-2 mt-auto pt-2">
                        <Button asChild className="w-full bg-[#800020] hover:bg-[#800020]/90 text-white font-medium">
                          <Link href={`/get-involved/announcements/${announcement.slug}`}>
                            <ArrowRight className="w-4 h-4 mr-2" />
                            Read Full Announcement
                          </Link>
                        </Button>

                        {announcement.external_link && (
                          <Button asChild variant="outline" className="w-full border-[#800020] text-[#800020] hover:bg-[#800020]/10 font-medium">
                            <a href={announcement.external_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Visit External Link
                            </a>
                          </Button>
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
