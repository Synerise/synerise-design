# Banner (`@synerise/ds-banner`)

> A slideshow banner component with optional autoplay, slide navigation, an expandable header bar, and a close button.

## Package structure

```
src/
  Banner.tsx                    — main component
  Banner.types.ts               — all prop interfaces
  Banner.styles.ts              — styled-components (shared across all sub-components)
  Banner.const.ts               — DEFAULT_SLIDE_SPEED (5000ms), default status tag colors
  index.ts                      — public exports (default Banner + BannerProps type)
  components/
    BannerCounter/              — prev/next buttons + dot navigation (shown only when slides > 1)
    BannerHeader/               — collapsible header bar (rendered when expandable prop is set)
    BannerSlide/                — single slide; decides text vs media layout
    BannerSlideMediaContent/    — renders a media (image/video) content area
    BannerSlideTextContent/     — renders title/description/buttons content area
    index.ts                    — re-exports all sub-components
  hooks/
    useCarousel.ts              — holds ref to antd Carousel and exposes navigation handlers
    useTexts.ts                 — merges react-intl defaults with caller-supplied texts
    index.ts                    — re-exports hooks
  utils/
    isMediaContent.ts           — type guard: 'media' in props
  style/index.less              — global antd carousel overrides (side-effecting import)
```

## Public exports

### `Banner` (default export)

Props (`BannerProps` = `WithHTMLAttributes<HTMLDivElement, …>`):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slides` | `BannerSlideProps[]` | — | **Required.** Array of slide data objects. |
| `autoPlay` | `boolean` | `true` | Start the carousel on mount. |
| `autoPlaySpeed` | `number` | `5000` | Milliseconds per slide. |
| `transitionEffect` | `'scrollx' \| 'fade'` | `'scrollx'` | Antd Carousel effect. |
| `onAfterChange` | `(index: number) => void` | `undefined` | Called after slide transition completes. |
| `onBeforeChange` | `(from: number, to: number) => void` | `undefined` | Called before slide transition starts. |
| `onClose` | `() => void` | `undefined` | Renders a close (✕) button in the top-right corner when provided. |
| `expandable` | `Omit<BannerHeaderProps, 'closeButton' \| 'onToggle' \| 'texts'>` | `undefined` | When set, renders a collapsible header bar above the slides. |
| `texts` | `Partial<BannerTexts>` | `undefined` | Override i18n strings (see BannerTexts below). |

Also accepts any standard `HTMLDivElement` attribute (spread onto the root `<div>`).

### `BannerProps` (type export)

The full props type for the `Banner` component.

## Slide content types

Each slide (`BannerSlideProps`) has three layout slots: `mainContent`, `leftSideContent`, `rightSideContent`. Each slot accepts either a **text** or **media** content object — the `isMediaContent` type guard (`'media' in props`) decides which sub-component to render.

### `BannerSlideProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mainContent` | `BannerSlideTextContentProps \| BannerSlideMediaContentProps` | `undefined` | Flexible centre/full-width area. |
| `leftSideContent` | `BannerSlideTextContentProps \| BannerSlideMediaContentProps` | `undefined` | Fixed 240px left column. |
| `rightSideContent` | `BannerSlideTextContentProps \| BannerSlideMediaContentProps` | `undefined` | Fixed 240px right column. |

### `BannerSlideTextContentProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | `undefined` | Slide heading (rendered as `<Title level={1}>`). |
| `titlePrefix` | `ReactNode` | `undefined` | Icon or avatar shown left of the title text. |
| `titleStatus` | `Pick<TagProps, 'textColor' \| 'color' \| 'name'>` | `undefined` | Status pill tag above the title. Falls back to `yellow-600` / `white` from `Banner.const.ts`. |
| `description` | `ReactNode` | `undefined` | Body text below the title. |
| `buttons` | `ReactNode` | `undefined` | Action buttons rendered below description (wrapped in flex row). |

