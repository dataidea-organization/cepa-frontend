"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

const Events: React.FC = () => {
  const events = [
    {
      id: "uganda-road-safety-conference-2025",
      title: "Driving Policy into Action: CEPA Co-Convenes the 2025 Uganda Road Safety Conference",
      date: "May 14-15, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Kampala, Uganda",
      category: "Conference",
      description: "From 14–15 May 2025, CEPA co-convened the Uganda Road Safety Conference, bringing together policymakers, civil society organizations, and road safety experts to discuss innovative approaches to reducing road traffic accidents and fatalities in Uganda.",
      image: "/events/road-safety-conference.jpg",
      slug: "uganda-road-safety-conference-2025",
      featured: true,
      status: "upcoming"
    },
    {
      id: "neapacoh-meeting-tanzania-2025",
      title: "Championing SRHR through Legislative Engagement: CEPA at the 16th NEAPACOH Meeting in Tanzania",
      date: "March 5-8, 2025",
      time: "8:00 AM - 6:00 PM",
      location: "Dar es Salaam, Tanzania",
      category: "Meeting",
      description: "CEPA participated in the 16th NEAPACOH meeting from 5th to 8th March 2025, focusing on sexual and reproductive health rights (SRHR) advocacy and legislative engagement across East and Central Africa.",
      image: "/events/neapacoh-meeting.jpg",
      slug: "neapacoh-meeting-tanzania-2025",
      featured: true,
      status: "upcoming"
    },
    {
      id: "ethiopia-civil-society-workshop-2024",
      title: "Bridging Borders, Deepening Democracy: CEPA's Experience-Sharing at the Ethiopia Civil Society Engagement Workshop",
      date: "November 19, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Addis Ababa, Ethiopia",
      category: "Workshop",
      description: "CEPA joined regional civil society leaders in Ethiopia for a comprehensive workshop on democratic engagement, policy advocacy, and cross-border collaboration in East Africa.",
      image: "/events/ethiopia-workshop.jpg",
      slug: "ethiopia-civil-society-workshop-2024",
      featured: false,
      status: "completed"
    },
    {
      id: "africa-road-safety-seminar-2024",
      title: "The Africa Road Safety Seminar 2024 in Nairobi, Kenya",
      date: "October 21, 2024",
      time: "8:30 AM - 5:30 PM",
      location: "Nairobi, Kenya",
      category: "Seminar",
      description: "Being half way through the African Road Safety Action Plan, this seminar brought together road safety stakeholders from across the continent to assess progress and chart the way forward for safer roads in Africa.",
      image: "/events/africa-road-safety-seminar.jpg",
      slug: "africa-road-safety-seminar-2024",
      featured: false,
      status: "completed"
    },
    {
      id: "speed-management-validation-meetings-2024",
      title: "Speed Management in Uganda: Insights from the validation meetings on the speed regulations",
      date: "August 5, 2024",
      time: "10:00 AM - 3:00 PM",
      location: "Kampala, Uganda",
      category: "Validation Meeting",
      description: "In an effort to strengthen the road safety policy framework, CEPA facilitated validation meetings to review and refine speed management regulations for Uganda's road network.",
      image: "/events/speed-management-meeting.jpg",
      slug: "speed-management-validation-meetings-2024",
      featured: false,
      status: "completed"
    },
    {
      id: "youth-policy-advocacy-training-2024",
      title: "Youth Policy Advocacy Training Workshop",
      date: "July 15-17, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Kampala, Uganda",
      category: "Training",
      description: "A comprehensive training program designed to equip young people with the skills and knowledge needed to effectively engage in policy advocacy and legislative processes.",
      image: "/events/youth-training.jpg",
      slug: "youth-policy-advocacy-training-2024",
      featured: false,
      status: "completed"
    },
    {
      id: "parliamentary-oversight-seminar-2024",
      title: "Strengthening Parliamentary Oversight: A Regional Seminar",
      date: "June 10-12, 2024",
      time: "8:30 AM - 5:00 PM",
      location: "Kampala, Uganda",
      category: "Seminar",
      description: "This regional seminar brought together parliamentarians and civil society representatives to discuss best practices in parliamentary oversight and accountability mechanisms.",
      image: "/events/parliamentary-oversight.jpg",
      slug: "parliamentary-oversight-seminar-2024",
      featured: false,
      status: "completed"
    },
    {
      id: "digital-rights-conference-2024",
      title: "Digital Rights and Data Protection Conference 2024",
      date: "May 20-22, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Kampala, Uganda",
      category: "Conference",
      description: "A comprehensive conference exploring digital rights, data protection, and cybersecurity challenges in Uganda and the broader East African region.",
      image: "/events/digital-rights-conference.jpg",
      slug: "digital-rights-conference-2024",
      featured: false,
      status: "completed"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Conference": "bg-primary/10 text-primary border-primary",
      "Meeting": "bg-secondary/10 text-secondary border-secondary",
      "Workshop": "bg-accent/10 text-accent border-accent",
      "Seminar": "bg-destructive/10 text-destructive border-destructive",
      "Training": "bg-primary/10 text-primary border-primary",
      "Validation Meeting": "bg-secondary/10 text-secondary border-secondary"
    };
    return colors[category] || "bg-muted text-muted-foreground border-muted";
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      "upcoming": "bg-green-100 text-green-800 border-green-200",
      "completed": "bg-blue-100 text-blue-800 border-blue-200",
      "cancelled": "bg-red-100 text-red-800 border-red-200"
    };
    return colors[status] || "bg-muted text-muted-foreground border-muted";
  };

  const upcomingEvents = events.filter(event => event.status === "upcoming");
  const pastEvents = events.filter(event => event.status === "completed");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src="/hero/events-hero.jpg" 
          alt="Events & Activities - CEPA"
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
              Events & Activities
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Join CEPA at conferences, workshops, seminars, and training programs that advance policy analysis, governance, and civic engagement across Uganda and East Africa.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Upcoming Events
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Don't miss these important upcoming events and opportunities to engage with CEPA's work.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => {
                return (
                  <Card key={event.id} className="relative h-96 overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white/20 border border-white/30 backdrop-blur-sm">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${event.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={`${getCategoryColor(event.category)} text-xs`}>
                        {event.category}
                      </Badge>
                      <Badge className={`${getStatusColor(event.status)} text-xs`}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h3>
                      <div className="flex items-center text-sm text-white/90 mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-white/90 mb-2">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-white/90 mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <p className="text-sm text-white/80 mb-4 line-clamp-2">{event.description}</p>
                      <Button asChild size="sm" variant="outline" className="bg-white/20 text-white border border-white/30 hover:bg-white/30">
                        <Link href={`/resources/events/${event.slug}`} className="text-black">
                          Learn More
                        </Link>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Past Events
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Explore our recent events, workshops, and conferences that have shaped policy discourse and civic engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => {
              return (
                <Card key={event.id} className="relative h-96 overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white/20 border border-white/30 backdrop-blur-sm">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${event.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={`${getCategoryColor(event.category)} text-xs`}>
                      {event.category}
                    </Badge>
                    <Badge className={`${getStatusColor(event.status)} text-xs`}>
                      {event.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h3>
                    <div className="flex items-center text-sm text-white/90 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-white/90 mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-white/90 mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <p className="text-sm text-white/80 mb-4 line-clamp-2">{event.description}</p>
                    <Button asChild size="sm" variant="outline" className="bg-white/20 text-white border border-white/30 hover:bg-white/30">
                      <Link href={`/resources/events/${event.slug}`} className="text-white">
                        View Details
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20" style={{background: 'linear-gradient(to right, rgb(30 64 175), rgb(245 158 11), rgb(16 185 129), rgb(239 68 68))'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stay Connected
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-4xl mx-auto">
            Subscribe to our newsletter to receive updates about upcoming events, workshops, and opportunities to engage with CEPA's work.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-white/20 text-white border border-white/30 hover:bg-white/30 shadow-lg">
              <Link href="/get-involved#newsletter">
                Subscribe to Updates
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white/20 text-white border border-white/30 hover:bg-white/30 shadow-lg">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
