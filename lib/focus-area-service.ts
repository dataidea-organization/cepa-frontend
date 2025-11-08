interface FocusAreaObjective {
  id: string;
  text: string;
  order: number;
}

interface FocusAreaActivity {
  id: string;
  text: string;
  order: number;
}

interface FocusAreaOutcome {
  id: string;
  title: string;
  description: string;
  metric: string;
  order: number;
}

interface FocusAreaPartner {
  id: string;
  name: string;
  type: string;
  role: string;
  order: number;
  logo?: string;
}

interface FocusAreaMilestone {
  id: string;
  year: string;
  event: string;
  order: number;
}

interface FocusAreaResource {
  id: string;
  name: string;
  file: string;
  file_url: string;
  order: number;
}

interface FocusArea {
  id: string;
  slug: string;
  title: string;
  image?: string;
  image_url?: string;
  overview_summary: string;
  status: string;
  start_date: string;
  order: number;
  objectives: FocusAreaObjective[];
  activities: FocusAreaActivity[];
  outcomes: FocusAreaOutcome[];
  partners: FocusAreaPartner[];
  milestones: FocusAreaMilestone[];
  resources: FocusAreaResource[];
  created_at: string;
  updated_at: string;
}

interface FocusAreaListItem {
  id: string;
  slug: string;
  title: string;
  overview_summary: string;
  image?: string;
  image_url?: string;
  status: string;
  order: number;
}

interface FocusAreaApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: FocusAreaListItem[];
}

// Cache for focus areas to avoid redundant API calls
let focusAreasCache: FocusAreaListItem[] | null = null;
let focusAreaDetailCache: Map<string, FocusArea> = new Map();
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

const API_BASE_URL = 'https://cepa-backend-production.up.railway.app';

export class FocusAreaService {
  private static async fetchFocusAreas(): Promise<FocusAreaListItem[]> {
    // Check if we have valid cached data
    if (focusAreasCache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return focusAreasCache;
    }

    try {
      console.log('Fetching focus areas from:', `${API_BASE_URL}/focus-area/focus-areas/`);

      const response = await fetch(`${API_BASE_URL}/focus-area/focus-areas/?page_size=100`, {
        next: { revalidate: 600 }, // Revalidate every 10 minutes
        headers: {
          'Accept': 'application/json',
        }
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to fetch focus areas: ${response.status} ${response.statusText}`);
      }

      const data: FocusAreaApiResponse = await response.json();
      console.log('Received data:', data);

      // Update cache
      focusAreasCache = data.results;
      cacheTimestamp = Date.now();

      return data.results;
    } catch (error) {
      console.error('Error fetching focus areas:', error);
      throw error;
    }
  }

  static async getAllFocusAreas(): Promise<FocusAreaListItem[]> {
    return this.fetchFocusAreas();
  }

  static async getActiveFocusAreas(): Promise<FocusAreaListItem[]> {
    const focusAreas = await this.fetchFocusAreas();
    return focusAreas.filter(area => area.status === 'Active');
  }

  static async getFocusAreaBySlug(slug: string): Promise<FocusArea | null> {
    // Check detail cache first
    if (focusAreaDetailCache.has(slug)) {
      return focusAreaDetailCache.get(slug) || null;
    }

    try {
      console.log('Fetching focus area by slug:', `${API_BASE_URL}/focus-area/focus-areas/slug/${slug}/`);

      const response = await fetch(`${API_BASE_URL}/focus-area/focus-areas/slug/${slug}/`, {
        next: { revalidate: 600 }, // Revalidate every 10 minutes
        headers: {
          'Accept': 'application/json',
        }
      });

      console.log('Detail response status:', response.status);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to fetch focus area details: ${response.status}`);
      }

      const data: FocusArea = await response.json();
      console.log('Received detail data:', data);

      // Update detail cache
      focusAreaDetailCache.set(slug, data);

      return data;
    } catch (error) {
      console.error(`Error fetching focus area ${slug}:`, error);
      return null;
    }
  }

  static clearCache(): void {
    focusAreasCache = null;
    focusAreaDetailCache.clear();
    cacheTimestamp = null;
  }
}

export type {
  FocusArea,
  FocusAreaListItem,
  FocusAreaObjective,
  FocusAreaActivity,
  FocusAreaOutcome,
  FocusAreaPartner,
  FocusAreaMilestone,
  FocusAreaResource,
  FocusAreaApiResponse
};
