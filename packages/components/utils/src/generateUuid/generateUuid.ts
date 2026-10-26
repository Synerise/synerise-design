const fillRandomBytes = (
  bytes: Uint8Array<ArrayBuffer>,
): Uint8Array<ArrayBuffer> => {
  if (typeof globalThis.crypto?.getRandomValues === 'function') {
    return globalThis.crypto.getRandomValues(bytes);
  }
  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Math.floor(Math.random() * 256);
  }
  return bytes;
};

/**
 * Returns an RFC 4122 version 4 UUID.
 *
 * `crypto.randomUUID()` only exists in secure contexts (https, localhost), so on plain http the
 * UUID is built from `crypto.getRandomValues()`, which every context has. `Math.random()` is the
 * last resort for runtimes without `crypto`. Fine for DOM ids and keys; not for secrets.
 */
export const generateUuid = (): string => {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }

  const bytes = fillRandomBytes(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0'));
  return [
    hex.slice(0, 4),
    hex.slice(4, 6),
    hex.slice(6, 8),
    hex.slice(8, 10),
    hex.slice(10, 16),
  ]
    .map((group) => group.join(''))
    .join('-');
};
