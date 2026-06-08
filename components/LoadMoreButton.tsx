import { Button } from "@/components/ui/button";

interface LoadMoreButtonProps {
  onClick: () => void | Promise<void>;
  hasMore: boolean;
  visibleCount: number;
  totalCount: number;
  loading?: boolean;
}

export function LoadMoreButton({
  onClick,
  hasMore,
  visibleCount,
  totalCount,
  loading = false,
}: LoadMoreButtonProps) {
  if (!hasMore) return null;

  return (
    <div className="text-center mt-12">
      <Button
        onClick={onClick}
        disabled={loading}
        size="lg"
        className="bg-[#800020] hover:bg-[#800020]/90 text-white border border-[#800020]"
      >
        {loading ? "Loading..." : `Load More (${visibleCount} of ${totalCount})`}
      </Button>
    </div>
  );
}
