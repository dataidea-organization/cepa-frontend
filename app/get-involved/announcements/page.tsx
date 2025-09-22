"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, FileText, ExternalLink, ArrowRight, Bell, Megaphone, AlertCircle, Check } from "lucide-react";

export default function AnnouncementsPage() {
  const announcements: any[] = [
    // {
    //   id: 1,
    //   title: "New Policy Research Fellowship Program Launch",
    //   type: "Program",
    //   priority: "high",
    //   date: "2024-03-15",
    //   time: "10:00 AM",
    //   location: "CEPA Office, Kampala",
    //   description: "We are excited to announce the launch of our new Policy Research Fellowship Program. This 12-month program offers emerging researchers the opportunity to work on cutting-edge governance research projects.",
    //   content: "The Policy Research Fellowship Program is designed to support early-career researchers in the field of governance and policy analysis. Fellows will receive mentorship from senior experts, access to our research network, and opportunities to publish their work. Applications are now open for the June 2024 cohort.",
    //   category: "Fellowship",
    //   isNew: true,
    //   isUrgent: false
    // },
  ];

  const announcementTypes = [
    {
      icon: FileText,
      title: "Programs",
      description: "Fellowship programs, training opportunities, and capacity building initiatives",
      color: "bg-blue-100 text-blue-600",
      count: 1
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Conferences, workshops, policy briefings, and networking events",
      color: "bg-green-100 text-green-600",
      count: 2
    },
    {
      icon: Bell,
      title: "Notices",
      description: "Office closures, policy updates, and important organizational announcements",
      color: "bg-yellow-100 text-yellow-600",
      count: 1
    },
    {
      icon: FileText,
      title: "Publications",
      description: "New research reports, policy briefs, and analytical publications",
      color: "bg-red-100 text-red-600",
      count: 1
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Program":
        return Users;
      case "Event":
        return Calendar;
      case "Notice":
        return AlertCircle;
      case "Publication":
        return FileText;
      case "Membership":
        return Users;
      default:
        return Bell;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Announcements
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Stay updated with the latest news, events, and important announcements from CEPA. Get notified about new programs, publications, and opportunities.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-900 border border-blue-600/30 backdrop-blur-sm font-medium px-8 py-3 rounded-md transition-all duration-200"
                >
                  Subscribe to Updates
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-gray-900 border border-white/30 backdrop-blur-sm font-medium px-8 py-3 rounded-md transition-all duration-200"
                >
                  View Archive
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Announcement Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Announcement Categories</h2>
            <p className="text-lg text-gray-600">Browse announcements by category</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {announcementTypes.length > 0 ? announcementTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Badge 
                  variant="secondary"
                  className="px-4 py-2 text-sm cursor-pointer transition-colors bg-secondary/20 text-secondary border border-secondary/30 hover:bg-secondary/30"
                >
                  {type.title}
                </Badge>
              </motion.div>
            )) : (
              <div className="text-center text-gray-600">
                No announcement types available at the moment.
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Recent Announcements Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Announcements</h2>
            <p className="text-lg text-gray-600">Latest updates and important information</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {announcements.length > 0 ? announcements.map((announcement, index) => {
              const TypeIcon = getTypeIcon(announcement.type);
              return (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card className="bg-white/20 border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <div className="flex items-center gap-2">
                              <TypeIcon className="w-5 h-5 text-gray-500" />
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                                {announcement.category}
                              </Badge>
                            </div>
                            <Badge className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(announcement.priority)}`}>
                              {announcement.priority.toUpperCase()} PRIORITY
                            </Badge>
                            {announcement.isNew && (
                              <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1 rounded-full text-sm font-medium">
                                NEW
                              </Badge>
                            )}
                            {announcement.isUrgent && (
                              <Badge className="bg-red-100 text-red-800 border-red-200 px-3 py-1 rounded-full text-sm font-medium">
                                URGENT
                              </Badge>
                            )}
                          </div>
                          
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">{announcement.title}</h3>
                          <p className="text-gray-600 mb-4 text-lg">{announcement.description}</p>
                          <p className="text-gray-700 mb-6">{announcement.content}</p>
                        </div>
                        
                        <div className="lg:w-80">
                          <div className="bg-white/30 border border-white/40 backdrop-blur-sm rounded-lg p-6">
                            <h4 className="font-semibold text-gray-900 mb-4">Event Details</h4>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-500">Date</p>
                                  <p className="font-medium text-gray-900">{announcement.date}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-500">Time</p>
                                  <p className="font-medium text-gray-900">{announcement.time}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-500">Location</p>
                                  <p className="font-medium text-gray-900">{announcement.location}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-6">
                              <Button className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-900 border border-blue-600/30 backdrop-blur-sm font-medium py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2">
                                Read More
                                <ArrowRight className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            }) : (
              <div className="text-center text-gray-600">
                No announcements available at the moment.
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-yellow-500 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white mb-6"
            >
              Stay Connected with CEPA
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              Don't miss out on important updates, new opportunities, and exclusive events. Stay informed and engaged with our community.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/get-involved/contact">
                  <Button
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm font-medium px-8 py-3 rounded-md transition-all duration-200"
                  >
                    Contact Us
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
