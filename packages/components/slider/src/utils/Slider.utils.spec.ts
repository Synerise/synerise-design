import { customColors, orderedBase } from '@synerise/ds-tokens/names';

import {
  getDefaultColorMap,
  isResolvedColor,
  resolveTrackColor,
} from './Slider.utils';

describe('getDefaultColorMap', () => {
  it('keeps the default single/2-handle track on the slider fill-default token', () => {
    expect(getDefaultColorMap(1, 'default')).toEqual({
      '0': 'var(--ds-slider-fill-default)',
    });
    expect(getDefaultColorMap(2, 'range')).toEqual({
      '0': 'var(--ds-slider-fill-default)',
    });
  });

  it('assigns ordered token slots for allocation / 3+ handles', () => {
    const allocationMap = getDefaultColorMap(5, 'allocation');
    expect(allocationMap[0]).toBe(orderedBase[0]);
    expect(allocationMap[1]).toBe(orderedBase[1]);
    expect(allocationMap[0]).toBe('var(--ds-color-background-ordered-1-base)');

    const rangeMap = getDefaultColorMap(3, 'range');
    expect(rangeMap[0]).toBe(orderedBase[0]);
  });
});

describe('isResolvedColor', () => {
  it('treats ordered token vars and literal hex as already resolved', () => {
    expect(isResolvedColor('var(--ds-color-background-ordered-1-base)')).toBe(
      true,
    );
    expect(isResolvedColor('#ff5a4d')).toBe(true);
  });

  it('treats palette keys and empty values as unresolved', () => {
    expect(isResolvedColor('green-600')).toBe(false);
    expect(isResolvedColor(undefined)).toBe(false);
    expect(isResolvedColor('')).toBe(false);
  });
});

describe('resolveTrackColor', () => {
  const FALLBACK = 'var(--ds-slider-track-bg-default)';

  it('uses an already-resolved token / hex verbatim', () => {
    expect(resolveTrackColor('var(--ds-color-background-ordered-1-base)', FALLBACK)).toBe(
      'var(--ds-color-background-ordered-1-base)',
    );
    expect(resolveTrackColor('#ff5a4d', FALLBACK)).toBe('#ff5a4d');
  });

  it('maps a palette key to the reversible custom-colour token (no theme.palette)', () => {
    expect(resolveTrackColor('blue-600', FALLBACK)).toBe(customColors.blue['600']);
    expect(resolveTrackColor('blue-600', FALLBACK)).toBe(
      'var(--ds-color-background-custom-blue-600)',
    );
    // leading-zero shade normalises to the custom-colour key ('050' → '50')
    expect(resolveTrackColor('grey-050', FALLBACK)).toBe(customColors.grey['50']);
  });

  it('falls back to the predefined token for empty or unmapped values', () => {
    expect(resolveTrackColor(undefined, FALLBACK)).toBe(FALLBACK);
    expect(resolveTrackColor('', FALLBACK)).toBe(FALLBACK);
    expect(resolveTrackColor('mono-00', FALLBACK)).toBe(FALLBACK); // hue not in the set
    expect(resolveTrackColor('white', FALLBACK)).toBe(FALLBACK); // no shade suffix
  });
});
