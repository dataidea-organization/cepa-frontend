import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Briefcase, GraduationCap, Award, Calendar, ExternalLink, Mail, Bell } from "lucide-react";
import { CareerService, CareerOpportunity } from "@/lib/career-service";
import CareerClient from "./client";

const Career = async () => {
  let opportunities: CareerOpportunity[] = [];
  let hasError = false;

  try {
    opportunities = await CareerService.getOpenOpportunities();
  } catch (error) {
    console.error("Failed to fetch career opportunities:", error);
    hasError = true;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src="/hero/career-hero.jpg" 
          alt="Career & Internships - CEPA"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Career & Internships
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join our team of dedicated professionals working to strengthen governance, democracy, and policy analysis in Uganda and East Africa.
            </p>
          </div>
        </div>
      </section>
      
      {/* Pass opportunities to client component */}
      <CareerClient opportunities={opportunities} hasError={hasError} />
    </div>
  );
};

export default Career;
