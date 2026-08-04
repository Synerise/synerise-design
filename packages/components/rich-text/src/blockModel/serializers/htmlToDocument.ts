import { sanitizeUrl } from '../../utils/sanitizeUrl';
import type {
  Block,
  HeadingLevel,
  InlineNode,
  Mark,
  RichTextDocument,
  TableCellBlock,
  TableHeaderBlock,
  TableRowBlock,
  TextAlign,
} from '../blockModel.types';

const HEADING_TAGS = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);
const INLINE_MARK_TAGS: Record<string, Mark['type']> = {
  STRONG: 'bold',
  B: 'bold',
  EM: 'italic',
  I: 'italic',
  U: 'underline',
  S: 'strike',
  DEL: 'strike',
  CODE: 'code',
};

const getTextAlign = (el: HTMLElement): TextAlign | undefined => {
  const align = el.style.textAlign;
  if (align === 'left' || align === 'center' || align === 'right') {
    return align;
  }
  return undefined;
};

const parseInlineNodes = (
  node: Node,
  inheritedMarks: Mark[] = [],
): InlineNode[] => {
  const result: InlineNode[] = [];

  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === 3) {
      const text = child.textContent || '';
      if (text) {
        result.push({
          type: 'text',
          text,
          ...(inheritedMarks.length && { marks: [...inheritedMarks] }),
        });
      }
      continue;
    }

    if (child.nodeType !== 1) {
      continue;
    }
    const el = child as HTMLElement;
    const tag = el.tagName;

    if (tag === 'BR') {
      result.push({ type: 'hardBreak' });
      continue;
    }

    if (tag === 'A') {
      const linkMark: Mark = {
        type: 'link',
        // Reject javascript:/data:/… so parsed HTML can't smuggle a script href.
        href: sanitizeUrl(el.getAttribute('href') || ''),
        ...(el.getAttribute('target') && {
          target: el.getAttribute('target')!,
        }),
        ...(el.getAttribute('rel') && { rel: el.getAttribute('rel')! }),
      };
      result.push(...parseInlineNodes(el, [...inheritedMarks, linkMark]));
      continue;
    }

    const markType = INLINE_MARK_TAGS[tag];
    if (markType) {
      const mark: Mark = { type: markType } as Mark;
      result.push(...parseInlineNodes(el, [...inheritedMarks, mark]));
      continue;
    }

    result.push(...parseInlineNodes(el, inheritedMarks));
  }

  return result;
};

const parseBlock = (el: HTMLElement): Block | null => {
  const tag = el.tagName;

  if (tag === 'P') {
    const textAlign = getTextAlign(el);
    return {
      type: 'paragraph',
      ...(textAlign && { attrs: { textAlign } }),
      children: parseInlineNodes(el),
    };
  }

  if (HEADING_TAGS.has(tag)) {
    const level = parseInt(tag[1], 10) as HeadingLevel;
    const textAlign = getTextAlign(el);
    return {
      type: 'heading',
      attrs: { level, ...(textAlign && { textAlign }) },
      children: parseInlineNodes(el),
    };
  }

  if (tag === 'UL') {
    return {
      type: 'bulletList',
      children: Array.from(el.children)
        .filter((li) => li.tagName === 'LI')
        .map((li) => ({
          type: 'listItem' as const,
          children: parseListItemChildren(li as HTMLElement),
        })),
    };
  }

  if (tag === 'OL') {
    const start = el.getAttribute('start');
    return {
      type: 'orderedList',
      ...(start &&
        parseInt(start, 10) !== 1 && { attrs: { start: parseInt(start, 10) } }),
      children: Array.from(el.children)
        .filter((li) => li.tagName === 'LI')
        .map((li) => ({
          type: 'listItem' as const,
          children: parseListItemChildren(li as HTMLElement),
        })),
    };
  }

  if (tag === 'PRE') {
    const code = el.querySelector('code');
    const text = (code || el).textContent || '';
    const isSnippet = el.getAttribute('data-type') === 'code-snippet';
    return {
      type: isSnippet ? 'codeSnippet' : 'codeBlock',
      children: text ? [{ type: 'text', text }] : [],
    };
  }

  if (tag === 'IMG') {
    const src = el.getAttribute('src');
    if (!src) {
      return null;
    }
    return {
      type: 'image',
      attrs: {
        src,
        ...(el.getAttribute('alt') && { alt: el.getAttribute('alt')! }),
        ...(el.getAttribute('title') && { title: el.getAttribute('title')! }),
      },
    };
  }

  if (tag === 'BLOCKQUOTE') {
    return {
      type: 'blockquote',
      children: parseChildren(el),
    };
  }

  if (tag === 'HR') {
    return { type: 'horizontalRule' };
  }

  if (tag === 'TABLE') {
    const rows = Array.from(el.querySelectorAll('tr')).map(
      (tr): TableRowBlock => ({
        type: 'tableRow',
        children: Array.from(tr.children)
          .filter((c) => c.tagName === 'TD' || c.tagName === 'TH')
          .map((c) => parseCell(c as HTMLElement)),
      }),
    );
    return { type: 'table', children: rows };
  }

  return null;
};

