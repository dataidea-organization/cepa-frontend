import type { Metadata } from "next";
import EventDetailPage from "./client";
import { EventsService } from "@/lib/events-service";
import { buildShareMetadata, safeLookup } from "@/lib/seo";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await safeLookup(() => EventsService.getEventBySlug(slug));

  if (!event) return {};

  return buildShareMetadata({
    title: event.title,
    description: event.description,
    path: `/resources/events-and-activities/${slug}`,
    image: event.image,
    publishedTime: event.created_at,
    modifiedTime: event.updated_at,
    section: event.category,
  });
}

export default async function EventDetailPageWrapper({ params }: PageProps) {
  const { slug } = await params;
  return <EventDetailPage slug={slug} />;
}
