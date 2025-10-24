import FocusAreaDetailClient from "./client";

interface FocusAreaDetailProps {
  params: {
    slug: string;
  };
}

export default function FocusAreaDetail({ params }: FocusAreaDetailProps) {
  return <FocusAreaDetailClient slug={params.slug} />;
}
