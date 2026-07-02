# Image (`@synerise/ds-image`)

> Image components: inline **Thumbnail** tiles, a **Gallery** of thumbnails with
> uniform sizing, and a controlled full-screen **ImagePreview** (lightbox) with
> zoom/pan and a bottom-center navigation + zoom toolbar. Broken-image fallbacks
> are handled in one place (`useImageStatus` / `ImageContent`).

## Package structure

```
src/
  index.ts                       — public named exports
  shared/
    Image.shared.types.ts        — ImageSource, AspectRatio, ThumbnailSize, ThumbnailBackground, ObjectFit, InitialZoom, ImageTexts
    useImageStatus.ts            — single source of truth for load/error detection (handles cached `complete`)
    useImageTexts.ts             — react-intl defaults (DS.IMAGE.*) merged with the `texts` override
    ImageContent.tsx             — <img> + swap to fallback on error; styled per consumer; used by Thumbnail
    ImageContent.styles.ts       — default broken-image placeholder
  Thumbnail/
    Thumbnail.tsx                — sized tile; resolves gallery context → own props → defaults
    Thumbnail.types.ts           — ThumbnailProps
    Thumbnail.styles.ts          — Tile (sizing+ring), Clip (clips image+overlay), ThumbnailImage, EmptyPlaceholder, HoverOverlay, DeleteButton
    Thumbnail.const.ts           — SIZE_MAP, ASPECT_RATIO_MAP, defaults
    __specs__/Thumbnail.spec.tsx
  Gallery/
    Gallery.tsx                  — context provider + thumbnails + owns one ImagePreview
    Gallery.types.ts             — GalleryProps
    Gallery.styles.ts            — flex-wrap Container
    __specs__/Gallery.spec.tsx
  Preview/
    ImagePreview.tsx             — controlled lightbox (portal, zoom/pan, nav, download, focus trap)
    ImagePreview.types.ts        — ImagePreviewProps
    ImagePreview.styles.ts       — Overlay, ImageWrapper, Image, Fallback/FallbackBox, CloseWrapper, ToolbarWrapper
    ImagePreview.const.ts        — FIT_SCALE, DEFAULT_ZOOM_STEP (1.4), DEFAULT_MAX_ZOOM (3)
    PreviewToolbar.tsx           — bottom-center nav pill + zoom/download pill
    __specs__/ImagePreview.spec.tsx
  context/
    ImageGalleryContext.ts       — gallery-level settings; optional read (ListContext style)
  hooks/
    useImagePreview.ts           — open/close/next/prev + previewProps to spread
    __specs__/useImagePreview.spec.ts
  Image.figma.tsx                — Figma Code Connect (node-id 20563-10777; excluded from build)
  modules.d.ts
```

## Public exports

`Thumbnail`, `Gallery`, `ImagePreview` (all default-exported from their modules,
re-exported as named) + `useImagePreview`. Types: `ThumbnailProps`, `GalleryProps`,
`ImagePreviewProps`, `UseImagePreviewReturn`, `ImageSource`, `AspectRatio`,
`ThumbnailSize`, `ThumbnailBackground`, `ObjectFit`, `InitialZoom`. There is **no
default export** — the family has no single "main" component.

See `packages/storybook/stories/components/Image/Image.mdx` for the full props
tables.

## Implementation notes

- **One image-loading core** — `useImageStatus(src)` returns `{ ref, status,
  handleLoad, handleError }` and is the only place that decides "is this image
  broken?": it resets to `loading` on `src` change and re-reads the element's
  cached `complete`/`naturalWidth` (so a cached src-swap that doesn't fire
  `onLoad` still resolves). `ImageContent` wraps it for `Thumbnail`; `ImagePreview`
  uses the hook directly because it also measures natural size for zoom.
- **Gallery → Thumbnail via context** — `Gallery` broadcasts `aspectRatio`,
  `size`, `height`, `background`, `objectFit`, `loading`, `fallback` through
  `ImageGalleryContext`. Each `Thumbnail` resolves `ownProp ?? context ?? default`,
  so a standalone `<Thumbnail>` still works. Mirrors `ListContext`.
- **Thumbnail box** — `size` maps to a fixed height (`SIZE_MAP`); a fixed
  `aspectRatio` sets CSS `aspect-ratio` (width derived); `source` keeps the
  image's intrinsic ratio (`width: auto`). `objectFit` is `contain` (default) or
  `cover`. Interactive tiles (`openZoom`/`onClick`) are `role="button"`,
  `tabIndex=0`, Enter/Space-activated (a `<div>`, not a `<button>`, so the delete
  `<button>` can nest without invalid HTML).
- **Tile vs Clip** — `Tile` owns sizing (`height`/`aspect-ratio`), the focus ring,
  and positioning but does **not** clip; the inner `Clip` (`overflow:hidden` +
  radius + background) clips the image and hover overlay. This lets the delete
  affordance overhang the corner without being cut off.
