import NewsDetailPage from "./client";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsDetailPageWrapper({ params }: PageProps) {
  const { slug } = await params;
  return <NewsDetailPage slug={slug} />;
}
