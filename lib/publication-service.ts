import { buildPageQuery, PAGE_SIZE, PaginatedResponse } from "./pagination";

const PUBLICATIONS_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://cepa-backend-production.up.railway.app/resources";

export interface Publication {
  id: string;
  title: string;
  type: string;
  date: string;
  description: string;
  category: string;
  url?: string;
  pdf?: string;
  image?: string;
  image_url?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

type PublicationsApiResponse = PaginatedResponse<Publication>;

export class PublicationService {
  static async getPublicationsPage(
    page: number = 1,
    pageSize: number = PAGE_SIZE,
    category?: string
  ): Promise<PublicationsApiResponse> {
    const query = buildPageQuery(page, pageSize, { category });
    const response = await fetch(`${PUBLICATIONS_API_BASE}/publications/?${query}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch publications");
    }

    return response.json();
  }

  static async getCategories(): Promise<string[]> {
    const response = await fetch(`${PUBLICATIONS_API_BASE}/publications/categories/`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch publication categories");
    }

    return response.json();
  }
}

export type { PublicationsApiResponse };
