/**
 * Schemes that are safe to place in a link `href`. Anything else that carries a
 * scheme — `javascript:`, `data:`, `vbscript:`, `file:`, `blob:`, … — is
 * rejected to prevent stored XSS when a document is rendered: React does NOT
 * block `javascript:` hrefs at runtime (it only warns in development), so an
 * untrusted document reaching the renderer would otherwise produce a clickable
 * script payload.
 */
const SAFE_HREF_SCHEMES = new Set(['http:', 'https:', 'mailto:', 'tel:']);

/**
 * Strips ASCII whitespace and C0/C1 control characters (space, tab, newline,
 * DEL, …) that browsers ignore inside a scheme. Detecting on the stripped copy
 * catches obfuscations like `java\tscript:` while the original is preserved.
 */
const stripIgnoredChars = (value: string): string => {
  let out = '';
  for (const ch of value) {
    const code = ch.charCodeAt(0);
    if (code <= 0x20 || (code >= 0x7f && code <= 0x9f)) {
      continue;
    }
    out += ch;
  }
  return out;
};

/**
 * Returns `raw` when it is safe to use as a link `href`, otherwise `''`.
 *
 * Schemeless URLs (`www.foo.com`), protocol-relative (`//cdn/x`), site-relative
 * (`/path`) and in-page anchors (`#id`) carry no scheme and are always allowed.
 * Detection runs on a stripped copy while the original string is returned
 * untouched when safe.
 */
export const sanitizeUrl = (raw: string): string => {
  const url = raw.trim();
  if (!url) {
    return '';
  }
  const stripped = stripIgnoredChars(url);
  if (
    stripped.startsWith('//') ||
    stripped.startsWith('/') ||
    stripped.startsWith('#')
  ) {
    return url;
  }
  const scheme = stripped.match(/^([a-z][a-z0-9+.-]*):/i);
  if (!scheme) {
    return url;
  }
  return SAFE_HREF_SCHEMES.has(`${scheme[1].toLowerCase()}:`) ? url : '';
};
