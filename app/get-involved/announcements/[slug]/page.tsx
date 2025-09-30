import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, ExternalLink, Bell, AlertCircle } from "lucide-react";
import { AnnouncementService, Announcement } from "@/lib/announcement-service";
import AnnouncementDetailClient from "./client";

interface PageProps {
  params: {
    slug: string;
  };
}

const AnnouncementDetailPage = async ({ params }: PageProps) => {
  let announcement: Announcement | null = null;
  let relatedAnnouncements: Announcement[] = [];

  try {
    announcement = await AnnouncementService.getAnnouncementBySlug(params.slug);
    
    if (!announcement) {
      notFound();
    }

    // Get related announcements (same type, different announcement)
    const allAnnouncements = await AnnouncementService.getActiveAnnouncements();
    relatedAnnouncements = allAnnouncements
      .filter(ann => ann.id !== announcement?.id && ann.type === announcement?.type)
      .slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch announcement:", error);
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Breadcrumb */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/get-involved/announcements" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Announcements
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="mb-8 bg-white/40 border border-white/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge className={`${getTypeColor(announcement.type)} backdrop-blur-sm border flex items-center gap-1`}>
                      <Bell className="w-3 h-3" />
                      {announcement.type}
                    </Badge>
                    <Badge className={`${getPriorityColor(announcement.priority)} backdrop-blur-sm border`}>
                      {announcement.priority.toUpperCase()} PRIORITY
                    </Badge>
                    {announcement.featured && (
                      <Badge className="bg-yellow-500/20 text-yellow-900 border-yellow-500/30 backdrop-blur-sm border">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <CardTitle className="text-3xl md:text-4xl mb-4">{announcement.title}</CardTitle>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    Published: {formatDate(announcement.published_date)}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-8">
                  {/* Image */}
                  {announcement.image && (
                    <div className="rounded-lg overflow-hidden relative h-64">
                      <Image 
                        src={announcement.image} 
                        alt={announcement.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Summary */}
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold mb-3 text-blue-900">Summary</h3>
                    <p className="text-blue-800 text-lg leading-relaxed">
                      {announcement.summary}
                    </p>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Full Details</h3>
                    <div className="prose max-w-none text-muted-foreground whitespace-pre-line">
                      {announcement.content}
                    </div>
                  </div>

                  {/* Expiry Warning */}
                  {announcement.expiry_date && (
                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-orange-900 mb-1">Time-Sensitive Information</h4>
                          <p className="text-orange-800">
                            This announcement is valid until <strong>{formatDate(announcement.expiry_date)}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* External Link */}
                  {announcement.external_link && (
                    <div className="pt-6 border-t">
                      <a 
                        href={announcement.external_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                          Learn More
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8 bg-white/40 border border-white/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Type</p>
                    <p className="text-lg">{announcement.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Priority</p>
                    <p className="text-lg capitalize">{announcement.priority}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Published</p>
                    <p className="text-lg">{formatDate(announcement.published_date)}</p>
                  </div>
                  {announcement.expiry_date && (
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">Valid Until</p>
                      <p className="text-lg text-orange-600 font-semibold">{formatDate(announcement.expiry_date)}</p>
                    </div>
                  )}
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 mb-3" asChild>
                      <Link href="/get-involved/announcements">
                        View All Announcements
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/get-involved">
                        Explore Get Involved
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Announcements */}
      {relatedAnnouncements.length > 0 && (
        <AnnouncementDetailClient relatedAnnouncements={relatedAnnouncements} />
      )}
    </div>
  );
};

export default AnnouncementDetailPage;