### `BannerSlideMediaContentProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `media` | `ReactNode` | `undefined` | Image, video, or any element; constrained to `max-width/max-height: 100%`. |

### `BannerHeaderProps` (expandable)

Pass via the `expandable` prop (omit `closeButton`, `onToggle`, `texts` — managed internally):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | — | **Required.** Header bar label. |
| `icon` | `ReactNode` | `undefined` | Icon shown left of the title. |
| `isExpanded` | `boolean` | `true` | Initial expanded state. |

### `BannerTexts`

| Key | Default (react-intl) | Description |
|-----|----------------------|-------------|
| `expand` | `'Expand'` | Toggle button label when collapsed. |
| `collapse` | `'Collapse'` | Toggle button label when expanded. |
| `closeTooltip` | `'Close'` | Tooltip on the ✕ button. |

## Usage patterns

```tsx
import Banner from '@synerise/ds-banner';

// Single slide, no controls
<Banner
  slides={[{
    mainContent: { title: 'Hello', description: 'World' },
  }]}
/>

// Multi-slide with autoplay and close
<Banner
  slides={[
    { mainContent: { title: 'Slide 1', buttons: <Button>Learn more</Button> } },
    { leftSideContent: { media: <img src="..." /> }, mainContent: { title: 'Slide 2' } },
  ]}
  autoPlaySpeed={3000}
  onClose={() => setBannerVisible(false)}
/>

// Expandable header
<Banner
  slides={[{ mainContent: { title: 'News' } }]}
  expandable={{ title: 'Announcements', icon: <Icon component={<InfoM />} />, isExpanded: false }}
/>
```

## Key dependencies

- `antd` (`Carousel`) — the underlying carousel/slideshow engine; `BannerSlides` is a styled `Carousel`; navigation is driven via `CarouselRef` (`.goTo`, `.next`, `.prev`)
- `react-intl` — **required peer dependency** used in `useTexts` for default i18n strings; app must be wrapped in `IntlProvider`
- `uuid` — generates a stable `id` per slide on each `slides` prop change (via `useMemo`) to use as React keys
- `@synerise/ds-tag` — renders `titleStatus` pill with `asPill` + `TagShape.SMALL_SQUARE`
- `@synerise/ds-typography` (`Title`, `Text`) — used for slide title and header bar text

## Custom hooks

### `useCarousel`

Holds a `useRef<CarouselRef>` pointing to the antd Carousel and exposes `handleDotClick(index)`, `handleNextClick()`, `handlePrevClick()`. The `bannerRef` is passed directly to `<S.BannerSlides ref={bannerRef}>`.

### `useTexts`

Merges react-intl formatted defaults (`DS.BANNER.EXPAND`, `DS.BANNER.COLLAPSE`, `DS.BANNER.CLOSE-TOOLTIP`) with any `texts` override passed by the caller. Always returns a complete `BannerTexts` object.

## Implementation notes

- **Slide counter** only renders when `slides.length > 1`.
- **Close button vs expandable header**: if `expandable` is set, the close button is rendered *inside* the `BannerHeader`; otherwise it floats absolutely in the top-right corner (`position: absolute; right: 8px; top: 8px; z-index: 10`).
- **Expand/collapse state** is local — `isExpanded` in `expandable` is only the *initial* value. After mount the state is owned by `Banner`.
- **`slides` are re-keyed** on every render via `uuid()` inside a `useMemo([slides])`, so mutating slide objects in place (without replacing the array) will not re-key them.
- **CSS side-effect**: `./style/index.less` is imported unconditionally and patches antd carousel classes (`.ant-carousel`, `.slick-track`).
- `BannerSlide` memoizes each content area (`useMemo`) keyed to the content prop; position (`left | right | main`) and `hasMainContent` flag control flex-basis (240px fixed) vs flex-grow (1).
- `titleStatus` defaults for colour (`yellow-600` / `white`) come from `Banner.const.ts` and are spread before the caller's overrides, so callers can override individual colour props.