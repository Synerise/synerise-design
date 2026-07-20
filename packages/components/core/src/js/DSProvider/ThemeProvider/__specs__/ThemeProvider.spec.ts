import theme from '../theme';

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
    expect(theme.tokens['--ds-color-text-base-default']).toBe('#384350');
  });
});
