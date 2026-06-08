import { useCallback, useEffect, useState } from "react";
import { PaginatedResponse } from "@/lib/pagination";

interface UsePaginatedListOptions<T> {
  fetchPage: (page: number) => Promise<PaginatedResponse<T>>;
  resetKey?: string | number;
}

export function usePaginatedList<T>({
  fetchPage,
  resetKey = "",
}: UsePaginatedListOptions<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPage = useCallback(
    async (pageNum: number, append: boolean) => {
      const data = await fetchPage(pageNum);
      setItems((prev) => (append ? [...prev, ...data.results] : data.results));
      setHasMore(Boolean(data.next));
      setTotalCount(data.count);
      setPage(pageNum);
    },
    [fetchPage]
  );

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        await loadPage(1, false);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [loadPage, resetKey]);

  const loadMore = async () => {
    if (!hasMore || loadingMore) return;

    try {
      setLoadingMore(true);
      setError(null);
      await loadPage(page + 1, true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoadingMore(false);
    }
  };

  return {
    items,
    hasMore,
    loadMore,
    totalCount,
    visibleCount: items.length,
    loading,
    loadingMore,
    error,
  };
}
