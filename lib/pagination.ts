export const PAGE_SIZE = 6;

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export function buildPageQuery(
  page: number,
  pageSize: number = PAGE_SIZE,
  filters: Record<string, string | undefined> = {}
): string {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  return params.toString();
}
