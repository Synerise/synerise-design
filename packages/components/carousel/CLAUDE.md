# Carousel (`@synerise/ds-carousel`)

> DS-native, antd-free carousel primitive. Slides with `scrollx`/`fade` transitions, autoplay,
> built-in dots, and an imperative `goTo/next/prev` ref. Built to replace the antd `Carousel` that
> `@synerise/ds-banner` and `@synerise/ds-popconfirm` depended on.

## Package structure

```
src/
  Carousel.tsx          — the component (forwardRef<CarouselRef>)
  Carousel.types.ts     — CarouselProps, CarouselRef, CarouselEffect
  Carousel.styles.ts    — styled-components (Root, List, Track, Slide, Dots, Dot)
  index.ts              — public exports
  __specs__/Carousel.spec.tsx
```

No LESS, no antd. Pure styled-components + theme tokens (`theme.palette`).

## Public API

### `Carousel` (default export) — `forwardRef<CarouselRef, CarouselProps>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | One child per slide. |
| `effect` | `'scrollx' \| 'fade'` | `'scrollx'` | Slide transition. |
| `slidesToShow` | `number` | `1` | Slides visible at once (`scrollx` only). |
| `slidesToScroll` | `number` | `1` | Slides advanced per `next()`/`prev()`/dot. |
| `infinite` | `boolean` | `true` | Loop at the ends; `false` clamps to the first/last view. |
| `autoplay` | `boolean` | `false` | Auto-advance slides. |
| `autoplaySpeed` | `number` | `3000` | Autoplay interval (ms). |
| `dots` | `boolean` | `true` | Render the built-in dot navigation (hidden for a single slide). |
| `beforeChange` | `(from, to) => void` | — | Fired when a transition starts. |
| `afterChange` | `(current) => void` | — | Fired ~500ms later when it completes. |
| `className`, `style` | — | — | Applied to the root. |

### `CarouselRef` (imperative handle)

`{ goTo(index), next(), prev() }` — index wraps modulo slide count. Mirrors antd's `CarouselRef`.

### DOM / class hooks

`ds-carousel-*` only (no antd/slick classes — this is a new component, nothing legacy depends on them):
- root `ds-carousel`
- `ds-carousel-list` → `ds-carousel-track`
- slides `ds-carousel-slide` (+ `ds-carousel-slide-active` on the visible one(s))
- dots `ds-carousel-dots` → `ds-carousel-dot` (+ `ds-carousel-dot-active` on the current page)

## Implementation notes

- **scrollx** translates the flex track by `-index * (100 / slidesToShow)%`; each slide is
  `100 / slidesToShow %` wide and the `List` clips with `overflow: hidden`. `next()`/`prev()` step by
  `slidesToScroll`. This covers multi-slide product strips (e.g. puib `CardWithSlider`: `slidesToShow`
  1–4, `slidesToScroll={1}`, `infinite={false}`, `dots={false}`, ref `next/prev` + `afterChange`).
- **infinite=false** clamps navigation to `[0, count - slidesToShow]`; `infinite=true` wraps modulo.
- **fade** stacks slides absolutely; the active one is `position: relative` (so it drives height) and
  fades via `opacity`.
- `afterChange` fires on a 500ms timer matching the CSS transition (cleared on unmount / re-trigger).
- The active index is clamped if the slide count shrinks.

## Key dependencies

- `@synerise/ds-core` (peer) — theme palette tokens via the styled-components `ThemeProvider`.
- No other `@synerise/ds-*` runtime imports.
