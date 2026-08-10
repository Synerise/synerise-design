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
