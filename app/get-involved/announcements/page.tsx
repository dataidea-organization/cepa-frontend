import React from "react";
import Image from "next/image";
import { AnnouncementService, Announcement } from "@/lib/announcement-service";
import AnnouncementsClient from "./client";

const AnnouncementsPage = async () => {
  let announcements: Announcement[] = [];
  let hasError = false;

  try {
    announcements = await AnnouncementService.getAllAnnouncements();
  } catch (error) {
    console.error("Failed to fetch announcements:", error);
    hasError = true;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image 
          src="/hero/announcement-hero.jpg" 
          alt="Announcements - CEPA"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Announcements & Updates
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Stay informed with the latest news, updates, and important announcements from CEPA.
            </p>
              </div>
        </div>
      </section>

      {/* Pass announcements to client component */}
      <AnnouncementsClient announcements={announcements} hasError={hasError} />
    </div>
  );
};

export default AnnouncementsPage;