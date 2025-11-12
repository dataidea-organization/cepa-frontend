export interface WhoWeAreFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface StatCard {
  id: number;
  value: number;
  label: string;
  order: number;
  updated_at: string;
}

export interface OurStoryCard {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface WhatSetsUsApartCard {
  id: number;
  title: string;
  description: string;
  order: number;
}

export interface HeroSection {
  id: number;
  title: string;
  description: string;
  hero_image: string | null;
  hero_image_url: string | null;
  updated_at: string;
}

export interface WhoWeAreSection {
  id: number;
  title: string;
  description: string;
  features: WhoWeAreFeature[];
  updated_at: string;
}

export interface OurStorySection {
  id: number;
  title: string;
  description: string;
  cards: OurStoryCard[];
  updated_at: string;
}

export interface WhatSetsUsApartSection {
  id: number;
  title: string;
  description: string;
  cards: WhatSetsUsApartCard[];
  updated_at: string;
}

export interface CallToActionSection {
  id: number;
  title: string;
  description: string;
  updated_at: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  profile_image: string;
  profile_image_url: string | null;
  linkedin_url: string | null;
  order: number;
  is_active: boolean;
  updated_at: string;
}

export interface Partner {
  id: number;
  name: string;
  full_name: string | null;
  logo: string;
  logo_url: string | null;
  website_url: string | null;
  order: number;
  is_active: boolean;
  updated_at: string;
}

export interface AboutPageData {
  hero: HeroSection | null;
  who_we_are: WhoWeAreSection | null;
  stats: StatCard[];
  our_story: OurStorySection | null;
  what_sets_us_apart: WhatSetsUsApartSection | null;
  call_to_action: CallToActionSection | null;
  team: TeamMember[];
  partners: Partner[];
}

// Cache for about page data
let aboutPageCache: AboutPageData | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export class AboutService {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://cepa-backend-production.up.railway.app';

  static async getAboutPageData(): Promise<AboutPageData> {
    // Check if we have valid cached data
    if (aboutPageCache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return aboutPageCache;
    }

    try {
      const response = await fetch(`${this.BASE_URL}/about/page/`, {
        next: { revalidate: 600 } // Revalidate every 10 minutes
      });

      if (!response.ok) {
        throw new Error('Failed to fetch about page data');
      }

      const data: AboutPageData = await response.json();

      // Update cache
      aboutPageCache = data;
      cacheTimestamp = Date.now();

      return data;
    } catch (error) {
      console.error('Error fetching about page data:', error);
      throw error;
    }
  }

  static clearCache(): void {
    aboutPageCache = null;
    cacheTimestamp = null;
  }
}