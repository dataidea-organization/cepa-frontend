interface CareerOpportunity {
  id: string;
  title: string;
  type: 'Full-time' | 'Internship' | 'Fellowship' | 'Consultancy' | 'Part-time';
  location: string;
  department?: string;
  description: string;
  responsibilities: string;
  requirements: string;
  how_to_apply: string;
  deadline: string;
  posted_date: string;
  status: 'open' | 'closed';
  featured: boolean;
  image?: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface CareerApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CareerOpportunity[];
}

// Cache for career opportunities to avoid redundant API calls
let careerCache: CareerOpportunity[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export class CareerService {
  private static async fetchCareerOpportunities(): Promise<CareerOpportunity[]> {
    // Check if we have valid cached data
    if (careerCache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return careerCache;
    }

    try {
      const response = await fetch('https://cepa-backend-production.up.railway.app/getinvolved/career/?page_size=100', {
        next: { revalidate: 600 } // Revalidate every 10 minutes
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch career opportunities');
      }
      
      const data: CareerApiResponse = await response.json();
      
      // Update cache
      careerCache = data.results;
      cacheTimestamp = Date.now();
      
      return data.results;
    } catch (error) {
      console.error('Error fetching career opportunities:', error);
      throw error;
    }
  }

  static async getAllOpportunities(): Promise<CareerOpportunity[]> {
    return this.fetchCareerOpportunities();
  }

  static async getOpportunityBySlug(slug: string): Promise<CareerOpportunity | null> {
    const opportunities = await this.fetchCareerOpportunities();
    return opportunities.find(opportunity => opportunity.slug === slug) || null;
  }

  static async getFeaturedOpportunities(): Promise<CareerOpportunity[]> {
    const opportunities = await this.fetchCareerOpportunities();
    return opportunities.filter(opportunity => opportunity.featured && opportunity.status === 'open');
  }

  static async getOpenOpportunities(): Promise<CareerOpportunity[]> {
    const opportunities = await this.fetchCareerOpportunities();
    return opportunities.filter(opportunity => opportunity.status === 'open');
  }

  static async getOpportunitiesByType(type: CareerOpportunity['type']): Promise<CareerOpportunity[]> {
    const opportunities = await this.fetchCareerOpportunities();
    return opportunities.filter(opportunity => opportunity.type === type && opportunity.status === 'open');
  }

  static clearCache(): void {
    careerCache = null;
    cacheTimestamp = null;
  }
}

export type { CareerOpportunity, CareerApiResponse };
