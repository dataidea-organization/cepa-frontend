import FocusAreaDetailClient from "./client";

interface FocusAreaDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function FocusAreaDetail({ params }: FocusAreaDetailProps) {
  const { slug } = await params;
  return <FocusAreaDetailClient slug={slug} />;
}
