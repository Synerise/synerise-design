import type {
  Block,
  InlineNode,
  ListItemBlock,
  Mark,
  RichTextDocument,
  TableCellBlock,
  TableHeaderBlock,
} from '../blockModel.types';

const serializeMark = (mark: Mark, inner: string): string => {
  switch (mark.type) {
    case 'bold':
      return `**${inner}**`;
    case 'italic':
      return `*${inner}*`;
    case 'underline':
      // CommonMark has no underline — fall back to inline HTML (GFM-compatible).
      return `<u>${inner}</u>`;
    case 'strike':
      return `~~${inner}~~`;
    case 'code':
      return `\`${inner}\``;
    case 'link':
      return `[${inner}](${mark.href})`;
  }
};

const serializeInline = (node: InlineNode): string => {
  if (node.type === 'hardBreak') {
    return '  \n';
  }
  let text = node.text;
  if (node.marks) {
    for (const mark of node.marks) {
      text = serializeMark(mark, text);
    }
  }
  return text;
};

const serializeInlines = (children: InlineNode[]): string =>
  children.map(serializeInline).join('');

const indentLines = (text: string, indent: string): string =>
  text
    .split('\n')
    .map((line) => (line ? indent + line : line))
    .join('\n');

const serializeListItem = (
  item: ListItemBlock,
  marker: string,
  indent: string,
): string => {
  const [first, ...rest] = item.children;
  const firstText = first ? serializeBlock(first) : '';
  const continuation = indent + ' '.repeat(marker.length);

  let line = `${indent}${marker}${firstText}`;
  for (const child of rest) {
    line += `\n${indentLines(serializeBlock(child), continuation)}`;
  }
  return line;
};

const serializeBlock = (block: Block, indent = ''): string => {
  switch (block.type) {
    case 'paragraph':
      return serializeInlines(block.children);

    case 'heading':
      return `${'#'.repeat(block.attrs.level)} ${serializeInlines(block.children)}`;

    case 'codeBlock':
      return `\`\`\`\n${serializeInlines(block.children)}\n\`\`\``;

    case 'codeSnippet':
      return `\`${serializeInlines(block.children)}\``;

    case 'image':
      return `![${block.attrs.alt ?? ''}](${block.attrs.src})`;

    case 'bulletList':
      return block.children
        .map((li) => serializeListItem(li, '- ', indent))
        .join('\n');

    case 'orderedList': {
      const start = block.attrs?.start ?? 1;
      return block.children
        .map((li, i) => serializeListItem(li, `${start + i}. `, indent))
        .join('\n');
    }

    case 'blockquote':
      return block.children
        .map((child) => indentLines(serializeBlock(child), '> '))
        .join('\n>\n');

    case 'horizontalRule':
      return '---';

    case 'table': {
      const rows = block.children;
      if (rows.length === 0) {
        return '';
      }
      // GFM tables are header + separator + body, with single-line inline cells.
      const renderRow = (
        cells: (TableCellBlock | TableHeaderBlock)[],
      ): string => `| ${cells.map(cellToMarkdown).join(' | ')} |`;
      const colCount = rows[0].children.length;
      const header = renderRow(rows[0].children);
      const separator = `| ${Array(colCount).fill('---').join(' | ')} |`;
      const body = rows.slice(1).map((row) => renderRow(row.children));
      return [header, separator, ...body].join('\n');
    }
  }
};

const cellToMarkdown = (cell: TableCellBlock | TableHeaderBlock): string =>
  cell.children
    .map((child) => serializeBlock(child))
    .join(' ')
    .replace(/\n+/g, ' ')
    .replace(/\|/g, '\\|')
    .trim();

export const documentToMarkdown = (doc: RichTextDocument): string =>
  doc.children.map((block) => serializeBlock(block)).join('\n\n');
