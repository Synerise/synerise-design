import MarkdownIt from 'markdown-it';

import type { RichTextDocument } from '../blockModel.types';
import { htmlToDocument } from './htmlToDocument';

// `html: true` lets inline HTML emitted by documentToMarkdown (e.g. `<u>` for underline,
// which CommonMark cannot express) round-trip back. `htmlToDocument` is the security
// boundary: it only maps a known whitelist of tags and never executes anything.
const markdown = new MarkdownIt({ html: true, linkify: true, breaks: false });

/**
 * Parse a Markdown string into a `RichTextDocument` by rendering it to HTML with
 * markdown-it and reusing the existing `htmlToDocument` parser.
 *
 * Note: Markdown has no single-line code-snippet concept, so a `codeSnippet` block
 * serialized to `` `code` `` parses back as an inline-code paragraph, and a fenced block
 * parses back as a multi-line `codeBlock`.
 */
export const markdownToDocument = (md: string): RichTextDocument =>
  htmlToDocument(markdown.render(md ?? ''));
