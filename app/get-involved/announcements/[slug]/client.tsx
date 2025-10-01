"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Bell } from "lucide-react";
import { Announcement } from "@/lib/announcement-service";

interface AnnouncementDetailClientProps {
  relatedAnnouncements: Announcement[];
}

const AnnouncementDetailClient: React.FC<AnnouncementDetailClientProps> = ({ relatedAnnouncements }) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Related Announcements</h2>
          <p className="text-lg text-muted-foreground">
            Other announcements that might interest you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedAnnouncements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full flex flex-col bg-white/20 border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={`${getTypeColor(announcement.type)} backdrop-blur-sm border flex items-center gap-1`}>
                      <Bell className="w-3 h-3" />
                      {announcement.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{announcement.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(announcement.published_date)}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 line-clamp-3 flex-1">
                    {announcement.summary}
                  </p>
                  <Link href={`/get-involved/announcements/${announcement.slug}`} className="w-full">
                    <Button className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-900 border border-blue-600/30 backdrop-blur-sm font-medium flex items-center justify-center gap-2">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementDetailClient;
