import type { Metadata } from "next";
import FocusAreaDetailClient from "./client";
import { FocusAreaService } from "@/lib/focus-area-service";
import { buildShareMetadata, safeLookup } from "@/lib/seo";

interface FocusAreaDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: FocusAreaDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const focusArea = await safeLookup(() => FocusAreaService.getFocusAreaBySlug(slug));

  if (!focusArea) return {};

  return buildShareMetadata({
    title: focusArea.title,
    description: focusArea.overview_summary,
    path: `/focus-areas/${slug}`,
    image: focusArea.image_url || focusArea.image,
    type: "website",
  });
}

export default async function FocusAreaDetail({ params }: FocusAreaDetailProps) {
  const { slug } = await params;
  return <FocusAreaDetailClient slug={slug} />;
}
