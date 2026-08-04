---
id: rich-text-renderer
title: RichTextRenderer
---

RichTextRenderer UI Component — renders a `RichTextDocument` to React without any editor dependency. Weighs ~1 KB gzip.

## Installation

```
npm i @synerise/ds-rich-text-renderer
or
yarn add @synerise/ds-rich-text-renderer
```

## Usage

### Basic

```tsx
import RichTextRenderer from '@synerise/ds-rich-text-renderer';

<RichTextRenderer document={article.bodyJson} />
```

### Custom block rendering

Use `blockOverrides` to replace how specific block types are rendered — for example, replacing `<img>` with a Next.js `<Image>` component:

```tsx
import RichTextRenderer from '@synerise/ds-rich-text-renderer';
import Image from 'next/image';

const CustomImage = ({ block }) => (
  <Image
    src={block.attrs.src}
    alt={block.attrs.alt ?? ''}
    width={800}
    height={400}
    loading="lazy"
  />
);

<RichTextRenderer
  document={article.bodyJson}
  blockOverrides={{ image: CustomImage }}
/>
```

### Using individual render functions

For advanced use cases, import the building blocks directly:

```tsx
import { renderBlock, renderInline, renderMark } from '@synerise/ds-rich-text-renderer';

// Render a single block
const element = renderBlock(block, 0);

// Render inline content
const inline = renderInline(textNode, 0);
```

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| document | The `RichTextDocument` to render | `RichTextDocument` | **required** |
| className | CSS class on the wrapper element | `string` | - |
| style | Inline styles on the wrapper element | `CSSProperties` | - |
| blockOverrides | Override rendering per block type | `Partial<Record<Block['type'], ComponentType<BlockOverrideProps>>>` | - |

### BlockOverrideProps

Props passed to custom block renderers:

| Property | Description | Type |
| --- | --- | --- |
| block | The block node to render | `Block` |

### Supported block types

| Block type | Renders as |
| --- | --- |
| `paragraph` | `<p>` |
| `heading` | `<h1>` – `<h6>` |
| `bulletList` | `<ul>` |
| `orderedList` | `<ol>` |
| `codeBlock` | `<pre><code>` |
| `image` | `<img>` |
| `blockquote` | `<blockquote>` |
| `horizontalRule` | `<hr>` |

### Supported mark types

| Mark type | Renders as |
| --- | --- |
| `bold` | `<strong>` |
| `italic` | `<em>` |
| `underline` | `<u>` |
| `strike` | `<s>` |
| `code` | `<code>` |
| `link` | `<a>` |

## Styling

The renderer applies the same typography styles as the `@synerise/ds-rich-text` editor (headings, paragraphs, lists, links, code blocks, images, blockquotes) using design system tokens via `styled-components`. This ensures visual parity between editing and read-only rendering.

## Related

- [`@synerise/ds-rich-text`](../rich-text/README.md) — the WYSIWYG editor component
