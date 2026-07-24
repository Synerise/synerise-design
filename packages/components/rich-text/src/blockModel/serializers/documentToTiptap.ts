import type {
  Block,
  InlineNode,
  Mark,
  PMNode,
  RichTextDocument,
} from '../blockModel.types';

const convertMark = (
  mark: Mark,
): { type: string; attrs?: Record<string, unknown> } => {
  if (mark.type === 'link') {
    return {
      type: 'link',
      attrs: {
        href: mark.href,
        ...(mark.target && { target: mark.target }),
        ...(mark.rel && { rel: mark.rel }),
      },
    };
  }

  return { type: mark.type };
};

const convertInlineNode = (node: InlineNode): PMNode => {
  if (node.type === 'hardBreak') {
    return { type: 'hardBreak' };
  }

  return {
    type: 'text',
    text: node.text,
    ...(node.marks?.length && { marks: node.marks.map(convertMark) }),
  };
};

const convertBlock = (block: Block): PMNode => {
  switch (block.type) {
    case 'paragraph':
      return {
        type: 'paragraph',
        ...(block.attrs?.textAlign && {
          attrs: { textAlign: block.attrs.textAlign },
        }),
        content: block.children.map(convertInlineNode),
      };

    case 'heading':
      return {
        type: 'heading',
        attrs: {
          level: block.attrs.level,
          ...(block.attrs.textAlign && { textAlign: block.attrs.textAlign }),
        },
        content: block.children.map(convertInlineNode),
      };

    case 'codeBlock':
      return {
        type: 'codeBlock',
        ...(block.attrs?.language && {
          attrs: { language: block.attrs.language },
        }),
        content: block.children.map(convertInlineNode),
      };

    case 'codeSnippet':
      return {
        type: 'codeSnippet',
        content: block.children.map(convertInlineNode),
      };

    case 'image':
      return {
        type: 'image',
        attrs: { ...block.attrs },
      };

    case 'bulletList':
      return {
        type: 'bulletList',
        content: block.children.map((li) => ({
          type: 'listItem',
          content: li.children.map(convertBlock),
        })),
      };

    case 'orderedList':
      return {
        type: 'orderedList',
        ...(block.attrs?.start && { attrs: { start: block.attrs.start } }),
        content: block.children.map((li) => ({
          type: 'listItem',
          content: li.children.map(convertBlock),
        })),
      };

    case 'blockquote':
      return {
        type: 'blockquote',
        content: block.children.map(convertBlock),
      };

    case 'horizontalRule':
      return { type: 'horizontalRule' };

    case 'table':
      return {
        type: 'table',
        content: block.children.map((row) => ({
          type: 'tableRow',
          content: row.children.map((cell) => ({
            type: cell.type,
            ...(cell.attrs && { attrs: { ...cell.attrs } }),
            content: cell.children.map(convertBlock),
          })),
        })),
      };
  }
};

export const documentToTiptapJson = (doc: RichTextDocument): PMNode => ({
  type: 'doc',
  content: doc.children.map(convertBlock),
});