- **Thumbnail states** — *Hover* (interactive tiles): a full-cover `HoverOverlay`
  (`grey-900` at ~30%, alpha `4D`) with a centered white `ShowS` icon, faded in on
  `:hover`. *Focused* (`:focus-visible`): a 2px `blue-600` ring via outset
  `box-shadow` (no layout shift; the ring is on the non-clipping `Tile`).
  *Hover-deletable* (`deletable`): a bare `DeleteButton` (`<button>`, `red-600`)
  rendering a `Close3FullBackgroundM` icon (white X on a red disc — the disc is the
  icon's `currentColor` fill, driven by the button's `color`), whose **center sits
  on the tile's top-right corner** (24×24, icon-sized — no extra clickable padding —
  `translate(50%,-50%)`), revealed on hover/focus-within. Its click stops propagation (so it never opens the preview)
  and blurs the button so the control doesn't linger via `:focus-within` after a
  click. *Empty* (no `src`): the grey placeholder.
- **Preview is controlled** — `open` / `images` / `index` / `onIndexChange` /
  `onClose`. Navigation (`‹ N of M ›`) shows only when `images.length > 1`; arrow
  keys page (with wrap-around). `useImagePreview` owns this state for non-gallery
  triggers; `Gallery` owns it internally for thumbnail clicks.
- **Zoom model** — RZPP scale 1 = the fitted view. `measureZoom` computes the
  factor from the fitted display to natural size; `maxScale = factor * maxZoom`
  (300% by default). The toolbar shows the percentage relative to natural
  (`scale / factor * 100`). `initialZoom: 'real-size'` jumps to natural via
  `centerView` on load; `'fit'` stays fitted. `zoomStep` is a multiplier (1.4).
  Button zoom (`stepZoom`) steps on a stable multiplicative grid anchored at
  natural size — levels are `naturalScaleFactor * zoomStep^k` clamped to
  `[FIT_SCALE, maxScale]` — and applies the exact target scale via `centerView`,
  so 100% is always a stop and zoom-in/out round-trip exactly. The wheel keeps
  RZPP's continuous relative step (`zoomStep - 1`).
- **Preview spacing** — the image keeps a constant 32px gap from the viewport
  edge (`PREVIEW_PADDING`); the close button and bottom toolbar sit 16px from the
  edge (`CONTROLS_INSET`). The padding is **not** toggled off on zoom: it lives on
  the wrapper RZPP observes, so changing it mid-zoom would resize the working
  area, make RZPP re-fit, and corrupt the first zoom step. `measureZoom` therefore
  computes the fit factor against the **content box** (`clientWidth - 2 *
  PREVIEW_PADDING`), so the natural-size anchor (100%) is accurate.
- **Pan when zoomed** — panning is disabled at the fitted view and enabled once
  zoomed (`panning.disabled = !isZoomed`), so the image can be dragged with the
  mouse. `onPanningStart`/`onPanningStop` drive an `isPanning` flag that toggles
  the pannable area's cursor between `grab` and `grabbing` for discoverability.
- **Bottom-center toolbar** — `PreviewToolbar` renders a nav `ToolbarGroup` and a
  zoom/download `ToolbarGroup` (`@synerise/ds-toolbar`). The close button stays
  top-right (`CloseWrapper`). The download control is a `ToolbarButton` rendered
  as an anchor (`href`/`download`/`target="_blank"` forwarded to `<a>` by
  `ds-button`) so it downloads same-origin images and opens cross-origin ones in
  a new tab; it shows whenever a valid image is loaded (independent of zoom).
- **Error/Empty fallback** — broken `src` → `fallback` (per-image `ImageSource.fallback`
  → component `fallback` → default `ImageM` placeholder). No `src` on a Thumbnail →
  the Empty placeholder.
- **Tooltips & i18n** — every icon control has a tooltip + `aria-label` resolved by
  `useImageTexts` (`react-intl` `useIntl().formatMessage`, ids `DS.IMAGE.*`,
  English defaults) merged with the `texts` override. `texts` flows `Gallery` →
  context → `Thumbnail` (delete) and `Gallery`/`ImagePreview` → toolbar (zoom/nav/
  download/close). Toolbar buttons use `ToolbarButton tooltipProps`; the custom
  delete `<button>` is wrapped in `@synerise/ds-tooltip`.
- **Open/close fade** — the `Overlay` hides via `opacity`/`visibility`/`pointer-events`
  (not `display:none`, which can't transition) with a ~160ms transition.
  `destroyOnClose` still unmounts (returns `null`).
- **Origin** — built from the updated Figma "Image" spec (`node-id=20563-10777`).

## Key dependencies

- `react-zoom-pan-pinch` — preview zoom & pan engine.
- `@synerise/ds-icon` — `AngleLeftM`/`AngleRightM` (nav), `FormulaMinusM`/`FormulaPlusM`
  (zoom), `FileDownloadM` (download), `CloseM` (close), `ShowS` (hover overlay),
  `Close3FullBackgroundM` (delete), `ImageM` (fallback/empty).
- `@synerise/ds-toolbar` — `ToolbarGroup` / `ToolbarButton` (+ `tooltipProps`) / `ToolbarLabel`.
- `@synerise/ds-tooltip` — wraps the thumbnail delete button.
- `@synerise/ds-utils` — `useFocusTrap`.
- `react-intl` (peer) — control labels/tooltips via `useImageTexts`.
- `@synerise/ds-core` (peer) — theme palette + `box-shadow-*` variables.
