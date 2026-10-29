import { tokens as lightTokens } from '@synerise/ds-tokens/light';

import theme, { defaultColorsOrder, getColorsOrder } from '../theme';

describe('ThemeProvider', () => {
  it('should have expected theme structure', () => {
    expect(theme).toHaveProperty('variables');
    expect(theme).toHaveProperty('palette');
    expect(theme).toHaveProperty('breakpoints');
    expect(theme).toHaveProperty('space', [0, 8, 12, 16, 24, 32, 48, 64]);
    expect(theme).toHaveProperty('colorsOrder');
    expect(theme).toHaveProperty('variable');
    expect(typeof theme.variable).toBe('function');
    expect(Object.keys(theme.palette).length).toBeGreaterThan(0);
    expect(Object.keys(theme.variables).length).toBeGreaterThan(0);
  });

  it('should expose the resolved design-token map keyed by CSS var name', () => {
    expect(theme).toHaveProperty('tokens');
    expect(Object.keys(theme.tokens).length).toBeGreaterThan(0);
    // Fully-resolved value, not a var() reference (matches the injected light theme).
    expect(theme.tokens['--ds-color-text-base-default']).toBe(
      lightTokens['--ds-color-text-base-default'],
    );
    expect(theme.tokens['--ds-color-text-base-default']).not.toMatch(/^var\(/);
  });

  describe('getColorsOrder', () => {
    const slot = (index: number) => `--ds-color-ordered-${index + 1}-base`;

    it('reads each slot from the token map, in display order', () => {
      const tokenMap = Object.fromEntries(
        defaultColorsOrder.map((_, index) => [slot(index), `slot-${index}`]),
      );

      expect(getColorsOrder(tokenMap)).toEqual(
        defaultColorsOrder.map((_, index) => `slot-${index}`),
      );
    });

    it('falls back to the palette colour for a slot missing from the map', () => {
      const colorsOrder = getColorsOrder({ [slot(0)]: 'slot-0' });

      expect(colorsOrder).toHaveLength(defaultColorsOrder.length);
      expect(colorsOrder[0]).toBe('slot-0');
      expect(colorsOrder.slice(1)).toEqual(
        defaultColorsOrder.slice(1).map((color) => theme.palette[color]),
      );
    });

    it('falls back to the whole palette order for an empty map', () => {
      expect(getColorsOrder({})).toEqual(
        defaultColorsOrder.map((color) => theme.palette[color]),
      );
    });

    it('resolves the default order to concrete colours, never var() references', () => {
      expect(theme.colorsOrder).toHaveLength(defaultColorsOrder.length);
      theme.colorsOrder.forEach((color) => {
        expect(color).toBeTruthy();
        expect(color).not.toMatch(/^var\(/);
      });
    });
  });
});
