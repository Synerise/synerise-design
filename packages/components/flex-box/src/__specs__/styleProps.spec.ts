import {
  STYLE_PROPS,
  shouldForwardStyleProp,
  styleProps,
} from '../styleProps';

const SPACE = [0, 8, 12, 16, 24, 32, 48, 64];
const BREAKPOINTS = ['768px', '960px', '1280px'];
const theme = { space: SPACE, breakpoints: BREAKPOINTS };

const css = (props: Record<string, unknown>): string =>
  styleProps({ theme, ...props });

describe('styleProps', () => {
  describe('space props', () => {
    it('should resolve a number inside the scale through theme.space', () => {
      expect(css({ ml: 1 })).toBe('margin-left:8px;');
      expect(css({ padding: 4 })).toBe('padding:24px;');
      expect(css({ pr: 3 })).toBe('padding-right:16px;');
    });

    it('should fall back to pixels for a number past the end of the scale', () => {
      expect(css({ mt: 24 })).toBe('margin-top:24px;');
      expect(css({ my: 20 })).toBe('margin-top:20px;margin-bottom:20px;');
    });

    it('should leave zero unitless', () => {
      expect(css({ my: 0 })).toBe('margin-top:0;margin-bottom:0;');
      expect(css({ pt: 0 })).toBe('padding-top:0;');
    });

    it('should index the scale by magnitude for a negative value', () => {
      expect(css({ mx: -2 })).toBe('margin-left:-12px;margin-right:-12px;');
      expect(css({ mt: -1 })).toBe('margin-top:-8px;');
      expect(css({ ml: -4 })).toBe('margin-left:-24px;');
      expect(css({ mt: -7 })).toBe('margin-top:-64px;');
    });

    it('should fall back to pixels for a negative value past the scale', () => {
      expect(css({ mt: -24 })).toBe('margin-top:-24px;');
      expect(css({ mb: -20 })).toBe('margin-bottom:-20px;');
      expect(css({ mt: -8 })).toBe('margin-top:-8px;');
    });

    it('should keep negative zero unitless', () => {
      expect(css({ m: -0 })).toBe('margin:0;');
    });

    it('should pass a negative string through untouched', () => {
      expect(css({ mx: '-12px' })).toBe(
        'margin-left:-12px;margin-right:-12px;',
      );
    });

    it('should NOT scale negative padding — margin only', () => {
      // styled-system resolved negatives for margin alone; negative padding
      // is meaningless, so it goes straight to pixels.
      expect(css({ p: -2 })).toBe('padding:-2px;');
      expect(css({ pl: -5 })).toBe('padding-left:-5px;');
      expect(css({ px: -2 })).toBe('padding-left:-2px;padding-right:-2px;');
      expect(css({ paddingTop: -2 })).toBe('padding-top:-2px;');
    });

    it('should still scale positive padding', () => {
      expect(css({ p: 2 })).toBe('padding:12px;');
      expect(css({ pl: 4 })).toBe('padding-left:24px;');
    });

    it('should pass strings through, including keywords and shorthands', () => {
      expect(css({ mx: 'auto' })).toBe('margin-left:auto;margin-right:auto;');
      expect(css({ margin: '0 auto' })).toBe('margin:0 auto;');
      expect(css({ padding: '8px 16px 6px 16px' })).toBe(
        'padding:8px 16px 6px 16px;',
      );
    });

    it('should expand the x and y shorthands to both sides', () => {
      expect(css({ mx: 1 })).toBe('margin-left:8px;margin-right:8px;');
      expect(css({ py: 1 })).toBe('padding-top:8px;padding-bottom:8px;');
      expect(css({ marginY: 2 })).toBe('margin-top:12px;margin-bottom:12px;');
    });

    it('should treat the long and short aliases identically', () => {
      expect(css({ marginBottom: 3 })).toBe(css({ mb: 3 }));
      expect(css({ paddingLeft: 2 })).toBe(css({ pl: 2 }));
    });

    it('should put gap on the same scale', () => {
      expect(css({ gap: 2 })).toBe('gap:12px;');
      expect(css({ gap: '1rem' })).toBe('gap:1rem;');
      expect(css({ gap: 12 })).toBe('gap:12px;');
    });

    it('should fall back to pixels when the theme has no space scale', () => {
      expect(styleProps({ ml: 1 })).toBe('margin-left:1px;');
    });
  });

  describe('size props', () => {
    it('should treat a number at or below 1 as a fraction of the container', () => {
      expect(css({ width: 1 })).toBe('width:100%;');
      expect(css({ width: 1 / 2 })).toBe('width:50%;');
      expect(css({ width: 0.25 })).toBe('width:25%;');
      expect(css({ width: 0 })).toBe('width:0%;');
    });

    it('should treat a number above 1 as pixels', () => {
      expect(css({ width: 588 })).toBe('width:588px;');
      expect(css({ maxWidth: 1240 })).toBe('max-width:1240px;');
      expect(css({ height: 40 })).toBe('height:40px;');
    });

    it('should pass strings through', () => {
      expect(css({ width: '100%' })).toBe('width:100%;');
      expect(css({ height: 'calc(100% - 8px)' })).toBe(
        'height:calc(100% - 8px);',
      );
    });
  });

  describe('keyword and length props', () => {
    it('should pass flexbox and layout keywords through untouched', () => {
      expect(css({ alignItems: 'center' })).toBe('align-items:center;');
      expect(css({ flexDirection: 'column' })).toBe('flex-direction:column;');
      expect(css({ justifyContent: 'space-between' })).toBe(
        'justify-content:space-between;',
      );
      expect(css({ overflowY: 'auto' })).toBe('overflow-y:auto;');
    });

    it('should not add pixels to unitless numeric keywords', () => {
      expect(css({ flex: 1 })).toBe('flex:1;');
      expect(css({ opacity: 1 })).toBe('opacity:1;');
      expect(css({ fontWeight: 500 })).toBe('font-weight:500;');
    });

    it('should render fontSize as pixels', () => {
      expect(css({ fontSize: 14 })).toBe('font-size:14px;');
      expect(css({ fontSize: '0.875rem' })).toBe('font-size:0.875rem;');
    });
  });

  describe('declaration order', () => {
    it('should emit props in the order the caller wrote them', () => {
      expect(css({ m: 4, mt: 1 })).toBe('margin:24px;margin-top:8px;');
      expect(css({ mt: 1, m: 4 })).toBe('margin-top:8px;margin:24px;');
    });

    it('should let a later shorthand override an earlier longhand', () => {
      expect(css({ ml: 1, mx: 4 })).toBe(
        'margin-left:24px;margin-right:24px;',
      );
    });

    it('should keep a re-declared property in its first position', () => {
      expect(css({ mx: 4, ml: 1 })).toBe(
        'margin-left:8px;margin-right:24px;',
      );
    });
  });

  describe('omitted and unknown values', () => {
    it('should emit nothing for a prop that is absent, undefined, null or empty', () => {
      expect(css({})).toBe('');
      expect(css({ mt: undefined })).toBe('');
      expect(css({ mt: null })).toBe('');
      expect(css({ width: '' })).toBe('');
    });

    it('should ignore props it does not own', () => {
      expect(css({ onClick: () => undefined, hasError: true, id: 'x' })).toBe(
        '',
      );
    });
  });

  describe('responsive tuples', () => {
    it('should put the first entry in the base block', () => {
      expect(css({ width: [1, 1 / 2] })).toContain('width:100%;');
    });

    it('should step later entries up through theme.breakpoints', () => {
      expect(css({ width: [1, 1 / 2, 1 / 4] })).toBe(
        'width:100%;' +
          '@media screen and (min-width:768px){width:50%;}' +
          '@media screen and (min-width:960px){width:25%;}',
      );
    });

    it('should leave a breakpoint alone for a null entry', () => {
      expect(css({ flexWrap: ['wrap', null, 'nowrap'] })).toBe(
        'flex-wrap:wrap;' +
          '@media screen and (min-width:960px){flex-wrap:nowrap;}',
      );
    });

    it('should drop entries past the last breakpoint', () => {
      expect(css({ width: [1, 1 / 2, 1 / 3, 1 / 4, 1 / 5] })).toBe(
        'width:100%;' +
          '@media screen and (min-width:768px){width:50%;}' +
          '@media screen and (min-width:960px){width:33.33333333333333%;}' +
          '@media screen and (min-width:1280px){width:25%;}',
      );
    });

    it('should merge props that share a breakpoint into one media block', () => {
      expect(css({ mt: [0, 4], width: [1, 1 / 2] })).toBe(
        'margin-top:0;width:100%;' +
          '@media screen and (min-width:768px){margin-top:24px;width:50%;}',
      );
    });

    it('should fall back to the styled-system breakpoints without a theme', () => {
      expect(styleProps({ width: [1, 1 / 2] })).toBe(
        'width:100%;@media screen and (min-width:40em){width:50%;}',
      );
    });
  });

  describe('shouldForwardStyleProp', () => {
    it('should drop every prop it turns into CSS', () => {
      Object.keys(STYLE_PROPS).forEach((prop) => {
        expect(shouldForwardStyleProp(prop, () => true)).toBe(false);
      });
    });

    it('should drop the sizing props that used to leak into the markup', () => {
      ['width', 'height', 'color', 'opacity', 'fontWeight'].forEach((prop) => {
        expect(shouldForwardStyleProp(prop, () => true)).toBe(false);
      });
    });

    it('should defer to the default filter for everything else', () => {
      expect(shouldForwardStyleProp('id', () => true)).toBe(true);
      expect(shouldForwardStyleProp('hasError', () => false)).toBe(false);
    });

    it('should forward unknown props when no default filter is supplied', () => {
      expect(shouldForwardStyleProp('id')).toBe(true);
    });
  });
});
