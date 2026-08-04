import { sanitizeUrl } from '../../utils/sanitizeUrl';
import type {
  Block,
  InlineNode,
  Mark,
  RichTextDocument,
  TableCellBlock,
  TableHeaderBlock,
  TableRowBlock,
  TextAlign,
} from '../blockModel.types';

const escapeHtml = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const serializeMark = (mark: Mark, inner: string): string => {
  switch (mark.type) {
    case 'bold':
      return `<strong>${inner}</strong>`;
    case 'italic':
      return `<em>${inner}</em>`;
    case 'underline':
      return `<u>${inner}</u>`;
    case 'strike':
      return `<s>${inner}</s>`;
    case 'code':
      return `<code>${inner}</code>`;
    case 'link': {
      // Strip javascript:/data:/… so serialized HTML can't carry a script href,
      // symmetric with the renderer's renderMark.
      const attrs = [`href="${escapeHtml(sanitizeUrl(mark.href))}"`];
      if (mark.target) {
        attrs.push(`target="${escapeHtml(mark.target)}"`);
      }
      if (mark.rel) {
        attrs.push(`rel="${escapeHtml(mark.rel)}"`);
      }
      return `<a ${attrs.join(' ')}>${inner}</a>`;
    }
  }
};

const serializeInline = (node: InlineNode): string => {
  if (node.type === 'hardBreak') {
    return '<br>';
  }
  let html = escapeHtml(node.text);
  if (node.marks) {
    for (const mark of node.marks) {
      html = serializeMark(mark, html);
    }
  }
  return html;
};

const alignAttr = (textAlign?: TextAlign): string =>
  textAlign ? ` style="text-align: ${textAlign}"` : '';

const serializeBlock = (block: Block): string => {
  switch (block.type) {
    case 'paragraph': {
      const inner = block.children.map(serializeInline).join('');
      return `<p${alignAttr(block.attrs?.textAlign)}>${inner}</p>`;
    }

    case 'heading': {
      const tag = `h${block.attrs.level}`;
      const inner = block.children.map(serializeInline).join('');
      return `<${tag}${alignAttr(block.attrs.textAlign)}>${inner}</${tag}>`;
    }

    case 'codeBlock': {
      const inner = block.children.map(serializeInline).join('');
      return `<pre><code>${inner}</code></pre>`;
    }

    case 'codeSnippet': {
      const inner = block.children.map(serializeInline).join('');
      return `<pre data-type="code-snippet"><code>${inner}</code></pre>`;
    }

    case 'image': {
      const attrs = [`src="${escapeHtml(block.attrs.src)}"`];
      if (block.attrs.alt) {
        attrs.push(`alt="${escapeHtml(block.attrs.alt)}"`);
      }
      if (block.attrs.title) {
        attrs.push(`title="${escapeHtml(block.attrs.title)}"`);
      }
      return `<img ${attrs.join(' ')}>`;
    }

    case 'bulletList':
      return `<ul>${block.children.map((li) => `<li>${li.children.map(serializeBlock).join('')}</li>`).join('')}</ul>`;

    case 'orderedList': {
      const startAttr =
        block.attrs?.start && block.attrs.start !== 1
          ? ` start="${block.attrs.start}"`
          : '';
      return `<ol${startAttr}>${block.children.map((li) => `<li>${li.children.map(serializeBlock).join('')}</li>`).join('')}</ol>`;
    }

    case 'blockquote':
      return `<blockquote>${block.children.map(serializeBlock).join('')}</blockquote>`;

    case 'horizontalRule':
      return '<hr>';

    case 'table':
      return `<table><tbody>${block.children.map(serializeRow).join('')}</tbody></table>`;
  }
};

const spanAttrs = (cell: TableCellBlock | TableHeaderBlock): string => {
  const attrs: string[] = [];
  if (cell.attrs?.colspan && cell.attrs.colspan !== 1) {
    attrs.push(`colspan="${cell.attrs.colspan}"`);
  }
  if (cell.attrs?.rowspan && cell.attrs.rowspan !== 1) {
    attrs.push(`rowspan="${cell.attrs.rowspan}"`);
  }
  return attrs.length ? ` ${attrs.join(' ')}` : '';
};

const serializeCell = (cell: TableCellBlock | TableHeaderBlock): string => {
  const tag = cell.type === 'tableHeader' ? 'th' : 'td';
  return `<${tag}${spanAttrs(cell)}>${cell.children.map(serializeBlock).join('')}</${tag}>`;
};

const serializeRow = (row: TableRowBlock): string =>
  `<tr>${row.children.map(serializeCell).join('')}</tr>`;

export const documentToHtml = (doc: RichTextDocument): string =>
  doc.children.map(serializeBlock).join('');
