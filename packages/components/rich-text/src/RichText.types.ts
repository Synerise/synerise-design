import type { CSSProperties, ReactNode } from 'react';

import type { TooltipProps } from '@synerise/ds-tooltip';
import type { Editor } from '@tiptap/react';

import type { RichTextDocument } from './blockModel';

export type RichTextTexts = {
  paragraph: string;
  bold: string;
  italic: string;
  underline: string;
  strikethrough: string;
  heading: string;
  bulletList: string;
  orderedList: string;
  link: string;
  align: string;
  alignLeft: string;
  alignCenter: string;
  alignRight: string;
  codeBlock: string;
  codeSnippet: string;
  copySnippet: string;
  copiedSnippet: string;
  editWithAI: string;
  more: string;
  table: string;
  insertTable: string;
  addRowBefore: string;
  addRowAfter: string;
  addColumnBefore: string;
  addColumnAfter: string;
  deleteRow: string;
  deleteColumn: string;
  deleteTable: string;
  linkPlaceholder: string;
  linkConfirm: string;
  linkRemove: string;
  image: string;
  imagePlaceholder: string;
  imageConfirm: string;
  imageUpload: string;
};

export type ToolbarFeature =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'heading'
  | 'bulletList'
  | 'orderedList'
  | 'link'
  | 'textAlign'
  | 'codeBlock'
  | 'codeSnippet'
  | 'table'
  | 'image';

export const ALL_TOOLBAR_FEATURES: ToolbarFeature[] = [
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'heading',
  'bulletList',
  'orderedList',
  'link',
  'textAlign',
  'codeSnippet',
  'table',
  'image',
];

export const DEFAULT_HEADING_LEVELS: (1 | 2 | 3 | 4 | 5 | 6)[] = [1, 2, 3];

export const DEFAULT_TEXTS: RichTextTexts = {
  paragraph: 'Paragraph',
  bold: 'Bold',
  italic: 'Italic',
  underline: 'Underline',
  strikethrough: 'Strikethrough',
  heading: 'Heading',
  bulletList: 'Bullet list',
  orderedList: 'Ordered list',
  link: 'Link',
  align: 'Align',
  alignLeft: 'Align left',
  alignCenter: 'Align center',
  alignRight: 'Align right',
  codeBlock: 'Code block',
  codeSnippet: 'Code snippet',
  copySnippet: 'Copy',
  copiedSnippet: 'Copied',
  editWithAI: 'Edit with AI',
  more: 'More',
  table: 'Table',
  insertTable: 'Insert table',
  addRowBefore: 'Add row above',
  addRowAfter: 'Add row below',
  addColumnBefore: 'Add column left',
  addColumnAfter: 'Add column right',
  deleteRow: 'Delete row',
  deleteColumn: 'Delete column',
  deleteTable: 'Delete table',
  linkPlaceholder: 'Enter URL...',
  linkConfirm: 'Apply',
  linkRemove: 'Remove link',
  image: 'Image',
  imagePlaceholder: 'Enter image URL...',
  imageConfirm: 'Insert',
  imageUpload: 'Upload file',
};

export type RichTextFormat = 'html' | 'document' | 'markdown';

export type RichTextAIOption = {
  key: string;
  label: ReactNode;
  /** Rendered as the ds-button `icon` — pass e.g. `<Icon component={<AiStarM />} />`. */
  icon?: ReactNode;
  /**
   * Called with the current selection (or the full text when nothing is
   * selected). A resolved string replaces the selection; resolving with
   * null/undefined leaves the content unchanged (when the consumer handles
   * the action itself, e.g. opens its own dialog).
   */
  onSelect: (
    selectedText: string,
  ) => Promise<string | null | void> | string | null | void;
};

export type RichTextProps = {
  /**
   * Output format for `value` / `defaultValue` / `onChange`:
   * - `'html'` (default) — HTML string
   * - `'document'` — `RichTextDocument` (JSON block model)
   * - `'markdown'` — Markdown string
   */
  format?: RichTextFormat;
  value?: string | RichTextDocument;
  defaultValue?: string | RichTextDocument;
  onChange?: (value: string | RichTextDocument) => void;
  onEditorReady?: (editor: Editor) => void;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  tooltip?: ReactNode;
  tooltipConfig?: TooltipProps;
  description?: ReactNode;
  errorText?: ReactNode;
  height?: string | number;
  maxHeight?: string | number;
  toolbarFeatures?: ToolbarFeature[];
  hideToolbar?: boolean;
  /**
   * Subtle (inline-edit) mode, like SubtleForm components. The editor starts as a
   * borderless preview; hovering shows a grey background and an edit icon, clicking
   * anywhere on the field switches to edit mode (toolbar + border), and clicking
   * outside returns to preview. `errorText` forces edit mode.
   */
  subtle?: boolean;
  headingLevels?: (1 | 2 | 3 | 4 | 5 | 6)[];
  texts?: Partial<RichTextTexts>;
  noBorder?: boolean;
  style?: CSSProperties;
  className?: string;
  autoFocus?: boolean;
  onImageUpload?: (file: File) => string | Promise<string>;
  /**
   * AI "Edit with AI" handler. When provided, the toolbar shows an "Edit with AI" button;
   * on click the current selection (or full text when nothing is selected, possibly an
   * empty string) is passed in and the resolved string replaces it. Resolving with
   * null/undefined leaves the content unchanged, so the handler can drive an external
   * flow (e.g. a platform agent) instead. The design system performs no AI call itself.
   */
  onEditWithAI?: (selectedText: string) => Promise<string | null | undefined>;
  /**
   * When provided (non-empty), the "Edit with AI" button opens a dropdown with
   * these options instead of calling `onEditWithAI` directly. Options and their
   * behavior are fully defined by the consumer.
   */
  editWithAIOptions?: RichTextAIOption[];
  /**
   * Enables the SubtleForm-style transitions in `subtle` mode (content sliding
   * right on hover, placeholder dropping into place, blur compensation).
   * When disabled (default), hovering the preview only tints the background.
   */
  animations?: boolean;
};

export type ToolbarProps = {
  editor: Editor | null;
  features: ToolbarFeature[];
  headingLevels: (1 | 2 | 3 | 4 | 5 | 6)[];
  texts: RichTextTexts;
  disabled?: boolean;
  onImageUpload?: (file: File) => string | Promise<string>;
  onEditWithAI?: (selectedText: string) => Promise<string | null | undefined>;
  editWithAIOptions?: RichTextAIOption[];
};

export type LinkPopoverProps = {
  editor: Editor;
  texts: RichTextTexts;
  onClose: () => void;
};

export type ImagePopoverProps = {
  editor: Editor;
  texts: RichTextTexts;
  onClose: () => void;
  onImageUpload?: (file: File) => string | Promise<string>;
};
