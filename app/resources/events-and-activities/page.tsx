"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { EventsService } from "@/lib/events-service";
import { usePaginatedList } from "@/hooks/use-paginated-list";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { FilterDropdown } from "@/components/FilterDropdown";

const Events: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryFilter = selectedCategory === "All" ? undefined : selectedCategory;

  const fetchUpcomingPage = useCallback(
    (page: number) =>
      EventsService.getEventsPage(page, undefined, {
        status: "upcoming",
        category: categoryFilter,
      }),
    [categoryFilter]
  );

  const fetchPastPage = useCallback(
    (page: number) =>
      EventsService.getEventsPage(page, undefined, {
        status: "completed",
        category: categoryFilter,
      }),
    [categoryFilter]
  );

  const {
    items: visibleUpcomingEvents,
    hasMore: hasMoreUpcoming,
    loadMore: loadMoreUpcoming,
    visibleCount: upcomingVisibleCount,
    totalCount: upcomingTotalCount,
    loading: loadingUpcoming,
    loadingMore: loadingMoreUpcoming,
    error: upcomingError,
  } = usePaginatedList({
    fetchPage: fetchUpcomingPage,
    resetKey: `${selectedCategory}-upcoming`,
  });

  const {
    items: visiblePastEvents,
    hasMore: hasMorePast,
    loadMore: loadMorePast,
    visibleCount: pastVisibleCount,
    totalCount: pastTotalCount,
    loading: loadingPast,
    loadingMore: loadingMorePast,
    error: pastError,
  } = usePaginatedList({
    fetchPage: fetchPastPage,
    resetKey: `${selectedCategory}-past`,
  });

  const loading = loadingUpcoming || loadingPast;
  const error = upcomingError || pastError;

  useEffect(() => {
    EventsService.getCategories()
      .then((cats) => {
        const uniqueCategories = [...new Set(cats.filter((cat: string) => cat))];
        setCategories(["All", ...uniqueCategories]);
      })
      .catch((err) => console.error("Error fetching event categories:", err));
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch {
      return timeString;
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-muted-foreground">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-destructive mb-4">Error loading events: {error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (!loading && visibleUpcomingEvents.length === 0 && visiblePastEvents.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">No Events Available</h1>
          <p className="text-xl text-muted-foreground mb-8">There are currently no events to display. Please check back later.</p>
          <Button onClick={() => window.location.reload()}>Refresh Page</Button>
        </div>
      </div>
    );
  }

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

      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center sm:justify-end">
          <FilterDropdown
            label="Event category"
            value={selectedCategory}
            options={categories}
            onChange={setSelectedCategory}
          />
        </div>
      </section>

      {/* Upcoming Events */}
      {visibleUpcomingEvents.length > 0 && (
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
                {selectedCategory === "All" ? "Upcoming Events" : `Upcoming ${selectedCategory} Events`}
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Don't miss these important upcoming events and opportunities to engage with CEPA's work.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleUpcomingEvents.map((event, index) => {
                return (
                  <Card key={event.id} className="relative h-96 overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white/20 border border-white/30 backdrop-blur-sm">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${event.image || '/events/default-event.jpg'})` }}
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
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center text-sm text-white/90 mb-2">
                        <Clock className="w-4 h-4 mr-2" />
                        {formatTime(event.time)}
                      </div>
                      <div className="flex items-center text-sm text-white/90 mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <p className="text-sm text-white/80 mb-4 line-clamp-2">{event.description}</p>
                      <Button asChild size="sm" variant="outline" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90">
                        <Link href={`/resources/events-and-activities/${event.slug}`} className="text-black">
                          Learn More
                        </Link>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>

            <LoadMoreButton
              onClick={loadMoreUpcoming}
              hasMore={hasMoreUpcoming}
              visibleCount={upcomingVisibleCount}
              totalCount={upcomingTotalCount}
              loading={loadingMoreUpcoming}
            />
          </div>
        </section>
      )}

      {/* Past Events */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {selectedCategory === "All" ? "Past Events" : `Past ${selectedCategory} Events`}
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Explore our recent events, workshops, and conferences that have shaped policy discourse and civic engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePastEvents.map((event, index) => {
              return (
                <Card key={event.id} className="relative h-96 overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white/20 border border-white/30 backdrop-blur-sm">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${event.image || '/events/default-event.jpg'})` }}
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
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-sm text-white/90 mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      {formatTime(event.time)}
                    </div>
                    <div className="flex items-center text-sm text-white/90 mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <p className="text-sm text-white/80 mb-4 line-clamp-2">{event.description}</p>
                    <Button asChild size="sm" variant="outline" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90">
                      <Link href={`/resources/events-and-activities/${event.slug}`} className="text-white">
                        View Details
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          <LoadMoreButton
            onClick={loadMorePast}
            hasMore={hasMorePast}
            visibleCount={pastVisibleCount}
            totalCount={pastTotalCount}
            loading={loadingMorePast}
          />
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
            <Button asChild size="lg" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90 shadow-lg">
              <Link href="/get-involved#newsletter">
                Subscribe to Updates
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-[#800020] text-white border border-[#800020] hover:bg-[#800020]/90 shadow-lg">
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
