"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react";
import { EventsService, Event } from "@/lib/events-service";

interface EventDetailPageProps {
  params: {
    slug: string;
  };
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ params }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Fetch the specific event by slug
        const foundEvent = await EventsService.getEventBySlug(params.slug);
        if (foundEvent) {
          setEvent(foundEvent);
          // Fetch related events
          const related = await EventsService.getRelatedEvents(foundEvent.id, 3);
          setRelatedEvents(related);
        } else {
          setError('Event not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching event:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-muted-foreground">Loading event...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-8">
            {error || "The requested event could not be found."}
          </p>
          <Button asChild className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-900 border border-blue-600/30 backdrop-blur-sm font-medium py-2 px-4 rounded-md transition-all duration-200">
            <Link href="/resources/events-and-activities">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Link>
          </Button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src={event.image || '/events/default-event.jpg'} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Badge className={`${getCategoryColor(event.category)} text-sm`}>
                {event.category}
              </Badge>
              <Badge className={`${getStatusColor(event.status)} text-sm`}>
                {event.status}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {event.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {event.time}
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {event.location}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button asChild className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-900 border border-blue-600/30 backdrop-blur-sm font-medium py-2 px-4 rounded-md transition-all duration-200 mb-8">
              <Link href="/resources/events">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <article 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:p-6 prose-blockquote:rounded-r-lg"
                dangerouslySetInnerHTML={{ __html: event.content || event.description }}
              />
            </div>
            
            <div className="space-y-8">
              {/* Event Details */}
              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Event Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-3 text-muted-foreground" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-3 text-muted-foreground" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-3 text-muted-foreground" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-3 text-muted-foreground" />
                    <span className="text-sm">{event.category}</span>
                  </div>
                </div>
              </div>

              {/* Speakers */}
              {event.speakers && (
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Speakers</h3>
                  <ul className="space-y-2">
                    {event.speakers.map((speaker, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {speaker}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Agenda */}
              {event.agenda && (
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Agenda</h3>
                  <ul className="space-y-2">
                    {event.agenda.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Registration/Contact */}
              <div className="bg-primary/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Get Involved</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {event.status === "upcoming" 
                    ? "Interested in attending this event? Contact us for registration details."
                    : "Missed this event? Stay tuned for similar opportunities in the future."
                  }
                </p>
                <Button asChild className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-900 border border-blue-600/30 backdrop-blur-sm font-medium py-2 px-4 rounded-md transition-all duration-200">
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Related Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedEvents.map((relatedEvent, index) => {
                const themeColors = ["border-primary", "border-secondary", "border-accent", "border-destructive"];
                const currentColor = themeColors[index % 4];
                
                return (
                  <div key={relatedEvent.id} className="relative h-80 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group bg-white/20 border border-white/30 backdrop-blur-sm">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${relatedEvent.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={`${getCategoryColor(relatedEvent.category)} text-xs`}>
                        {relatedEvent.category}
                      </Badge>
                      <Badge className={`${getStatusColor(relatedEvent.status)} text-xs`}>
                        {relatedEvent.status}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">
                        {relatedEvent.title}
                      </h3>
                      <p className="text-sm text-white/90 mb-3">
                        {relatedEvent.date}
                      </p>
                      <Button asChild size="sm" className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm font-medium py-1 px-3 rounded-md transition-all duration-200">
                        <Link href={`/resources/events-and-activities/${relatedEvent.slug}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetailPage;
