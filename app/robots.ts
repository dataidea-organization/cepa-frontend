import { MetadataRoute } from 'next'

function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL
  if (configured && configured.trim().length > 0) {
    return configured.trim().replace(/\/$/, '')
  }

  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl && vercelUrl.trim().length > 0) {
    return `https://${vercelUrl.trim().replace(/\/$/, '')}`
  }

  return 'https://cepa.or.ug'
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}

