# PanelsResizer (`@synerise/ds-panels-resizer`)
> A two-panel layout component with a draggable resizer handle that supports both horizontal and vertical splitting.

## Package structure
```
src/
  PanelsResizer.tsx      — main component, manages resize state and mouse event logic
  PanelResizer.styles.tsx — styled PanelsResizerContainer (flex row/column)
  index.ts               — public entry point, exports PanelsResizer
  Resizer/
    Resizer.tsx          — drag handle UI using DragHandleM icon from @synerise/ds-icon
    Resizer.styles.tsx   — Handler and HandlerIcon styled components
    index.ts             — re-exports Resizer
  utils/
    calculatePanelsWidth.ts — InitialVectorOptions type, getInitialVector, width/height calc helpers
    index.ts             — re-exports calculatePanelsWidth
  modules.d.ts           — module declarations
  __specs__/
    PanelsResizer.test.tsx
    Resizer.test.tsx
    calculatePanelsWidth.test.tsx
```

## Public exports
Only `PanelsResizer` is exported from `src/index.ts`.

### `PanelsResizer`
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `leftPanel` | `ReactNode` | — | Content for the left (or top, when horizontal) panel |
| `rightPanel` | `ReactNode` | — | Content for the right (or bottom, when horizontal) panel |
| `initial` | `{ leftPanel: number } \| { rightPanel: number }` | `undefined` | Initial pixel width (or height) of one panel. Converted to an offset from 50% at mount time. |
| `scrollable` | `boolean` | `undefined` | When true, adds `overflow: auto` to both panel wrappers |
| `isHorizontal` | `boolean` | `false` | Switches from side-by-side (vertical divider) to stacked (horizontal divider) layout |

## Usage patterns
```tsx
import { PanelsResizer } from '@synerise/ds-panels-resizer';

// Vertical split (default)
<div style={{ width: '100%', height: '680px' }}>
  <PanelsResizer
    leftPanel={<LeftContent />}
    rightPanel={<RightContent />}
  />
</div>

// Start with left panel at 300 px
<PanelsResizer
  leftPanel={<LeftContent />}
  rightPanel={<RightContent />}
  initial={{ leftPanel: 300 }}
/>

// Horizontal split (top/bottom)
<PanelsResizer
  leftPanel={<TopContent />}
  rightPanel={<BottomContent />}
  isHorizontal
/>

// Scrollable panels
<PanelsResizer
  leftPanel={<LongContent />}
  rightPanel={<LongContent />}
  scrollable
/>
```

## Styling
- `PanelsResizerContainer` uses `display: flex` with `flex-direction: row` (vertical split) or `column` (horizontal split).
- In vertical mode the container gets `flex: 1; height: -webkit-fill-available`. In horizontal mode it gets `width: -webkit-fill-available`.
- `overflow: hidden` is always set on the container to prevent layout bleed during drag.
- The `Handler` (resizer bar) is 16 px wide (vertical) or 16 px tall (horizontal), `background-color: grey-200`, turns `blue-100` on hover.
- Cursor changes to `ew-resize` (vertical) or `ns-resize` (horizontal) on hover.
- The `DragHandleM` icon is 16 px; in horizontal mode it is rotated 90 degrees via CSS transform.
- Panel sizes are expressed as `calc(50% ± Npx)` — left/top grows when the vector is positive, right/bottom shrinks.
- Horizontal mode uses `50vh` as the base unit; vertical mode uses `50%` of container width.

## Key dependencies
- `@synerise/ds-icon` — provides the `DragHandleM` icon and `Icon`/`StyledIcon` types
- `@synerise/ds-core` (peer) — provides theme tokens (`grey-200`, `blue-100`, `grey-600`, `blue-600`)
- `styled-components ^5` (peer)

## Implementation notes
- Resize state is tracked with a single `vector` number (pixel offset from the midpoint). Dragging right/down increases the vector; left/up decreases it.
- `initial` is converted to a vector offset once on mount via `getInitialVector`: `leftPanel` value → `leftPanel - containerWidth/2`; `rightPanel` value → `containerWidth/2 - rightPanel`.
- Mouse events are handled on the outer container (`onMouseMove`, `onMouseUp`, `onMouseLeave`) so dragging outside the handle still works. `pointerEvents: none` is applied to both panel wrappers while resizing to prevent iframe/embedded-content interference.
- `isHorizontal` mode reads `clientY` instead of `clientX` and measures `offsetHeight` instead of `offsetWidth` for the initial vector calculation.
- Tests use Jest (not Vitest) — `jest.config.js` is present and `"test": "jest"` in package scripts.
