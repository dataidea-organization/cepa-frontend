import { buildPageQuery, PAGE_SIZE, PaginatedResponse } from "./pagination";

const MULTIMEDIA_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/resources$/, "") ||
  "https://admin.cepa.or.ug";

export interface Podcast {
  id: string;
  title: string;
  description: string;
  youtube_id: string;
  youtube_embed_url: string;
  thumbnail?: string;
  duration?: string;
  category?: string;
  date: string;
  guest?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

type PodcastsApiResponse = PaginatedResponse<Podcast>;

export class PodcastService {
  static async getPodcastsPage(
    page: number = 1,
    pageSize: number = PAGE_SIZE,
    category?: string
  ): Promise<PodcastsApiResponse> {
    const query = buildPageQuery(page, pageSize, { category });
    const response = await fetch(`${MULTIMEDIA_API_BASE}/multimedia/podcasts/?${query}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch podcasts");
    }

    return response.json();
  }

  static async getCategories(): Promise<string[]> {
    const response = await fetch(`${MULTIMEDIA_API_BASE}/multimedia/podcasts/categories/`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch podcast categories");
    }

    return response.json();
  }
}

export type { PodcastsApiResponse };
