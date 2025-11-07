interface Announcement {
  id: string;
  title: string;
  type: 'General' | 'Event' | 'Program' | 'Partnership' | 'Achievement' | 'Policy' | 'Urgent';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  summary: string;
  content: string;
  published_date: string;
  expiry_date?: string;
  is_active: boolean;
  featured: boolean;
  image?: string;
  slug: string;
  external_link?: string;
  created_at: string;
  updated_at: string;
}

interface AnnouncementApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Announcement[];
}

// Cache for announcements to avoid redundant API calls
let announcementCache: Announcement[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export class AnnouncementService {
  private static async fetchAnnouncements(): Promise<Announcement[]> {
    // Check if we have valid cached data
    if (announcementCache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return announcementCache;
    }

    try {
      const response = await fetch('https://cepa-backend-production.up.railway.app/getinvolved/announcements/?page_size=100', {
        next: { revalidate: 600 } // Revalidate every 10 minutes
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }
      
      const data: AnnouncementApiResponse = await response.json();
      
      // Update cache
      announcementCache = data.results;
      cacheTimestamp = Date.now();
      
      return data.results;
    } catch (error) {
      console.error('Error fetching announcements:', error);
      throw error;
    }
  }

  static async getAllAnnouncements(): Promise<Announcement[]> {
    return this.fetchAnnouncements();
  }

  static async getAnnouncementBySlug(slug: string): Promise<Announcement | null> {
    const announcements = await this.fetchAnnouncements();
    return announcements.find(announcement => announcement.slug === slug) || null;
  }

  static clearCache(): void {
    announcementCache = null;
    cacheTimestamp = null;
  }
}

export type { Announcement, AnnouncementApiResponse };


