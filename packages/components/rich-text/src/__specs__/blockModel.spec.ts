import { describe, it, expect } from 'vitest';

import type { RichTextDocument, PMNode } from '../blockModel';
import {
  tiptapJsonToDocument,
  documentToTiptapJson,
  documentToHtml,
  htmlToDocument,
} from '../blockModel';

const sampleDocument: RichTextDocument = {
  type: 'doc',
  version: 1,
  children: [
    {
      type: 'heading',
      attrs: { level: 2 },
      children: [{ type: 'text', text: 'Hello World' }],
    },
    {
      type: 'paragraph',
      children: [
        { type: 'text', text: 'Normal text, ' },
        { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
        { type: 'text', text: ' and ' },
        { type: 'text', text: 'italic', marks: [{ type: 'italic' }] },
      ],
    },
    {
      type: 'bulletList',
      children: [
        {
          type: 'listItem',
          children: [
            { type: 'paragraph', children: [{ type: 'text', text: 'Item 1' }] },
          ],
        },
        {
          type: 'listItem',
          children: [
            { type: 'paragraph', children: [{ type: 'text', text: 'Item 2' }] },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text: 'a link',
          marks: [{ type: 'link', href: 'https://example.com', target: '_blank', rel: 'noopener noreferrer' }],
        },
      ],
    },
    {
      type: 'image',
      attrs: { src: 'https://example.com/img.png', alt: 'sample' },
    },
    {
      type: 'codeBlock',
      children: [{ type: 'text', text: 'const x = 1;' }],
    },
  ],
};

const samplePMJson: PMNode = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Hello World' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Normal text, ' },
        { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
        { type: 'text', text: ' and ' },
        { type: 'text', text: 'italic', marks: [{ type: 'italic' }] },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: 'Item 1' }] },
          ],
        },
        {
          type: 'listItem',
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: 'Item 2' }] },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'a link',
          marks: [{ type: 'link', attrs: { href: 'https://example.com', target: '_blank', rel: 'noopener noreferrer' } }],
        },
      ],
    },
    {
      type: 'image',
      attrs: { src: 'https://example.com/img.png', alt: 'sample' },
    },
    {
      type: 'codeBlock',
      content: [{ type: 'text', text: 'const x = 1;' }],
    },
  ],
};

