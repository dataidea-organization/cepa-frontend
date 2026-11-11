import type { Metadata } from "next";
import BlogDetailPage from "./client";
import { BlogService } from "@/lib/blog-service";
import { buildShareMetadata, safeLookup } from "@/lib/seo";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await safeLookup(() => BlogService.getBlogPostBySlugDirect(slug));

  if (!post) return {};

  return buildShareMetadata({
    title: post.title,
    description: post.description,
    path: `/resources/blog/${slug}`,
    image: post.image,
    publishedTime: post.date || post.created_at,
    modifiedTime: post.updated_at,
    section: post.category,
  });
}

export default async function BlogDetailPageWrapper({ params }: PageProps) {
  const { slug } = await params;
  return <BlogDetailPage slug={slug} />;
}
