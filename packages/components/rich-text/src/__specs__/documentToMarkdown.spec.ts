import { describe, it, expect } from 'vitest';

import { type RichTextDocument, documentToMarkdown } from '../blockModel';

describe('documentToMarkdown', () => {
  it('serializes headings, paragraphs and inline marks', () => {
    const doc: RichTextDocument = {
      type: 'doc',
      version: 1,
      children: [
        { type: 'heading', attrs: { level: 1 }, children: [{ type: 'text', text: 'Title' }] },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
            { type: 'text', text: ' and ' },
            { type: 'text', text: 'strike', marks: [{ type: 'strike' }] },
          ],
        },
      ],
    };
    expect(documentToMarkdown(doc)).toBe('# Title\n\n**bold** and ~~strike~~');
  });

  it('serializes a single-line code snippet as inline code', () => {
    const doc: RichTextDocument = {
      type: 'doc',
      version: 1,
      children: [{ type: 'codeSnippet', children: [{ type: 'text', text: 'npm i' }] }],
    };
    expect(documentToMarkdown(doc)).toBe('`npm i`');
  });

  it('serializes lists and links', () => {
    const doc: RichTextDocument = {
      type: 'doc',
      version: 1,
      children: [
        {
          type: 'bulletList',
          children: [
            {
              type: 'listItem',
              children: [{ type: 'paragraph', children: [{ type: 'text', text: 'one' }] }],
            },
            {
              type: 'listItem',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'link',
                      marks: [{ type: 'link', href: 'https://x.io' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    expect(documentToMarkdown(doc)).toBe('- one\n- [link](https://x.io)');
  });
});
