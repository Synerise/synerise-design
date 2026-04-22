# Scrollbar (`@synerise/ds-scrollbar`)

> Custom scrollbar component with two rendering strategies: a PerfectScrollbar-based virtual mode and a fully custom drag-and-drop mode.

## Package structure

```
src/
  Scrollbar.tsx               — main component (forwardRef, delegates to DnDScrollbar or VirtualScrollbar)
  Scrollbar.types.ts          — ScrollbarAdditionalProps, ScrollbarProps, VirtualScrollbarProps
  Scrollbar.styles.tsx        — ScrollbarContainer, LoaderWrapper, Loader
  DnDScrollbar/
    DnDScrollbar.tsx          — custom scrollbar with mouse-drag thumb support
    DnDScrollbar.styles.tsx   — styled components for DnD variant
    index.ts
  VirtualScrollbar/
    VirtualScrollbar.tsx      — PerfectScrollbar wrapper with resize/animation awareness
    VirtualScrollbar.styles.tsx
    index.ts
  __specs__/
    Scrollbar.spec.tsx        — Jest/RTL tests
  style/
    index.less                — imports ds-core variables, perfect-scrollbar CSS, mixin
    scrollbar.mixin.less      — overrides for .ps__rail-* and .ps__thumb-*, large-size variant
  modules.d.ts                — imports @testing-library/jest-dom
  index.ts                    — public exports
```

## Public exports

### `Scrollbar` (default export)

