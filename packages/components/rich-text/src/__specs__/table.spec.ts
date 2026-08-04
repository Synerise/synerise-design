import { describe, it, expect } from 'vitest';

import {
  type RichTextDocument,
  documentToHtml,
  documentToMarkdown,
  documentToTiptapJson,
  htmlToDocument,
  markdownToDocument,
  tiptapJsonToDocument,
} from '../blockModel';

const cell = (text: string, header = false) =>
  ({
    type: header ? ('tableHeader' as const) : ('tableCell' as const),
    children: [{ type: 'paragraph' as const, children: [{ type: 'text' as const, text }] }],
  });

const doc: RichTextDocument = {
  type: 'doc',
  version: 1,
  children: [
    {
      type: 'table',
      children: [
        { type: 'tableRow', children: [cell('A', true), cell('B', true)] },
        { type: 'tableRow', children: [cell('1'), cell('2')] },
      ],
    },
  ],
};

describe('table serialization', () => {
  it('serializes to an HTML table and round-trips', () => {
    const html = documentToHtml(doc);
    expect(html).toContain('<table>');
    expect(html).toContain('<th><p>A</p></th>');
    expect(html).toContain('<td><p>1</p></td>');
    const parsed = htmlToDocument(html);
    expect(parsed.children[0]).toEqual(doc.children[0]);
  });

  it('round-trips through the Tiptap JSON bridge', () => {
    const pm = documentToTiptapJson(doc);
    expect(pm.content?.[0].type).toBe('table');
    expect(tiptapJsonToDocument(pm).children[0]).toEqual(doc.children[0]);
  });

  it('serializes to a GFM markdown table', () => {
    expect(documentToMarkdown(doc)).toBe('| A | B |\n| --- | --- |\n| 1 | 2 |');
  });

  it('parses a GFM markdown table back into a table block', () => {
    const parsed = markdownToDocument('| A | B |\n| --- | --- |\n| 1 | 2 |');
    expect(parsed.children[0].type).toBe('table');
  });
});
