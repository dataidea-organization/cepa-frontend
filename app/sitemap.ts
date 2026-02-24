import { MetadataRoute } from 'next'

function getSiteUrl(): string {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL

  if (configured && configured.trim().length > 0) {
    return configured.trim().replace(/\/$/, '')
  }

  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl && vercelUrl.trim().length > 0) {
    return `https://${vercelUrl.trim().replace(/\/$/, '')}`
  }

  return 'https://cepa.or.ug'
}

async function safeFetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 600 },
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

type PagedResults<T> = { results?: T[] }

function asDate(value: unknown): Date | undefined {
  if (typeof value !== 'string') return undefined
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? undefined : d
}

function extractResultsArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[]
  if (value && typeof value === 'object') {
    const results = (value as { results?: unknown }).results
    if (Array.isArray(results)) return results as T[]
  }
  return []
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl()

  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/focus-areas`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/citizens-voice`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/citizens-voice/trivia`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/citizens-voice/polls`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/citizens-voice/x-polls`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/get-involved`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/get-involved/membership`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/get-involved/contact`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/get-involved/donate`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/get-involved/career`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/get-involved/fellowships`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/get-involved/announcements`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/news`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/blog`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/publications`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/events-and-activities`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/chat`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/multimedia`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/multimedia/videos`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/multimedia/podcasts`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/multimedia/gallery`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://cepa-backend-production.up.railway.app'
  const resourcesBase = process.env.NEXT_PUBLIC_API_BASE_URL || `${apiBase}/resources`

  const [
    focusAreas,
    blog,
    news,
    events,
    announcements,
    careers,
    cohortsRaw,
    triviasRaw,
  ] = await Promise.all([
    safeFetchJson<PagedResults<{ slug: string; updated_at?: string }>>(
      `${apiBase}/focus-area/focus-areas/?page_size=100`
    ),
    safeFetchJson<PagedResults<{ slug: string; updated_at?: string }>>(
      `${resourcesBase}/blog/?page_size=100`
    ),
    safeFetchJson<PagedResults<{ slug: string; updated_at?: string }>>(
      `${resourcesBase}/news/?page_size=100`
    ),
    safeFetchJson<PagedResults<{ slug: string; updated_at?: string }>>(
      `${resourcesBase}/events/?page_size=100`
    ),
    safeFetchJson<PagedResults<{ slug: string; updated_at?: string }>>(
      `${apiBase}/getinvolved/announcements/?page_size=100`
    ),
    safeFetchJson<PagedResults<{ slug: string; updated_at?: string }>>(
      `${apiBase}/getinvolved/career/?page_size=100`
    ),
    safeFetchJson<unknown>(
      `${apiBase}/fellowships/cohorts/`
    ),
    safeFetchJson<unknown>(
      `${apiBase}/multimedia/trivia/`
    ),
  ])

  const dynamicRoutes: MetadataRoute.Sitemap = []
  const cohorts = extractResultsArray<{ slug: string; updated_at?: string }>(cohortsRaw)
  const trivias = extractResultsArray<{ id: number | string; updated_at?: string }>(triviasRaw)

  for (const item of focusAreas?.results ?? []) {
    if (!item?.slug) continue
    dynamicRoutes.push({
      url: `${baseUrl}/focus-areas/${item.slug}`,
      lastModified: asDate(item.updated_at) ?? now,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  for (const item of blog?.results ?? []) {
    if (!item?.slug) continue
    dynamicRoutes.push({
      url: `${baseUrl}/resources/blog/${item.slug}`,
      lastModified: asDate(item.updated_at) ?? now,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  for (const item of news?.results ?? []) {
    if (!item?.slug) continue
    dynamicRoutes.push({
      url: `${baseUrl}/resources/news/${item.slug}`,
      lastModified: asDate(item.updated_at) ?? now,
      changeFrequency: 'daily',
      priority: 0.7,
    })
  }

  for (const item of events?.results ?? []) {
    if (!item?.slug) continue
    dynamicRoutes.push({
      url: `${baseUrl}/resources/events-and-activities/${item.slug}`,
      lastModified: asDate(item.updated_at) ?? now,
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  }

  for (const item of announcements?.results ?? []) {
    if (!item?.slug) continue
    dynamicRoutes.push({
      url: `${baseUrl}/get-involved/announcements/${item.slug}`,
      lastModified: asDate(item.updated_at) ?? now,
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  }

  for (const item of careers?.results ?? []) {
    if (!item?.slug) continue
    dynamicRoutes.push({
      url: `${baseUrl}/get-involved/career/${item.slug}`,
      lastModified: asDate(item.updated_at) ?? now,
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  }

  for (const item of cohorts) {
    if (!item?.slug) continue
    dynamicRoutes.push({
      url: `${baseUrl}/get-involved/fellowships/cohorts/${item.slug}`,
      lastModified: asDate(item.updated_at) ?? now,
      changeFrequency: 'monthly',
      priority: 0.5,
    })
  }

  for (const item of trivias) {
    if (!item?.id) continue
    dynamicRoutes.push({
      url: `${baseUrl}/citizens-voice/trivia/${item.id}`,
      lastModified: asDate(item.updated_at) ?? now,
      changeFrequency: 'weekly',
      priority: 0.4,
    })
  }

  return [...staticRoutes, ...dynamicRoutes]
}