The unified entry point. Renders `DnDScrollbar` when `withDnd={true}`, otherwise renders `VirtualScrollbar`. Accepts a `forwardRef` to the underlying scroll container (`HTMLElement`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `absolute` | `boolean` | `false` | Removes padding offsets from the inner wrapper (scrollbar overlaps content) |
| `children` | `ReactNode` | — | Scrollable content |
| `classes` | `string` | — | Extra CSS class(es) applied to the inner content element |
| `className` | `string` | — | Class applied to the outermost `ScrollbarContainer` div |
| `confineScroll` | `boolean` | `false` | Prevents wheel events from propagating to parent scrollable areas |
| `fetchData` | `() => void` | — | Called when scroll reaches the Y end and `hasMore` is `true` and `loading` is falsy |
| `hasMore` | `boolean` | — | Gates whether `fetchData` is invoked on Y-end |
| `largeSize` | `boolean` | `false` | Renders a wider (16 px) thumb with blue tokens instead of the default 3 px grey thumb |
| `loading` | `boolean` | — | Overlays a semi-transparent mask and animated spinner; also dims inner content to `0.2` opacity |
| `maxHeight` | `string \| number` | — | CSS `max-height` on the scroll content element |
| `onScroll` | `(event: UIEvent) => void` | — | Fired on scroll |
| `onYReachEnd` | `() => void` | — | Called independently of `fetchData` whenever the Y end is reached |
| `overscrollBehavior` | `'auto' \| 'contain' \| 'none'` | `'contain'` | Sets CSS `overscroll-behavior` on the scroll container. Honored by both variants: virtual applies it to the inner `.ps` element, DnD applies it to its own `ScrollbarContainer` |
| `style` | `CSSProperties` | — | Inline styles for the inner wrapper div |
| `withDnd` | `boolean` | `false` | Use `DnDScrollbar` (custom thumb, drag support) instead of `VirtualScrollbar` |

### `VirtualScrollbarProps`

Extends `ScrollbarProps` with one additional prop:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `scrollbarOptions` | `ScrollBarProps['options']` | — | Options forwarded to `@ofsajd/react-perfect-scrollbar`; `minScrollbarLength` is always forced to `48` |

### Named type exports

- `ScrollbarAdditionalProps` — all props except `children`
- `ScrollbarProps` — `ScrollbarAdditionalProps & { children?: ReactNode }`
- `VirtualScrollbarProps` — `ScrollbarProps & { scrollbarOptions?: ... }`
- `OverscrollBehavior` — `'auto' | 'contain' | 'none'`, value of the `overscrollBehavior` prop

## Usage patterns

```tsx
import Scrollbar from '@synerise/ds-scrollbar';

// Default virtual scrollbar
<Scrollbar maxHeight={400}>
  {content}
</Scrollbar>

// With infinite scroll
<Scrollbar
  maxHeight={400}
  hasMore={hasMore}
  loading={isLoading}
  fetchData={loadNextPage}
>
  {items}
</Scrollbar>

// Drag-and-drop custom scrollbar
<Scrollbar withDnd maxHeight={400}>
  {content}
</Scrollbar>

// Large variant (accessible-style thumb)
<Scrollbar largeSize maxHeight={400}>
  {content}
</Scrollbar>

// Allow scroll chaining to parent (default is 'contain')
<Scrollbar maxHeight={400} overscrollBehavior="auto">
  {content}
</Scrollbar>
```

## Styling

Two layers of styling:

1. **styled-components** — `ScrollbarContainer` (relative, `height: 100%`) wraps both mode variants. It owns the `.ps { overscroll-behavior: <overscrollBehavior>; }` rule, which is picked up by the virtual variant (perfect-scrollbar's `.ps` element). The DnD variant ships its own `ScrollbarContainer` that applies `overscroll-behavior` directly on itself. The prop defaults to `'contain'`, matching the behavior previously hard-coded in `scrollbar.mixin.less`. `LoaderWrapper` (absolute fill, `rgba(255,255,255,0.6)`) and a spinning `Loader` are rendered on top when `loading` is true.
2. **Less overrides** (`style/scrollbar.mixin.less`) — patches PerfectScrollbar's `.ps__rail-*` and `.ps__thumb-*` classes. The `.large-size` class (applied via `classnames` in `VirtualScrollbar`) activates the wide blue thumb variant.

**Token usage:**
- Default thumb: `grey-300` / `grey-500` (hover)
- Large thumb: `blue-050` / `blue-100` (hover), `grey-300` border / `grey-400` border (hover)
- Loading spinner in `Scrollbar.styles`: `grey-600`; in `DnDScrollbar.styles`: `blue-600`

The track in `DnDScrollbar` is hidden (`opacity: 0`) and revealed on parent hover via a styled-components selector chain.

## Key dependencies

- `@ofsajd/react-perfect-scrollbar` `1.0.0` — used only by `VirtualScrollbar`; this is a fork/mirror of `react-perfect-scrollbar`
- `@synerise/ds-utils` — `useCombinedRefs`, `useResizeObserver` (used in `VirtualScrollbar`)
- `@synerise/ds-icon` + `SpinnerM` — loading spinner icon
- `@synerise/ds-core` — `useTheme` for palette tokens; peer dependency
- `classnames` — conditional class composition in `VirtualScrollbar`

## Implementation notes

- `VirtualScrollbar` registers `transitionend`/`animationend` listeners on `document.body` (no cleanup deps array — runs after every render) to retrigger PerfectScrollbar geometry recalculation when the scrollbar becomes visible after a CSS animation.
- `DnDScrollbar` implements its own thumb-drag via `mousemove`/`mouseup`/`mouseleave` listeners on `document` and a `ResizeObserver` on the wrapper. Minimum thumb height is `48 px`; if `scrollHeight === clientHeight` (no overflow), `thumbHeight` is set to `0` (thumb hidden).
- `DnDScrollbar` does not accept `scrollbarOptions` — the prop is silently ignored because it is part of `VirtualScrollbarProps` only.
- `overscrollBehavior` is forwarded from the top-level `Scrollbar` down to whichever inner component is active. Virtual picks it up via the outer wrapper's `.ps` nested rule; DnD applies it on its own `ScrollbarContainer` directly.
- `confineScroll` behaviour differs between modes: `VirtualScrollbar` calls `event.preventDefault()` on `wheel` (blocks scroll propagation); `DnDScrollbar` calls `event.stopPropagation()` only.
- The `forwardRef` type is `HTMLElement` (broad); callers may need to cast to `HTMLDivElement` for precise access.
- The test runner is **Jest** (not Vitest) — `package.json` uses `"test": "jest"` and `jest.config.js` is present.
- `modules.d.ts` is named misleadingly — it only augments the test environment with `@testing-library/jest-dom` typings.
