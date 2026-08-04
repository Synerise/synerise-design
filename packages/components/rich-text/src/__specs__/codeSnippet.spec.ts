import { describe, it, expect } from 'vitest';

import {
  type RichTextDocument,
  documentToHtml,
  documentToTiptapJson,
  htmlToDocument,
  tiptapJsonToDocument,
} from '../blockModel';

const doc: RichTextDocument = {
  type: 'doc',
  version: 1,
  children: [
    { type: 'codeSnippet', children: [{ type: 'text', text: 'Some singleline code' }] },
  ],
};

describe('codeSnippet serialization', () => {
  it('serializes to a tagged <pre> so it is distinct from codeBlock', () => {
    const html = documentToHtml(doc);
    expect(html).toBe(
      '<pre data-type="code-snippet"><code>Some singleline code</code></pre>',
    );
  });

  it('round-trips HTML → document → HTML', () => {
    const html = documentToHtml(doc);
    const parsed = htmlToDocument(html);
    expect(parsed.children[0]).toEqual(doc.children[0]);
    expect(documentToHtml(parsed)).toBe(html);
  });

  it('keeps a plain <pre> as codeBlock (not codeSnippet)', () => {
    const parsed = htmlToDocument('<pre><code>plain</code></pre>');
    expect(parsed.children[0].type).toBe('codeBlock');
  });

  it('round-trips through the Tiptap JSON bridge', () => {
    const pm = documentToTiptapJson(doc);
    expect(pm.content?.[0].type).toBe('codeSnippet');
    const back = tiptapJsonToDocument(pm);
    expect(back.children[0]).toEqual(doc.children[0]);
  });
});
