import { getEditorColor, getGutterColor } from './helpers/helpers';

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
const transparentColorCode = '#00000000';

export const syneriseThemeColors = (theme: Record<string,string>, showError: boolean, focused: boolean): Record<string, string> => ({
  'editor.background': `${theme.palette[getEditorColor(showError)]}`,
  'editorGutter.background': `${theme.palette[getGutterColor(focused, showError)]}`,
  'editorLineNumber.foreground': '#404c5a',
  'editor.lineHighlightBackground': `${theme.palette['grey-100']}`,
  'editorGutter.activeBackground': '#FF0000',
  'editor.lineHighlightBorder': transparentColorCode,
})

// Can not pass hex as color so we need to hard code them
// for more tokens visit editor.main.js 95301
export const syneriseThemeRules = (): { token: string, foreground: string }[] => ([
  { token: '', foreground:  '57616d'},
  { token: 'comment' , foreground: '0bcb38'},
  { token: 'attribute.value', foreground: 'f52922'},
  { token: 'attribute.value.html', foreground: '0b68ff'},
  { token: 'tag' , foreground: 'f97600'},
  { token: 'identifier', foreground: 'ff5831'},
  { token: 'string' , foreground: '54cb0b'},
])