const parseSpan = (
  el: HTMLElement,
): { colspan?: number; rowspan?: number } | undefined => {
  const attrs: { colspan?: number; rowspan?: number } = {};
  const colspan = parseInt(el.getAttribute('colspan') || '', 10);
  const rowspan = parseInt(el.getAttribute('rowspan') || '', 10);
  if (colspan > 1) {
    attrs.colspan = colspan;
  }
  if (rowspan > 1) {
    attrs.rowspan = rowspan;
  }
  return Object.keys(attrs).length ? attrs : undefined;
};

const parseCell = (el: HTMLElement): TableCellBlock | TableHeaderBlock => {
  const type = el.tagName === 'TH' ? 'tableHeader' : 'tableCell';
  const span = parseSpan(el);
  // Cells may hold block children (Tiptap) or bare inline content (GFM markdown).
  const hasBlockChildren = Array.from(el.children).some((c) =>
    [
      'P',
      'UL',
      'OL',
      'PRE',
      'BLOCKQUOTE',
      'H1',
      'H2',
      'H3',
      'H4',
      'H5',
      'H6',
    ].includes(c.tagName),
  );
  const children: Block[] = hasBlockChildren
    ? parseChildren(el)
    : [{ type: 'paragraph', children: parseInlineNodes(el) }];
  return { type, ...(span && { attrs: span }), children };
};

const parseListItemChildren = (li: HTMLElement): Block[] => {
  const blocks: Block[] = [];
  const hasBlockChildren = Array.from(li.children).some(
    (c) => c.tagName === 'P' || c.tagName === 'UL' || c.tagName === 'OL',
  );

  if (hasBlockChildren) {
    return parseChildren(li);
  }

  const inlines = parseInlineNodes(li);
  if (inlines.length) {
    blocks.push({ type: 'paragraph', children: inlines });
  }
  return blocks;
};

const parseChildren = (parent: HTMLElement): Block[] =>
  Array.from(parent.children)
    .map((el) => parseBlock(el as HTMLElement))
    .filter(Boolean) as Block[];

export const htmlToDocument = (html: string): RichTextDocument => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(`<body>${html}</body>`, 'text/html');
  const body = dom.body;

  const children = parseChildren(body);

  return {
    type: 'doc',
    version: 1,
    // A doc must have at least one block (schema `block+`). Empty input must still yield an
    // empty paragraph so the editor has a textblock node for the placeholder decoration to
    // attach to — otherwise the placeholder is missing on an untouched empty editor.
    children: children.length
      ? children
      : [{ type: 'paragraph', children: [] }],
  };
};
