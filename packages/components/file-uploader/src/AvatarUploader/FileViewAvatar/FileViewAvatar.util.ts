import { previewableMimeTypes } from './FileViewAvatar.const';
import { type PreviewableMimeType } from './FileViewAvatar.types';

export const isPreviewableMimeType = (
  mimeType: string,
): mimeType is PreviewableMimeType => {
  return (previewableMimeTypes as string[]).includes(mimeType);
};

/**
 * Makes a url safe to interpolate into a CSS `url('…')`.
 *
 * `source` used to be exclusively a locally created `blob:` url, so the avatar's background could
 * take it verbatim. With `previewUrl` it is consumer input, and a value carrying `')` closes the
 * `url()` and appends declarations of its own.
 *
 * Only the characters that can leave that context are escaped. `encodeURI` is the wrong tool
 * twice over: it leaves `'`, `"`, `(` and `)` intact, and it escapes `%`, which double-encodes a
 * url that already carries percent-escapes — a `data:` uri or any escaped path turns into a broken
 * request.
 */
const CSS_URL_ESCAPES: Record<string, string> = {
  "'": '%27',
  '"': '%22',
  '(': '%28',
  ')': '%29',
  '\\': '%5C',
  '\n': '%0A',
  '\r': '%0D',
  ' ': '%20',
};

export const toCssUrl = (source: string): string =>
  source.replace(/['"()\\\n\r ]/g, (character) => CSS_URL_ESCAPES[character]);
