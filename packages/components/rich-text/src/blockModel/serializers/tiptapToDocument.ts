import type {
  Block,
  HeadingLevel,
  InlineNode,
  LinkMark,
  Mark,
  PMMark,
  PMNode,
  RichTextDocument,
  TableCellBlock,
  TableHeaderBlock,
  TableRowBlock,
  TextAlign,
} from '../blockModel.types';

const SIMPLE_MARK_TYPES = new Set([
  'bold',
  'italic',
  'underline',
  'strike',
  'code',
]);

const convertMark = (pm: PMMark): Mark | null => {
  if (SIMPLE_MARK_TYPES.has(pm.type)) {
    return { type: pm.type } as Mark;
  }

  if (pm.type === 'link') {
    const link: LinkMark = {
      type: 'link',
      href: pm.attrs?.href as string,
    };
    if (pm.attrs?.target) {
      link.target = pm.attrs.target as string;
    }
    if (pm.attrs?.rel) {
      link.rel = pm.attrs.rel as string;
    }
    return link;
  }

  return null;
};

const convertInlineNode = (pm: PMNode): InlineNode | null => {
  if (pm.type === 'text' && pm.text) {
    const marks = pm.marks?.map(convertMark).filter(Boolean) as
      | Mark[]
      | undefined;
    const node: InlineNode = { type: 'text', text: pm.text };
    if (marks && marks.length > 0) {
      (node as { marks: Mark[] }).marks = marks;
    }
    return node;
  }

  if (pm.type === 'hardBreak') {
    return { type: 'hardBreak' };
  }

  return null;
};

const convertBlock = (pm: PMNode): Block | null => {
  switch (pm.type) {
    case 'paragraph': {
      const children = (pm.content || [])
        .map(convertInlineNode)
        .filter(Boolean) as InlineNode[];
      const textAlign = pm.attrs?.textAlign as TextAlign | undefined;
      if (textAlign) {
        return { type: 'paragraph', attrs: { textAlign }, children };
      }
      return { type: 'paragraph', children };
    }

    case 'heading': {
      const children = (pm.content || [])
        .map(convertInlineNode)
        .filter(Boolean) as InlineNode[];
      const level = ((pm.attrs?.level as number) || 1) as HeadingLevel;
      const textAlign = pm.attrs?.textAlign as TextAlign | undefined;
      if (textAlign) {
        return { type: 'heading', attrs: { level, textAlign }, children };
      }
      return { type: 'heading', attrs: { level }, children };
    }

    case 'codeBlock': {
      const children = (pm.content || [])
        .map(convertInlineNode)
        .filter(Boolean) as InlineNode[];
      const language = pm.attrs?.language as string | undefined;
      if (language) {
        return { type: 'codeBlock', attrs: { language }, children };
      }
      return { type: 'codeBlock', children };
    }

    case 'codeSnippet': {
      const children = (pm.content || [])
        .map(convertInlineNode)
        .filter(Boolean) as InlineNode[];
      return { type: 'codeSnippet', children };
    }

    case 'image': {
      const attrs: { src: string; alt?: string; title?: string } = {
        src: pm.attrs?.src as string,
      };
      if (pm.attrs?.alt) {
        attrs.alt = pm.attrs.alt as string;
      }
      if (pm.attrs?.title) {
        attrs.title = pm.attrs.title as string;
      }
      return { type: 'image', attrs };
    }

    case 'bulletList':
      return {
        type: 'bulletList',
        children: (pm.content || [])
          .filter((n) => n.type === 'listItem')
          .map((li) => ({
            type: 'listItem' as const,
            children: (li.content || [])
              .map(convertBlock)
              .filter(Boolean) as Block[],
          })),
      };

    case 'orderedList': {
      const start = pm.attrs?.start as number | undefined;
      const block: Block = {
        type: 'orderedList',
        children: (pm.content || [])
          .filter((n) => n.type === 'listItem')
          .map((li) => ({
            type: 'listItem' as const,
            children: (li.content || [])
              .map(convertBlock)
              .filter(Boolean) as Block[],
          })),
      };
      if (start && start !== 1) {
        (block as { attrs: { start: number } }).attrs = { start };
      }
      return block;
    }

    case 'blockquote':
      return {
        type: 'blockquote',
        children: (pm.content || [])
          .map(convertBlock)
          .filter(Boolean) as Block[],
      };

    case 'horizontalRule':
      return { type: 'horizontalRule' };

    case 'table':
      return {
        type: 'table',
        children: (pm.content || [])
          .filter((row) => row.type === 'tableRow')
          .map(
            (row): TableRowBlock => ({
              type: 'tableRow',
              children: (row.content || [])
                .filter(
                  (cell) =>
                    cell.type === 'tableCell' || cell.type === 'tableHeader',
                )
                .map((cell) => {
                  const span: { colspan?: number; rowspan?: number } = {};
                  if (
                    typeof cell.attrs?.colspan === 'number' &&
                    cell.attrs.colspan > 1
                  ) {
                    span.colspan = cell.attrs.colspan;
                  }
                  if (
                    typeof cell.attrs?.rowspan === 'number' &&
                    cell.attrs.rowspan > 1
                  ) {
                    span.rowspan = cell.attrs.rowspan;
                  }
                  return {
                    type: cell.type as 'tableCell' | 'tableHeader',
                    ...(Object.keys(span).length && { attrs: span }),
                    children: (cell.content || [])
                      .map(convertBlock)
                      .filter(Boolean) as Block[],
                  } as TableCellBlock | TableHeaderBlock;
                }),
            }),
          ),
      };

    default:
      return null;
  }
};

export const tiptapJsonToDocument = (json: PMNode): RichTextDocument => ({
  type: 'doc',
  version: 1,
  children: (json.content || []).map(convertBlock).filter(Boolean) as Block[],
});
