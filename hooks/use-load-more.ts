import { useEffect, useState } from "react";

export const INITIAL_ITEMS_COUNT = 6;
export const LOAD_MORE_INCREMENT = 6;

export function useLoadMore<T>(items: T[], resetKey?: string | number) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS_COUNT);

  useEffect(() => {
    setVisibleCount(INITIAL_ITEMS_COUNT);
  }, [resetKey]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_INCREMENT, items.length));
  };

  return {
    visibleItems,
    hasMore,
    loadMore,
    visibleCount: Math.min(visibleCount, items.length),
    totalCount: items.length,
  };
}
