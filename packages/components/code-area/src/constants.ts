import type { monaco } from 'react-monaco-editor';
import { theme } from '@synerise/ds-core';

export const MONACO_DEFAULT_OPTIONS: monaco.editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  automaticLayout: true,
  renderLineHighlight: 'none',
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
export const DS_MONACO_THEME: monaco.editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [],
  colors: {
    'editor.foreground': theme.palette['grey-800'],
    'editor.background': TRANSPARENT,

    'editorOverviewRuler.border': TRANSPARENT,
    'scrollbarSlider.background': theme.palette['grey-300'],
    'scrollbarSlider.hoverBackground': theme.palette['grey-500'],
    'scrollbarSlider.activeBackground': theme.palette['grey-500'],
    'editorLineNumber.foreground': theme.palette['grey-500'],
  },
};
