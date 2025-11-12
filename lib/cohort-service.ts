const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cepa-backend-production.up.railway.app';

export interface Cohort {
  id: string;
  name: string;
  year: number;
  image?: string;
  image_url?: string;
  slug: string;
  is_active: boolean;
}

export interface Fellow {
  id: string;
  name: string;
  bio: string;
  profile_image?: string;
  profile_image_url?: string;
  position?: string;
  linkedin_url?: string;
  twitter_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CohortProject {
  id: string;
  title: string;
  description: string;
  image?: string;
  image_url?: string;
  project_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CohortEvent {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

export interface CohortGalleryImage {
  id: string;
  image: string;
  image_url?: string;
  caption?: string;
  created_at: string;
  updated_at: string;
}

export interface CohortDetail extends Cohort {
  overview: string;
  fellows: Fellow[];
  projects: CohortProject[];
  events: CohortEvent[];
  gallery_images: CohortGalleryImage[];
  created_at: string;
  updated_at: string;
}

class CohortService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTTL = 10 * 60 * 1000; // 10 minutes

  private async fetchWithCache(url: string, options?: RequestInit): Promise<any> {
    const cacheKey = url;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data;
    }

    const response = await fetch(url, {
      ...options,
      next: { revalidate: 600 }, // 10 minutes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    this.cache.set(cacheKey, { data, timestamp: Date.now() });

    return data;
  }

  async getAllCohorts(): Promise<Cohort[]> {
    return this.fetchWithCache(`${API_BASE_URL}/fellowships/cohorts/`);
  }

  async getActiveCohorts(): Promise<Cohort[]> {
    return this.fetchWithCache(`${API_BASE_URL}/fellowships/cohorts/active/`);
  }

  async getCohortBySlug(slug: string): Promise<CohortDetail> {
    return this.fetchWithCache(`${API_BASE_URL}/fellowships/cohorts/${slug}/`);
  }

  async getFellowsByCohort(cohortId: string): Promise<Fellow[]> {
    return this.fetchWithCache(`${API_BASE_URL}/fellowships/fellows/?cohort=${cohortId}`);
  }

  async getProjectsByCohort(cohortId: string): Promise<CohortProject[]> {
    return this.fetchWithCache(`${API_BASE_URL}/fellowships/projects/?cohort=${cohortId}`);
  }

  async getEventsByCohort(cohortId: string): Promise<CohortEvent[]> {
    return this.fetchWithCache(`${API_BASE_URL}/fellowships/events/?cohort=${cohortId}`);
  }

  async getGalleryImagesByCohort(cohortId: string): Promise<CohortGalleryImage[]> {
    return this.fetchWithCache(`${API_BASE_URL}/fellowships/gallery/?cohort=${cohortId}`);
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const cohortService = new CohortService();
