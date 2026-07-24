import { orderedBase } from '@synerise/ds-tokens/names';

import { getDefaultColorMap, isResolvedColor } from './Slider.utils';

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
