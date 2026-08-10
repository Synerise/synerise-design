import { describe, it, expect } from 'vitest';

import {
  type RichTextDocument,
  documentToHtml,
  documentToMarkdown,
  markdownToDocument,
} from '../blockModel';

describe('markdown ↔ document', () => {
  it('round-trips headings, marks, lists and links', () => {
    const md = ['# Title', '', '**bold** and ~~strike~~', '', '- one', '- [link](https://x.io)'].join(
      '\n',
    );
    const doc = markdownToDocument(md);
    expect(documentToMarkdown(doc)).toBe(md);
  });

  it('parses markdown into the block model', () => {
    const doc: RichTextDocument = markdownToDocument('## Subtitle');
    expect(doc.children[0]).toEqual({
      type: 'heading',
      attrs: { level: 2 },
      children: [{ type: 'text', text: 'Subtitle' }],
    });
  });

  it('drops dangerous tags — no <script> survives serialization', () => {
    const doc = markdownToDocument('hello <script>alert(1)</script>');
    // The <script> element is not mapped into the block model, so re-serializing
    // produces no executable markup (any leaked text is escaped, not executed).
    expect(documentToHtml(doc)).not.toContain('<script');
  });
});
