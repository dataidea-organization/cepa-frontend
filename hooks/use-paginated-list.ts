import { useCallback, useEffect, useRef, useState } from "react";
import { PaginatedResponse } from "@/lib/pagination";

interface UsePaginatedListOptions<T> {
  fetchPage: (page: number) => Promise<PaginatedResponse<T>>;
  resetKey?: string | number;
}

/**
 * Append `incoming` items to `existing`, skipping any item whose `id` is already present.
 * Pages are fetched in separate requests, so if new content is published (or ordering
 * ties are resolved differently) between requests, the same item can show up on two pages.
 */
function mergeUnique<T>(existing: T[], incoming: T[]): T[] {
  const seen = new Set<unknown>(
    existing.map((item) => (item as { id?: unknown }).id)
  );
  const merged = [...existing];

  for (const item of incoming) {
    const id = (item as { id?: unknown }).id;
    if (id !== undefined && id !== null) {
      if (seen.has(id)) continue;
      seen.add(id);
    }
    merged.push(item);
  }

  return merged;
}

function dedupe<T>(items: T[]): T[] {
  return mergeUnique<T>([], items);
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

  // Synchronous guard: state updates are async, so rapid double clicks on "Load More"
  // could otherwise fire two requests for the same page.
  const loadingMoreRef = useRef(false);

  // Incremented on every reset so stale responses (e.g. from a previous filter) are ignored.
  const requestIdRef = useRef(0);

  const loadPage = useCallback(
    async (pageNum: number, append: boolean, requestId: number) => {
      const data = await fetchPage(pageNum);
      if (requestId !== requestIdRef.current) return;

      setItems((prev) =>
        append ? mergeUnique(prev, data.results) : dedupe(data.results)
      );
      setHasMore(Boolean(data.next));
      setTotalCount(data.count);
      setPage(pageNum);
    },
    [fetchPage]
  );

  useEffect(() => {
    let cancelled = false;
    const requestId = ++requestIdRef.current;
    loadingMoreRef.current = false;
    setLoadingMore(false);

    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        await loadPage(1, false, requestId);
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
    if (!hasMore || loadingMoreRef.current) return;

    loadingMoreRef.current = true;
    const requestId = requestIdRef.current;

    try {
      setLoadingMore(true);
      setError(null);
      await loadPage(page + 1, true, requestId);
    } catch (err) {
      if (requestId === requestIdRef.current) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    } finally {
      if (requestId === requestIdRef.current) {
        loadingMoreRef.current = false;
        setLoadingMore(false);
      }
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
