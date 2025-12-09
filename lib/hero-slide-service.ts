interface HeroSlide {
  id: string;
  title: string;
  image: string;
  image_url: string;
  order: number;
  is_active: boolean;
}

// Cache for hero slides to avoid redundant API calls
let heroSlidesCache: HeroSlide[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

const API_BASE_URL = 'https://cepa-backend-production.up.railway.app';

export class HeroSlideService {
  static async getActiveHeroSlides(): Promise<HeroSlide[]> {
    // Check if we have valid cached data
    if (heroSlidesCache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return heroSlidesCache;
    }

    try {
      console.log('Fetching hero slides from:', `${API_BASE_URL}/home/hero-slides/`);

      const response = await fetch(`${API_BASE_URL}/home/hero-slides/`, {
        next: { revalidate: 600 }, // Revalidate every 10 minutes
        headers: {
          'Accept': 'application/json',
        }
      });

      console.log('Hero slides response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to fetch hero slides: ${response.status} ${response.statusText}`);
      }

      const data: HeroSlide[] = await response.json();
      console.log('Received hero slides:', data);

      // Update cache
      heroSlidesCache = data;
      cacheTimestamp = Date.now();

      return data;
    } catch (error) {
      console.error('Error fetching hero slides:', error);
      // Return empty array on error to prevent breaking the UI
      return [];
    }
  }

  static clearCache(): void {
    heroSlidesCache = null;
    cacheTimestamp = null;
  }
}

export type { HeroSlide };