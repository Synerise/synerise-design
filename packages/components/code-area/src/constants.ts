import type { editor } from 'monaco-editor/esm/vs/editor/editor.api';

import { theme } from '@synerise/ds-core';

export const MONACO_DEFAULT_OPTIONS: editor.IStandaloneEditorConstructionOptions =
  {
    minimap: { enabled: false },
    automaticLayout: true,
    renderLineHighlight: 'none',
    quickSuggestions: {
      other: true,
      strings: true,
    },
    scrollbar: {
      verticalScrollbarSize: 11,
      verticalSliderSize: 3,
      vertical: 'visible',
      useShadows: false,
    },
  };

export const TRIGGER_SOURCE = 'ds-code-area';

const TRANSPARENT = '#00000000';
export const DS_MONACO_THEME_NAME = 'DSTheme';
type TokenMap = { [key: string]: string };

const getLuminance = (hex: string): number => {
  const [r, g, b] = [1, 3, 5].map(
    (start) => parseInt(hex.slice(start, start + 2), 16) / 255,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const getDsMonacoTheme = (
  tokens: TokenMap,
): editor.IStandaloneThemeData => ({
  // The base supplies the syntax-highlighting rules, so it has to match the
  // surface: 'vs' keywords and strings are unreadable on a dark field.
  base:
    getLuminance(tokens['--ds-color-background-base-default']) < 0.5
      ? 'vs-dark'
      : 'vs',
  inherit: true,
  rules: [],
  colors: {
    // Monaco theme colours must be hex — read resolved token values from the
    // active mode's token map (not var(), which Monaco can't parse). TRANSPARENT
    // stays a hex literal because --ds-color-transparent resolves to rgba(),
    // which Monaco rejects.
    'editor.foreground': tokens['--ds-color-text-base-default'],
    'editor.background': TRANSPARENT,

    'editorOverviewRuler.border': TRANSPARENT,
    'scrollbarSlider.background': tokens['--ds-color-border-base-strong'],
    'scrollbarSlider.hoverBackground':
      tokens['--ds-color-background-base-stronghover'],
    'scrollbarSlider.activeBackground':
      tokens['--ds-color-background-base-stronghover'],
    'editorLineNumber.foreground': tokens['--ds-color-text-neutral-default'],
  },
});

/** @deprecated Light mode only — use `getDsMonacoTheme(useTheme().tokens)`. */
export const DS_MONACO_THEME: editor.IStandaloneThemeData = getDsMonacoTheme(
  theme.tokens,
);
