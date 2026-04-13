import BlogDetailPage from "./client";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetailPageWrapper({ params }: PageProps) {
  const { slug } = await params;
  return <BlogDetailPage slug={slug} />;
}
