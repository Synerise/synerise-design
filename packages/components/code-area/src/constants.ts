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
export const DS_MONACO_THEME: editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [],
  colors: {
    // Monaco theme colours must be hex — read resolved token values from theme.tokens
    // (not var(), which Monaco can't parse). TRANSPARENT stays a hex literal because
    // --ds-color-transparent resolves to rgba(), which Monaco rejects.
    'editor.foreground': theme.tokens['--ds-color-text-base-default'],
    'editor.background': TRANSPARENT,

    'editorOverviewRuler.border': TRANSPARENT,
    'scrollbarSlider.background': theme.tokens['--ds-color-border-base-strong'],
    'scrollbarSlider.hoverBackground':
      theme.tokens['--ds-color-background-base-stronghover'],
    'scrollbarSlider.activeBackground':
      theme.tokens['--ds-color-background-base-stronghover'],
    'editorLineNumber.foreground':
      theme.tokens['--ds-color-text-neutral-default'],
  },
};
