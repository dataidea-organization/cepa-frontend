"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Bell, Calendar, AlertCircle, ExternalLink, ArrowRight, Filter } from "lucide-react";
import { Announcement } from "@/lib/announcement-service";

interface AnnouncementsClientProps {
  announcements: Announcement[];
  hasError: boolean;
}

const AnnouncementsClient: React.FC<AnnouncementsClientProps> = ({ announcements }) => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');

  const types = ['All', 'General', 'Event', 'Program', 'Partnership', 'Achievement', 'Policy', 'Urgent'];
  const priorities = ['All', 'low', 'medium', 'high', 'urgent'];

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

  const filteredAnnouncements = announcements.filter(announcement => {
    const typeMatch = selectedType === 'All' || announcement.type === selectedType;
    const priorityMatch = selectedPriority === 'All' || announcement.priority === selectedPriority;
    return typeMatch && priorityMatch;
  });

  return (
    <>
      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold">Filter by:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-muted-foreground">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border rounded-md bg-white/20 border-white/30 backdrop-blur-sm"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm text-muted-foreground">Priority</label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-4 py-2 border rounded-md bg-white/20 border-white/30 backdrop-blur-sm"
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              {filteredAnnouncements.length > 0 
                ? `Showing ${filteredAnnouncements.length} announcement${filteredAnnouncements.length !== 1 ? 's' : ''}`
                : "No announcements match your filters"}
            </p>
          </motion.div>

          {filteredAnnouncements.length > 0 ? (
            <div className="space-y-6">
              {filteredAnnouncements.map((announcement, index) => (
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
                  {selectedType !== 'All' || selectedPriority !== 'All' 
                    ? "Try adjusting your filters to see more announcements."
                    : "There are no active announcements at this time. Please check back later for updates."}
                </p>
                {(selectedType !== 'All' || selectedPriority !== 'All') && (
                  <Button 
                    onClick={() => {
                      setSelectedType('All');
                      setSelectedPriority('All');
                    }}
                    className="bg-[#800020] hover:bg-[#800020]/90 text-white border border-[#800020] backdrop-blur-sm font-medium"
                  >
                    Clear Filters
                  </Button>
                )}
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
