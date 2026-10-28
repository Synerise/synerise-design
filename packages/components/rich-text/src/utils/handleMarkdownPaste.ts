import { DOMParser as ProseMirrorDOMParser, Slice } from '@tiptap/pm/model';
import type { EditorView } from '@tiptap/pm/view';
import MarkdownIt from 'markdown-it';

import { markdownToHtml } from './markdownToHtml';

// ProseMirror tags the HTML it copies, which already carries the structure.
const PROSEMIRROR_SLICE_ATTRIBUTE = 'data-pm-slice';

const STRUCTURED_HTML_PATTERN =
  /<(h[1-6]|ul|ol|table|blockquote|pre|a|strong|b|em|i|u|s|code)[\s>]/i;

const isInsideCode = ({ state }: EditorView) =>
  state.selection.$from.parent.type.spec.code ||
  state.selection.$to.parent.type.spec.code;

const { linkify } = new MarkdownIt();

const isUrlOverSelection = ({ state }: EditorView, text: string) => {
  const links = linkify.match(text.trim());
  return (
    !state.selection.empty &&
    links?.length === 1 &&
    links[0].raw === text.trim()
  );
};

const parseWithSchema = (view: EditorView, markdown: string) => {
  const { body } = new window.DOMParser().parseFromString(
    markdownToHtml(markdown, { allowHtml: false }),
    'text/html',
  );
  const { content } = ProseMirrorDOMParser.fromSchema(view.state.schema).parse(
    body,
  );

  const openStart = content.firstChild?.type.name === 'paragraph' ? 1 : 0;
  const openEnd = content.lastChild?.type.name === 'paragraph' ? 1 : 0;
  return new Slice(content, openStart, openEnd);
};

export const handleMarkdownPaste = (
  view: EditorView,
  event: ClipboardEvent,
): boolean => {
  const text = event.clipboardData?.getData('text/plain');
  const html = event.clipboardData?.getData('text/html') ?? '';

  if (
    !text?.trim() ||
    html.includes(PROSEMIRROR_SLICE_ATTRIBUTE) ||
    STRUCTURED_HTML_PATTERN.test(html) ||
    isInsideCode(view) ||
    isUrlOverSelection(view, text)
  ) {
    return false;
  }

  const slice = parseWithSchema(view, text);

  if (!slice.content.size) {
    return false;
  }

  view.dispatch(
    view.state.tr
      .replaceSelection(slice)
      .scrollIntoView()
      .setMeta('paste', true),
  );
  return true;
};