describe('Block Model Serializers', () => {
  describe('tiptapJsonToDocument', () => {
    it('converts ProseMirror JSON to RichTextDocument', () => {
      const doc = tiptapJsonToDocument(samplePMJson);
      expect(doc.type).toBe('doc');
      expect(doc.version).toBe(1);
      expect(doc.children).toHaveLength(6);
      expect(doc.children[0]).toEqual(sampleDocument.children[0]);
    });

    it('converts marks correctly', () => {
      const doc = tiptapJsonToDocument(samplePMJson);
      const paragraph = doc.children[1];
      if (paragraph.type !== 'paragraph') throw new Error('Expected paragraph');
      expect(paragraph.children[1]).toEqual({ type: 'text', text: 'bold', marks: [{ type: 'bold' }] });
    });

    it('converts link marks with attrs', () => {
      const doc = tiptapJsonToDocument(samplePMJson);
      const paragraph = doc.children[3];
      if (paragraph.type !== 'paragraph') throw new Error('Expected paragraph');
      const textNode = paragraph.children[0];
      if (textNode.type !== 'text') throw new Error('Expected text');
      expect(textNode.marks).toEqual([
        { type: 'link', href: 'https://example.com', target: '_blank', rel: 'noopener noreferrer' },
      ]);
    });

    it('converts image blocks', () => {
      const doc = tiptapJsonToDocument(samplePMJson);
      expect(doc.children[4]).toEqual({
        type: 'image',
        attrs: { src: 'https://example.com/img.png', alt: 'sample' },
      });
    });
  });

  describe('documentToTiptapJson', () => {
    it('converts RichTextDocument to ProseMirror JSON', () => {
      const pm = documentToTiptapJson(sampleDocument);
      expect(pm.type).toBe('doc');
      expect(pm.content).toHaveLength(6);
    });

    it('roundtrip: document → tiptap → document preserves structure', () => {
      const pm = documentToTiptapJson(sampleDocument);
      const doc = tiptapJsonToDocument(pm);
      expect(doc).toEqual(sampleDocument);
    });
  });

  describe('documentToHtml', () => {
    it('serializes heading', () => {
      const html = documentToHtml({
        type: 'doc',
        version: 1,
        children: [{ type: 'heading', attrs: { level: 2 }, children: [{ type: 'text', text: 'Title' }] }],
      });
      expect(html).toBe('<h2>Title</h2>');
    });

    it('serializes paragraph with marks', () => {
      const html = documentToHtml({
        type: 'doc',
        version: 1,
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'hello ' },
              { type: 'text', text: 'world', marks: [{ type: 'bold' }] },
            ],
          },
        ],
      });
      expect(html).toBe('<p>hello <strong>world</strong></p>');
    });

    it('serializes lists', () => {
      const html = documentToHtml({
        type: 'doc',
        version: 1,
        children: [
          {
            type: 'bulletList',
            children: [
              { type: 'listItem', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'A' }] }] },
            ],
          },
        ],
      });
      expect(html).toBe('<ul><li><p>A</p></li></ul>');
    });

    it('serializes image', () => {
      const html = documentToHtml({
        type: 'doc',
        version: 1,
        children: [{ type: 'image', attrs: { src: 'img.png', alt: 'test' } }],
      });
      expect(html).toBe('<img src="img.png" alt="test">');
    });

    it('escapes HTML in text', () => {
      const html = documentToHtml({
        type: 'doc',
        version: 1,
        children: [{ type: 'paragraph', children: [{ type: 'text', text: '<script>alert("xss")</script>' }] }],
      });
      expect(html).toContain('&lt;script&gt;');
    });

    it('strips dangerous link hrefs (javascript:) to prevent XSS', () => {
      const html = documentToHtml({
        type: 'doc',
        version: 1,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'click',
                // eslint-disable-next-line no-script-url
                marks: [{ type: 'link', href: 'javascript:alert(1)' }],
              },
            ],
          },
        ],
      });
      expect(html).not.toContain('javascript:');
      expect(html).toContain('href=""');
    });
  });

  describe('htmlToDocument', () => {
    it('parses simple HTML', () => {
      const doc = htmlToDocument('<p>Hello</p>');
      expect(doc.type).toBe('doc');
      expect(doc.version).toBe(1);
      expect(doc.children).toHaveLength(1);
      expect(doc.children[0]).toEqual({
        type: 'paragraph',
        children: [{ type: 'text', text: 'Hello' }],
      });
    });

    it('parses marks', () => {
      const doc = htmlToDocument('<p><strong>bold</strong> and <em>italic</em></p>');
      const p = doc.children[0];
      if (p.type !== 'paragraph') throw new Error('Expected paragraph');
      expect(p.children).toHaveLength(3);
      expect(p.children[0]).toEqual({ type: 'text', text: 'bold', marks: [{ type: 'bold' }] });
      expect(p.children[2]).toEqual({ type: 'text', text: 'italic', marks: [{ type: 'italic' }] });
    });

    it('parses headings', () => {
      const doc = htmlToDocument('<h2>Title</h2>');
      expect(doc.children[0]).toEqual({
        type: 'heading',
        attrs: { level: 2 },
        children: [{ type: 'text', text: 'Title' }],
      });
    });

    it('parses links', () => {
      const doc = htmlToDocument('<p><a href="https://example.com" target="_blank">click</a></p>');
      const p = doc.children[0];
      if (p.type !== 'paragraph') throw new Error('Expected paragraph');
      expect(p.children[0]).toEqual({
        type: 'text',
        text: 'click',
        marks: [{ type: 'link', href: 'https://example.com', target: '_blank' }],
      });
    });

    it('strips dangerous link hrefs while keeping the text', () => {
      const doc = htmlToDocument(
        '<p><a href="javascript:alert(1)">click</a></p>',
      );
      const p = doc.children[0];
      if (p.type !== 'paragraph') throw new Error('Expected paragraph');
      expect(p.children[0]).toEqual({
        type: 'text',
        text: 'click',
        marks: [{ type: 'link', href: '' }],
      });
    });

    it('parses images', () => {
      const doc = htmlToDocument('<img src="img.png" alt="test">');
      expect(doc.children[0]).toEqual({
        type: 'image',
        attrs: { src: 'img.png', alt: 'test' },
      });
    });
  });
});
