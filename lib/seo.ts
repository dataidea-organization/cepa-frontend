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

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (configured && configured.trim().length > 0) {
    return configured.trim().replace(/\/+$/, "");
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl && vercelUrl.trim().length > 0) {
    return `https://${vercelUrl.trim().replace(/\/+$/, "")}`;
  }

  return "https://cepa.or.ug";
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
