import MarkdownIt from 'markdown-it';

const savedValueParser = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: false,
});

// Pasted text is never HTML: `<Key<T>>` or an XML snippet must be shown as typed.
const pastedTextParser = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
});

/**
 * Converts markdown to HTML for the editor to read, both when a value loads and when text is pasted.
 * Pass `allowHtml: false` for pasted text, so tags in it stay text.
 */
export const markdownToHtml = (
  value: string,
  { allowHtml = true }: { allowHtml?: boolean } = {},
): string =>
  (allowHtml ? savedValueParser : pastedTextParser)
    .render(value)
    // markdown-it ends every code block with a newline; kept, it would add an empty line on each save.
    .replace(/\n<\/code><\/pre>/g, '</code></pre>');
