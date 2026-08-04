/**
 * Prepends https:// to URLs typed without a protocol (e.g. "www.google.com"),
 * which the browser would otherwise resolve relative to the current origin.
 * Absolute URLs and other schemes (mailto:, tel:, data:), protocol-relative
 * URLs, in-page anchors, and site-relative paths are left untouched.
 */
export const normalizeUrl = (raw: string): string => {
  const url = raw.trim();
  if (!url) {
    return url;
  }
  if (
    /^[a-z][a-z0-9+.-]*:/i.test(url) ||
    url.startsWith('//') ||
    url.startsWith('#') ||
    url.startsWith('/')
  ) {
    return url;
  }
  return `https://${url}`;
};
