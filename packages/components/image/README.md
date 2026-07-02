# @synerise/ds-image

Image components for the Synerise Design System: inline **thumbnails**, a
**gallery** of thumbnails with uniform sizing, and a full-screen **preview**
(lightbox) with zoom, pan and navigation.

## Installation

```bash
pnpm add @synerise/ds-image
```

## Exports

- `Thumbnail` — a single image tile (aspect ratio, size, background, object-fit,
  Empty state, broken-image fallback, optional delete-on-hover).
- `Gallery` — many thumbnails sharing the same visual settings; clicking one opens
  the preview at that image.
- `ImagePreview` — a controlled full-screen lightbox with a bottom-center toolbar
  (navigation `‹ N of M ›` + zoom/fullscreen).
- `useImagePreview` — open/close/next/prev state so the preview can be triggered
  from any element (a list row, a button, a table cell).

## Usage

```tsx
import { Gallery, ImagePreview, Thumbnail, useImagePreview } from '@synerise/ds-image';

const images = [
  { src: '/a.jpg', alt: 'A' },
  { src: '/b.jpg', alt: 'B' },
];

// A single thumbnail
<Thumbnail src="/a.jpg" alt="A" aspectRatio="1:1" size="m" objectFit="cover" />;

// A gallery — settings apply to every thumbnail; clicking opens the preview
<Gallery images={images} aspectRatio="1:1" size="s" background="subtle-grey" objectFit="cover" />;

// Preview triggered from an arbitrary element
const Example = () => {
  const preview = useImagePreview(images);
  return (
    <>
      <button type="button" onClick={() => preview.open(0)}>
        Open
      </button>
      <ImagePreview {...preview.previewProps} />
    </>
  );
};
```

See the Storybook overview page for full props tables, behavior notes, and
accessibility guidance.
