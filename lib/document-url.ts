/**
 * Helpers that turn backend (admin) media URLs into public, frontend-hosted URLs.
 *
 * The API returns absolute URLs such as https://admin.cepa.or.ug/media/publications/pdfs/x.pdf,
 * which exposes the admin host to visitors. next.config.ts proxies `/media/*` to the backend,
 * so the same file is reachable at https://cepa.or.ug/media/publications/pdfs/x.pdf.
 */

const MEDIA_PATH_PREFIX = "/media/";

function collectBackendHosts(): string[] {
  const hosts = new Set<string>(["admin.cepa.or.ug", "localhost:8000", "127.0.0.1:8000"]);

  const configured = process.env.NEXT_PUBLIC_API_URL;
  if (configured) {
    try {
      hosts.add(new URL(configured).host);
    } catch {
      // Ignore a malformed env value; the defaults above still apply.
    }
  }

  return [...hosts];
}

const BACKEND_HOSTS = new Set(collectBackendHosts());

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const MEDIA_HREF_PATTERN = new RegExp(
  `(href\\s*=\\s*["'])https?:\\/\\/(?:${[...BACKEND_HOSTS].map(escapeRegExp).join("|")})(\\/media\\/)`,
  "gi"
);

/**
 * Convert a backend media URL to a public `/media/...` path.
 * Anything that is not a backend media URL (external links, already-relative paths,
 * other site paths) is returned unchanged.
 */
export function toPublicDocumentUrl<T extends string | null | undefined>(url: T): T {
  if (!url) return url;

  if (url.startsWith(MEDIA_PATH_PREFIX)) return url;

  try {
    const parsed = new URL(url);
    if (BACKEND_HOSTS.has(parsed.host) && parsed.pathname.startsWith(MEDIA_PATH_PREFIX)) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}` as T;
    }
  } catch {
    // Not an absolute URL (e.g. "/publications/x.pdf"); leave it alone.
  }

  return url;
}

/**
 * Rewrite backend media links inside rich-text HTML (CKEditor content).
 * Only `href` attributes are changed, so embedded images keep loading directly from
 * the backend and no layout or optimisation behaviour changes.
 */
export function rewriteMediaLinksInHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html.replace(MEDIA_HREF_PATTERN, "$1$2");
}
