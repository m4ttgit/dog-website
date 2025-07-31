/**
 * Share utilities for building platform share URLs and canonical absolute URLs,
 * plus clipboard copy fallback. No external dependencies.
 */

export function enc(v) {
  return encodeURIComponent(v || '');
}

/**
 * Get site origin in both server and client contexts.
 * Priority: NEXT_PUBLIC_SITE_URL (without trailing slash) > window.location.origin (client) > ''.
 */
export function getOrigin() {
  try {
    const env = (process.env.NEXT_PUBLIC_SITE_URL || '').trim().replace(/\/$/, '');
    if (env) return env;
  } catch {
    // ignore
  }
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return window.location.origin;
  }
  return '';
}

/**
 * Ensure URL is absolute by prefixing the site origin if a path was provided.
 * If an absolute URL is passed, it is returned unchanged.
 */
export function buildCanonicalUrl(pathOrUrl) {
  if (!pathOrUrl) return '';
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const origin = getOrigin();
  if (!origin) {
    // On server without NEXT_PUBLIC_SITE_URL we cannot build absolute URL.
    // Return the provided value; client components can resolve later.
    return pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  }
  const p = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${origin}${p}`;
}

/**
 * Build a share URL for a platform using standard intent endpoints.
 * Supported platforms: 'whatsapp' | 'facebook' | 'x' | 'telegram' | 'linkedin'
 */
export function buildShareUrl(platform, url, title, text) {
  const absoluteUrl = buildCanonicalUrl(url);
  const u = enc(absoluteUrl);
  const t = enc(text || title || '');
  switch ((platform || '').toLowerCase()) {
    case 'whatsapp':
      // WhatsApp uses only text parameter; include both message and URL.
      return `https://api.whatsapp.com/send?text=${enc(`${text || title || ''} ${absoluteUrl}`.trim())}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    case 'x':
      // X (Twitter) share intent
      return `https://twitter.com/intent/tweet?url=${u}&text=${t}`;
    case 'telegram':
      return `https://t.me/share/url?url=${u}&text=${t}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    default:
      return absoluteUrl;
  }
}

/**
 * Copy text to clipboard using modern API with a fallback for older browsers.
 */
export async function copyToClipboard(str) {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(str);
      return true;
    }
  } catch {
    // fall through to legacy
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = str;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
}

/**
 * TODO: If needed later, add helpers to format default text/title per breed context.
 */
