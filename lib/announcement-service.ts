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

export class AnnouncementService {
  private static async fetchAnnouncements(): Promise<Announcement[]> {
    try {
      const response = await fetch(
        'https://cepa-backend-production.up.railway.app/getinvolved/announcements/?page_size=100',
        { cache: 'no-store' }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }

      const data: AnnouncementApiResponse = await response.json();
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
    // No-op: caching disabled temporarily for live updates
  }
}

export type { Announcement, AnnouncementApiResponse };
