import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react";

interface EventDetailPageProps {
  params: {
    slug: string;
  };
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ params }) => {
  // Events data - in a real app, this would come from a CMS or API
  const events = {
    "uganda-road-safety-conference-2025": {
      id: "uganda-road-safety-conference-2025",
      title: "Driving Policy into Action: CEPA Co-Convenes the 2025 Uganda Road Safety Conference",
      date: "May 14-15, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Kampala, Uganda",
      category: "Conference",
      status: "upcoming",
      image: "/events/road-safety-conference.jpg",
      description: "From 14–15 May 2025, CEPA co-convened the Uganda Road Safety Conference, bringing together policymakers, civil society organizations, and road safety experts to discuss innovative approaches to reducing road traffic accidents and fatalities in Uganda.",
      content: `
        <h2>Event Overview</h2>
        <p>The Uganda Road Safety Conference 2025 represents a critical milestone in the country's efforts to address the growing challenge of road traffic accidents. This two-day conference brings together key stakeholders from government, civil society, academia, and the private sector to develop comprehensive strategies for improving road safety across Uganda.</p>
        
        <h3>Conference Objectives</h3>
        <ul>
          <li>Review current road safety policies and their implementation</li>
          <li>Identify gaps in road safety legislation and enforcement</li>
          <li>Share best practices from regional and international experiences</li>
          <li>Develop actionable recommendations for policy makers</li>
          <li>Strengthen partnerships between government and civil society</li>
        </ul>
        
        <h3>Key Topics</h3>
        <ul>
          <li>Speed management and enforcement strategies</li>
          <li>Road infrastructure safety improvements</li>
          <li>Vehicle safety standards and regulations</li>
          <li>Driver education and licensing reforms</li>
          <li>Emergency response and post-crash care</li>
          <li>Data collection and monitoring systems</li>
        </ul>
        
        <h3>Target Audience</h3>
        <p>This conference is designed for:</p>
        <ul>
          <li>Government officials and policymakers</li>
          <li>Civil society organizations</li>
          <li>Road safety experts and researchers</li>
          <li>Transport sector representatives</li>
          <li>International development partners</li>
          <li>Media and communication professionals</li>
        </ul>
        
        <h3>Registration Information</h3>
        <p>Registration for the conference is now open. Please contact CEPA for more information about registration fees and requirements. Limited spaces are available, so early registration is encouraged.</p>
      `,
      speakers: [
        "Hon. Minister of Works and Transport",
        "Dr. Sarah Nakamya - Road Safety Expert",
        "Mr. John Kato - Civil Society Representative",
        "Prof. Mary Nalubega - Transport Research Institute"
      ],
      agenda: [
        "Day 1: Policy Review and Current Challenges",
        "Day 2: Solutions and Implementation Strategies"
      ]
    },
    "neapacoh-meeting-tanzania-2025": {
      id: "neapacoh-meeting-tanzania-2025",
      title: "Championing SRHR through Legislative Engagement: CEPA at the 16th NEAPACOH Meeting in Tanzania",
      date: "March 5-8, 2025",
      time: "8:00 AM - 6:00 PM",
      location: "Dar es Salaam, Tanzania",
      category: "Meeting",
      status: "upcoming",
      image: "/events/neapacoh-meeting.jpg",
      description: "CEPA participated in the 16th NEAPACOH meeting from 5th to 8th March 2025, focusing on sexual and reproductive health rights (SRHR) advocacy and legislative engagement across East and Central Africa.",
      content: `
        <h2>Meeting Overview</h2>
        <p>The 16th NEAPACOH (Network of East African Parliamentarians on Population and Development) meeting represents a crucial platform for advancing sexual and reproductive health rights through legislative engagement across East and Central Africa.</p>
        
        <h3>Meeting Objectives</h3>
        <ul>
          <li>Strengthen parliamentary oversight of SRHR policies</li>
          <li>Share experiences and best practices across the region</li>
          <li>Develop joint advocacy strategies for SRHR issues</li>
          <li>Review progress on regional SRHR commitments</li>
          <li>Plan collaborative initiatives for the coming year</li>
        </ul>
        
        <h3>Key Discussion Points</h3>
        <ul>
          <li>Adolescent sexual and reproductive health policies</li>
          <li>Maternal health and family planning access</li>
          <li>Gender-based violence prevention and response</li>
          <li>HIV/AIDS prevention and treatment programs</li>
          <li>Budget allocation for SRHR services</li>
          <li>Legal frameworks and policy implementation</li>
        </ul>
        
        <h3>Expected Outcomes</h3>
        <p>The meeting aims to produce concrete action plans for advancing SRHR through parliamentary channels, with specific commitments from participating countries to strengthen their legislative frameworks and oversight mechanisms.</p>
      `,
      speakers: [
        "Hon. Sarah Mwangi - NEAPACOH Chair",
        "Dr. Amina Hassan - UNFPA Representative",
        "Ms. Grace Mwangi - Civil Society Coalition",
        "Hon. John Mwangi - Parliamentary Health Committee"
      ],
      agenda: [
        "Day 1: Opening and Regional Overview",
        "Day 2: Policy Analysis and Challenges",
        "Day 3: Best Practices and Solutions",
        "Day 4: Action Planning and Commitments"
      ]
    },
    "ethiopia-civil-society-workshop-2024": {
      id: "ethiopia-civil-society-workshop-2024",
      title: "Bridging Borders, Deepening Democracy: CEPA's Experience-Sharing at the Ethiopia Civil Society Engagement Workshop",
      date: "November 19, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Addis Ababa, Ethiopia",
      category: "Workshop",
      status: "completed",
      image: "/events/ethiopia-workshop.jpg",
      description: "CEPA joined regional civil society leaders in Ethiopia for a comprehensive workshop on democratic engagement, policy advocacy, and cross-border collaboration in East Africa.",
      content: `
        <h2>Workshop Summary</h2>
        <p>This workshop brought together civil society organizations from across East Africa to share experiences, challenges, and best practices in democratic engagement and policy advocacy. The event provided a unique opportunity for cross-border learning and collaboration.</p>
        
        <h3>Workshop Sessions</h3>
        <ul>
          <li>Opening Plenary: Regional Democratic Landscape</li>
          <li>Panel Discussion: Civil Society Challenges and Opportunities</li>
          <li>Breakout Sessions: Sector-Specific Advocacy Strategies</li>
          <li>Case Study Presentations: Successful Campaign Examples</li>
          <li>Networking and Partnership Building</li>
          <li>Closing: Action Plans and Next Steps</li>
        </ul>
        
        <h3>Key Outcomes</h3>
        <ul>
          <li>Established regional civil society network</li>
          <li>Developed joint advocacy strategies</li>
          <li>Created knowledge sharing platform</li>
          <li>Identified opportunities for collaboration</li>
          <li>Agreed on regular communication mechanisms</li>
        </ul>
        
        <h3>Follow-up Activities</h3>
        <p>Participants committed to regular virtual meetings and joint advocacy campaigns on issues of regional importance, with CEPA taking a leading role in coordinating these efforts.</p>
      `,
      speakers: [
        "Dr. Abebe Bekele - Ethiopian Civil Society Forum",
        "Ms. Grace Mwangi - East African Civil Society Network",
        "Mr. John Kato - CEPA Executive Director",
        "Prof. Sarah Hassan - Regional Governance Expert"
      ],
      agenda: [
        "Morning: Opening and Keynote Addresses",
        "Afternoon: Breakout Sessions and Networking"
      ]
    }
  };

  const event = events[params.slug as keyof typeof events];

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested event could not be found.</p>
          <Button asChild className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-900 border border-blue-600/30 backdrop-blur-sm font-medium py-2 px-4 rounded-md transition-all duration-200">
            <Link href="/resources/events">
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
          src={event.image} 
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
                dangerouslySetInnerHTML={{ __html: event.content }}
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
            {Object.values(events)
              .filter(e => e.id !== event.id)
              .slice(0, 3)
              .map((relatedEvent, index) => {
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
                        <Link href={`/resources/events/${relatedEvent.id}`}>
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
