import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, Briefcase, ArrowLeft, ExternalLink } from "lucide-react";
import { CareerService, CareerOpportunity } from "@/lib/career-service";
import CareerDetailClient from "./client";

interface PageProps {
  params: {
    slug: string;
  };
}

const CareerDetailPage = async ({ params }: PageProps) => {
  let opportunity: CareerOpportunity | null = null;
  let relatedOpportunities: CareerOpportunity[] = [];

  try {
    opportunity = await CareerService.getOpportunityBySlug(params.slug);
    
    if (!opportunity) {
      notFound();
    }

    // Get related opportunities (same type, different position)
    const allOpportunities = await CareerService.getOpenOpportunities();
    relatedOpportunities = allOpportunities
      .filter(opp => opp.id !== opportunity?.id && opp.type === opportunity?.type)
      .slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch career opportunity:", error);
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-blue-500/20 text-blue-900 border-blue-500/30';
      case 'Internship':
        return 'bg-green-500/20 text-green-900 border-green-500/30';
      case 'Fellowship':
        return 'bg-purple-500/20 text-purple-900 border-purple-500/30';
      case 'Consultancy':
        return 'bg-orange-500/20 text-orange-900 border-orange-500/30';
      case 'Part-time':
        return 'bg-yellow-500/20 text-yellow-900 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-900 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Breadcrumb */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/get-involved/career" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Career Opportunities
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
                    <Badge className={`${getTypeColor(opportunity.type)} backdrop-blur-sm border`}>
                      {opportunity.type}
                    </Badge>
                    {opportunity.featured && (
                      <Badge className="bg-yellow-500/20 text-yellow-900 border-yellow-500/30 backdrop-blur-sm border">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-3xl md:text-4xl mb-4">{opportunity.title}</CardTitle>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {opportunity.location}
                    </div>
                    {opportunity.department && (
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        {opportunity.department}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Posted: {formatDate(opportunity.posted_date)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Description */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">About This Position</h3>
                    <div className="prose max-w-none text-muted-foreground whitespace-pre-line">
                      {opportunity.description}
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Key Responsibilities</h3>
                    <div className="prose max-w-none text-muted-foreground whitespace-pre-line">
                      {opportunity.responsibilities}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Requirements</h3>
                    <div className="prose max-w-none text-muted-foreground whitespace-pre-line">
                      {opportunity.requirements}
                    </div>
                  </div>

                  {/* How to Apply */}
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-900">How to Apply</h3>
                    <div className="prose max-w-none text-blue-800 whitespace-pre-line mb-6">
                      {opportunity.how_to_apply}
                    </div>
                    <div className="flex items-center text-sm text-blue-900 font-semibold">
                      <Clock className="w-4 h-4 mr-2" />
                      Application Deadline: {formatDate(opportunity.deadline)}
                    </div>
                  </div>
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
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Position Type</p>
                    <p className="text-lg">{opportunity.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Location</p>
                    <p className="text-lg">{opportunity.location}</p>
                  </div>
                  {opportunity.department && (
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">Department</p>
                      <p className="text-lg">{opportunity.department}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Application Deadline</p>
                    <p className="text-lg text-red-600 font-semibold">{formatDate(opportunity.deadline)}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <Button className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-900 border border-blue-600/30 backdrop-blur-sm font-medium mb-3" asChild>
                      <a href="#apply" className="flex items-center justify-center">
                        Apply Now
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full border-blue-600/30 text-blue-900 hover:bg-blue-600/10 backdrop-blur-sm" asChild>
                      <Link href="/get-involved/career">
                        View All Opportunities
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Opportunities */}
      {relatedOpportunities.length > 0 && (
        <CareerDetailClient relatedOpportunities={relatedOpportunities} />
      )}
    </div>
  );
};

export default CareerDetailPage;
