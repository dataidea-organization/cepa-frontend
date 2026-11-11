import type { Metadata } from "next";

export const SITE_NAME = "CEPA - Centre for Policy Analysis";
export const SITE_SHORT_NAME = "CEPA";
export const SITE_DESCRIPTION =
  "Leading think tank in Uganda focused on policy analysis and governance";

/**
 * Default card image when a page has no image of its own. Kept small (<300KB) because
 * WhatsApp silently drops previews whose image is too large.
 */
export const DEFAULT_SHARE_IMAGE_PATH = "/hero/home-hero.jpg";

/** Must match an entry in next.config.ts images.remotePatterns, plus default deviceSizes/qualities. */
const OPTIMIZABLE_IMAGE_HOSTS = new Set(["admin.cepa.or.ug"]);
const SHARE_IMAGE_WIDTH = 1200;
const SHARE_IMAGE_QUALITY = 75;

/** Canonical public origin. The apex domain (cepa.or.ug) redirects here. */
export const PRODUCTION_SITE_URL = "https://www.cepa.or.ug";

/**
 * Public origin used for canonical URLs, og:url, share images, the sitemap and robots.txt.
 *
 * Do NOT fall back to VERCEL_URL for production: on Vercel it is the per-deployment host
 * (e.g. cepa-frontend-xxxx.vercel.app), which sits behind deployment protection. Social
 * crawlers cannot fetch images from it, and it must never appear in canonical URLs.
 * Set NEXT_PUBLIC_SITE_URL to override (e.g. a staging domain).
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (configured && configured.trim().length > 0) {
    return configured.trim().replace(/\/+$/, "");
  }

  // Preview deployments are self-contained, so let them reference themselves.
  const vercelUrl = process.env.VERCEL_URL;
  if (process.env.VERCEL_ENV === "preview" && vercelUrl && vercelUrl.trim().length > 0) {
    return `https://${vercelUrl.trim().replace(/\/+$/, "")}`;
  }

  return PRODUCTION_SITE_URL;
}

/** Strip HTML tags/entities and collapse whitespace, then trim to a card-friendly length. */
export function toPlainDescription(
  value: string | null | undefined,
  maxLength = 200
): string {
  if (!value) return "";

  const text = value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;

  const cut = text.slice(0, maxLength - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}\u2026`;
}

/**
 * Social crawlers need an absolute https URL. Backend images can come back as http://
 * (the API sits behind a proxy), and local fixtures are site-relative paths.
 */
export function toAbsoluteImageUrl(
  image: string | null | undefined,
  siteUrl: string = getSiteUrl()
): string {
  if (!image) return `${siteUrl}${DEFAULT_SHARE_IMAGE_PATH}`;

  if (/^https?:\/\//i.test(image)) {
    try {
      const url = new URL(image);
      const isLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1";
      if (url.protocol === "http:" && !isLocal) {
        url.protocol = "https:";
      }

      // Uploaded images can be several MB, and WhatsApp skips previews for images much
      // over ~300-600KB. Route backend uploads through Next's image optimizer so crawlers
      // get a ~1200px-wide, recompressed copy (host must be in images.remotePatterns).
      if (OPTIMIZABLE_IMAGE_HOSTS.has(url.hostname) && url.pathname.startsWith("/media/")) {
        const params = new URLSearchParams({
          url: url.toString(),
          w: String(SHARE_IMAGE_WIDTH),
          q: String(SHARE_IMAGE_QUALITY),
        });
        return `${siteUrl}/_next/image?${params.toString()}`;
      }

      return url.toString();
    } catch {
      return `${siteUrl}${DEFAULT_SHARE_IMAGE_PATH}`;
    }
  }

  return `${siteUrl}${image.startsWith("/") ? "" : "/"}${image}`;
}

interface ShareMetadataInput {
  title: string;
  description?: string | null;
  /** Site-relative path of the page, e.g. /resources/news/my-article */
  path: string;
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
  section?: string | null;
}

/**
 * Build per-page metadata so links shared on X, WhatsApp, Facebook, LinkedIn, etc. render
 * a rich card (title, summary, image) that links straight to this page.
 */
export function buildShareMetadata({
  title,
  description,
  path,
  image,
  type = "article",
  publishedTime,
  modifiedTime,
  section,
}: ShareMetadataInput): Metadata {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${path.startsWith("/") ? "" : "/"}${path}`;
  const summary = toPlainDescription(description) || SITE_DESCRIPTION;
  const imageUrl = toAbsoluteImageUrl(image, siteUrl);

  return {
    title,
    description: summary,
    alternates: { canonical: url },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: "en_UG",
      url,
      title,
      description: summary,
      images: [{ url: imageUrl, alt: title }],
      ...(type === "article"
        ? {
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
            ...(section ? { section } : {}),
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: summary,
      images: [imageUrl],
    },
  };
}

/** Run a lookup for metadata purposes; a failed lookup must never break the page render. */
export async function safeLookup<T>(lookup: () => Promise<T | null>): Promise<T | null> {
  try {
    return await lookup();
  } catch {
    return null;
  }
}
