import { describe, expect, it } from 'vitest';

import { normalizeUrl } from '../utils';

describe('normalizeUrl', () => {
  it('prepends https:// to protocol-less URLs', () => {
    expect(normalizeUrl('www.google.com')).toBe('https://www.google.com');
    expect(normalizeUrl('google.com/search?q=a')).toBe(
      'https://google.com/search?q=a',
    );
  });

  it('trims whitespace', () => {
    expect(normalizeUrl('  www.google.com  ')).toBe('https://www.google.com');
  });

  it('keeps URLs that already have a scheme', () => {
    expect(normalizeUrl('https://google.com')).toBe('https://google.com');
    expect(normalizeUrl('http://google.com')).toBe('http://google.com');
    expect(normalizeUrl('mailto:a@b.com')).toBe('mailto:a@b.com');
    expect(normalizeUrl('tel:+48123456789')).toBe('tel:+48123456789');
    expect(normalizeUrl('data:image/png;base64,AAAA')).toBe(
      'data:image/png;base64,AAAA',
    );
  });

  it('keeps protocol-relative, anchor, and site-relative URLs', () => {
    expect(normalizeUrl('//cdn.example.com/x.png')).toBe(
      '//cdn.example.com/x.png',
    );
    expect(normalizeUrl('#section')).toBe('#section');
    expect(normalizeUrl('/internal/path')).toBe('/internal/path');
  });

  it('returns empty input unchanged', () => {
    expect(normalizeUrl('')).toBe('');
  });
});
