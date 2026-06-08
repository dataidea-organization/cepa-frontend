import { buildPageQuery, PAGE_SIZE, PaginatedResponse } from "./pagination";

const EVENTS_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/resources$/, "") ||
  "https://cepa-backend-production.up.railway.app";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  image?: string;
  slug: string;
  featured: boolean;
  status: 'upcoming' | 'completed' | 'cancelled';
  content?: string;
  speakers?: string[];
  agenda?: string[];
  created_at: string;
  updated_at: string;
}

type EventsApiResponse = PaginatedResponse<Event>;

// Cache for events to avoid redundant API calls
let eventsCache: Event[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export class EventsService {
  private static async fetchEvents(): Promise<Event[]> {
    // Check if we have valid cached data
    if (eventsCache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return eventsCache;
    }

    try {
      const response = await fetch(`${EVENTS_API_BASE}/resources/events/?page_size=100`, {
        next: { revalidate: 600 } // Revalidate every 10 minutes
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      
      const data: EventsApiResponse = await response.json();
      
      // Update cache
      eventsCache = data.results;
      cacheTimestamp = Date.now();
      
      return data.results;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  static async getAllEvents(): Promise<Event[]> {
    return this.fetchEvents();
  }

  static async getEventsPage(
    page: number = 1,
    pageSize: number = PAGE_SIZE,
    filters: { category?: string; status?: string } = {}
  ): Promise<EventsApiResponse> {
    const query = buildPageQuery(page, pageSize, filters);
    const response = await fetch(`${EVENTS_API_BASE}/resources/events/?${query}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    return response.json();
  }

  static async getEventBySlug(slug: string): Promise<Event | null> {
    const events = await this.fetchEvents();
    return events.find(event => event.slug === slug) || null;
  }

  static async getFeaturedEvents(): Promise<Event[]> {
    const events = await this.fetchEvents();
    return events.filter(event => event.featured);
  }

  static async getUpcomingEvents(): Promise<Event[]> {
    const events = await this.fetchEvents();
    return events.filter(event => event.status === 'upcoming');
  }

  static async getPastEvents(): Promise<Event[]> {
    const events = await this.fetchEvents();
    return events.filter(event => event.status === 'completed');
  }

  static async getRelatedEvents(currentEventId: string, limit: number = 3): Promise<Event[]> {
    const events = await this.fetchEvents();
    return events.filter(event => event.id !== currentEventId).slice(0, limit);
  }

  static async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${EVENTS_API_BASE}/resources/events/categories/`, {
        next: { revalidate: 600 }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch event categories');
      }

      const categories = await response.json();
      return categories;
    } catch (error) {
      console.error('Error fetching event categories:', error);
      return [];
    }
  }

  static clearCache(): void {
    eventsCache = null;
    cacheTimestamp = null;
  }
}

export type { Event, EventsApiResponse };
