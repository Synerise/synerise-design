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

## API

### Thumbnail

| Property    | Description                                                                       | Type                             | Default   |
| ----------- | --------------------------------------------------------------------------------- | -------------------------------- | --------- |
| src         | Image source URL. Omit it to render the Empty state.                              | string                           | ---       |
| alt         | Alternative text. Required for accessibility.                                     | string                           | ---       |
| aspectRatio | Aspect ratio of the tile. `source` keeps the image's intrinsic ratio.             | '1:1' / '4:3' / '16:9' / 'source' | `'1:1'`   |
| size        | Height token. `custom` defers to `height`.                                        | 'custom' / 'xxs' … 'xxl'         | `'m'`     |
| height      | Explicit height in px, used when `size` is `custom`.                              | number                           | ---       |
| background  | Tile backdrop.                                                                    | 'none' / 'subtle-grey'           | `'none'`  |
| objectFit   | How the image fills the tile.                                                     | 'contain' / 'cover'              | `'contain'` |
| loading     | Native loading hint.                                                              | 'lazy' / 'eager'                 | `'lazy'`  |
| deletable   | Show a delete affordance on hover / focus.                                        | boolean                          | `false`   |
| onDelete    | Called when the delete affordance is activated.                                   | () => void                       | ---       |
| openZoom    | Render the tile as an interactive trigger (e.g. opens a preview).                 | boolean                          | `false`   |
| onClick     | Click handler, fired for mouse and keyboard (Enter / Space) activation.           | (event: MouseEvent) => void      | ---       |
| fallback    | Rendered when the image fails to load.                                            | React.ReactNode                  | broken-image box |
| texts       | Override the delete tooltip / accessible label.                                   | Partial&lt;ImageTexts&gt;        | DS translations |
| className   | Class applied to the tile.                                                        | string                           | ---       |

Every value except `src`, `alt`, `onDelete` and `onClick` falls back to the
enclosing `Gallery` before the default listed above.

### Gallery

| Property                                          | Description                                                   | Type                        | Default |
| ------------------------------------------------- | ------------------------------------------------------------- | --------------------------- | ------- |
| images                                            | Images rendered as thumbnails and paged through in the preview. | ImageSource[]             | ---     |
| aspectRatio / size / height / background          | Applied to every thumbnail.                                   | see Thumbnail               | see Thumbnail |
| objectFit / loading / fallback                    | Applied to every thumbnail.                                   | see Thumbnail               | see Thumbnail |
| deletable                                         | Show a delete affordance on each thumbnail.                   | boolean                     | `false` |
| onDelete                                          | Called with the index of the thumbnail whose delete fired.    | (index: number) => void     | ---     |
| openZoom                                          | Whether clicking a thumbnail opens the preview.               | boolean                     | `true`  |
| zoomable / zoomStep / maxZoom / initialZoom       | Forwarded to the preview it owns.                             | see ImagePreview            | see ImagePreview |
| getContainer / zIndex                             | Forwarded to the preview it owns.                             | see ImagePreview            | see ImagePreview |
| texts                                             | Override tooltips / accessible labels for thumbnails and the preview. | Partial&lt;ImageTexts&gt; | DS translations |
| className                                         | Class applied to the gallery container.                       | string                      | ---     |

### ImagePreview

| Property       | Description                                                                                                                    | Type                        | Default          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------- | ---------------- |
| open           | Whether the viewer is visible.                                                                                                 | boolean                     | ---              |
| images         | Images to page through. Navigation shows only when there is more than one.                                                     | ImageSource[]               | ---              |
| index          | Controlled index of the currently shown image.                                                                                 | number                      | ---              |
| onIndexChange  | Called when navigation (arrows / keyboard) requests a different image.                                                         | (index: number) => void     | ---              |
| onClose        | Called on Escape, backdrop click and the close button.                                                                         | () => void                  | ---              |
| zoomable       | Whether zoom and pan are enabled.                                                                                              | boolean                     | `true`           |
| zoomStep       | Per-click zoom multiplier.                                                                                                     | number                      | `1.4`            |
| maxZoom        | Maximum zoom relative to the image's natural size.                                                                             | number                      | `3`              |
| initialZoom    | Where zoom starts.                                                                                                             | 'fit' / 'real-size'         | `'fit'`          |
| closable       | Whether to render the close button and allow Escape to close.                                                                  | boolean                     | `true`           |
| maskClosable   | Whether clicking the dimmed backdrop closes the viewer.                                                                        | boolean                     | `true`           |
| zIndex         | z-index of the overlay. Omitted, it stacks one step above the enclosing modal / drawer. Set it to opt out of the DS stack.      | number                      | `zindex-modal`   |
| fallback       | Rendered when an image fails to load (per-image override via `ImageSource.fallback`).                                          | React.ReactNode             | broken-image box |
| getContainer   | Portal target.                                                                                                                 | () => HTMLElement           | `document.body`  |
| destroyOnClose | Unmount the viewer (and reset zoom state) when closed.                                                                         | boolean                     | `false`          |
| onZoom         | Called with the current scale whenever the zoom transform changes.                                                             | (scale: number) => void     | ---              |
| texts          | Override the control tooltips / accessible labels.                                                                             | Partial&lt;ImageTexts&gt;   | DS translations  |

See the Storybook overview page for behavior notes, live examples and
accessibility guidance.
