import type { Metadata } from "next";
import NewsDetailPage from "./client";
import { NewsService } from "@/lib/news-service";
import { buildShareMetadata, safeLookup } from "@/lib/seo";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await safeLookup(() => NewsService.getNewsBySlug(slug));

  if (!article) return {};

  return buildShareMetadata({
    title: article.title,
    description: article.description,
    path: `/resources/news/${slug}`,
    image: article.image,
    publishedTime: article.date || article.created_at,
    modifiedTime: article.updated_at,
    section: article.category,
  });
}

export default async function NewsDetailPageWrapper({ params }: PageProps) {
  const { slug } = await params;
  return <NewsDetailPage slug={slug} />;
}
