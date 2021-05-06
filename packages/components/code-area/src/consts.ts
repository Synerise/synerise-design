export const MONACO_EDITOR_LAYOUT_EVENT_NAME = 'monacoEditor:layout';

export const MONACO_EDITOR_ON_CHANGE_DELAY = 300;
export const MONACO_EDITOR_MENU_ID = 'EditorContext';
export const MONACO_EDITOR_MENU_IDS_TO_REMOVE = [
  'editor.action.clipboardPasteAction',
  'editor.action.quickOutline', // Go to Symbol... context menu item,
  'editor.action.rename',
];

export const MONACO_EDITOR_DEFAULT_OPTIONS = {
  minimap: {
    enabled: false,
  },
  scrollbar: {
    horizontal: 'hidden' as 'hidden',
    vertical: 'hidden' as 'hidden',
  },
  overviewRulerLanes: 0,
  folding: false,
  renderLineHighlightOnlyWhenFocus: true,
};

export const transparentColorCode = '#00000000';
