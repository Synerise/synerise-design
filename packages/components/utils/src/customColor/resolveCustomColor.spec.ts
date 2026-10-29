import { customColors } from '@synerise/ds-tokens/names';

import { isResolvedColor, resolveCustomColor } from './resolveCustomColor';

describe('isResolvedColor', () => {
  it('detects var() tokens and hex literals; palette keys / empty are not resolved', () => {
    expect(isResolvedColor('var(--x)')).toBe(true);
    expect(isResolvedColor('#fff')).toBe(true);
    expect(isResolvedColor('blue-600')).toBe(false);
    expect(isResolvedColor(undefined)).toBe(false);
    expect(isResolvedColor('')).toBe(false);
  });
});

describe('resolveCustomColor', () => {
  const FB = 'var(--fallback)';

  it('maps a name-shade key to the reversible custom-colour token', () => {
    expect(resolveCustomColor('blue-600', FB)).toBe(customColors.blue['600']);
    expect(resolveCustomColor('blue-600', FB)).toBe(
      'var(--ds-color-custom-blue-600)',
    );
  });

  it('defaults a bare name to shade 600 (overridable)', () => {
    expect(resolveCustomColor('grey', FB)).toBe(customColors.grey['600']);
    expect(resolveCustomColor('grey', FB, { defaultShade: '100' })).toBe(
      customColors.grey['100'],
    );
  });

  it('applies shadeShift, falling back to the base shade when the shifted one is missing', () => {
    expect(resolveCustomColor('blue-600', FB, { shadeShift: -100 })).toBe(
      customColors.blue['500'],
    );
    expect(resolveCustomColor('grey-50', FB, { shadeShift: -100 })).toBe(
      customColors.grey['50'],
    );
  });

  it('normalises a leading-zero shade (050 → 50)', () => {
    expect(resolveCustomColor('grey-050', FB)).toBe(customColors.grey['50']);
  });

  it('passes through already-resolved values only when asked', () => {
    expect(
      resolveCustomColor('var(--x)', FB, { passthroughResolved: true }),
    ).toBe('var(--x)');
    expect(resolveCustomColor('#abc', FB, { passthroughResolved: true })).toBe(
      '#abc',
    );
    expect(resolveCustomColor('var(--x)', FB)).toBe(FB);
  });

  it('falls back for empty / unknown hue / no shade suffix', () => {
    expect(resolveCustomColor(undefined, FB)).toBe(FB);
    expect(resolveCustomColor('', FB)).toBe(FB);
    expect(resolveCustomColor('mono-00', FB)).toBe(FB);
    expect(resolveCustomColor('white', FB)).toBe(FB);
  });
});

describe('resolveCustomColor without a fallback', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns undefined for empty, unknown and unresolved values (the declaration is dropped)', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    expect(resolveCustomColor(undefined)).toBeUndefined();
    expect(resolveCustomColor('')).toBeUndefined();
    expect(resolveCustomColor('bleu-600')).toBeUndefined();
    expect(resolveCustomColor('blue-650-x')).toBeUndefined();
  });

  it('still resolves valid names and honours passthrough', () => {
    expect(resolveCustomColor('blue-600')).toBe('var(--ds-color-custom-blue-600)');
    expect(resolveCustomColor('#abc', undefined, { passthroughResolved: true })).toBe(
      '#abc',
    );
  });
});

describe('resolveCustomColor warning', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('warns once per unresolved non-CSS value', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    resolveCustomColor('typo-600');
    resolveCustomColor('typo-600');

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('typo-600');
  });

  it('stays quiet for valid names, empty values and plain CSS colours', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    resolveCustomColor('blue-600');
    resolveCustomColor(undefined);
    resolveCustomColor('#abc');
    resolveCustomColor('rgb(1, 2, 3)');
    resolveCustomColor('transparent');

    expect(warn).not.toHaveBeenCalled();
  });
});
