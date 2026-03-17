# ProgressBar (`@synerise/ds-progress-bar`)

> Three progress bar variants: a segmented single-value bar (`ProgressBar`), a colour-coded tile bar (`ProgressTiles`), and a multi-value stacked/side-by-side bar (`Multivalue`).

## Package structure

```
src/
  ProgressBar.tsx              — default export; segmented single-value bar
  ProgressBar.types.ts         — ProgressProps
  ProgressBar.styles.ts        — styled-components (note: .ts)
  index.ts                     — default + named exports + type exports
  Multivalue/
    Multivalue.tsx             — multi-value bar (stacked or side-by-side)
    Multivalue.types.ts        — MultivalueProps, ProgressValue
    MultiValue.styles.ts       — styles (note: filename casing inconsistency)
  ProgressTiles/
    ProgressTiles.tsx          — colour-per-tile bar
    ProgressTiles.types.ts     — ProgressTilesProps
    ProgressTiles.styles.ts    — styles
  __specs__/
    ProgressBar.spec.tsx       — render tests for ProgressBar only (Jest)
```

## Public exports

### `ProgressBar` (default)

A single-value progress bar, optionally split into `steps` segments.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `percent` | `number` | `50` | Fill percentage (0–100). |
| `steps` | `number` | `1` | Number of segments to split the bar into. Each segment fills proportionally. |
| `width` | `string` | `'100%'` | CSS width of each segment tile (not the container). |
| `customColor` | `string` | `''` | Bar fill colour. Falls back to `green-500` token when empty string. |
| `thin` | `boolean` | `false` | Uses 4px height instead of 6px. |
| `inline` | `boolean` | `false` | Renders label/percent to the right of the bar instead of above. Suppresses `description`. |
| `label` | `ReactNode` | `undefined` | Text above the bar (non-inline) or to the right (inline). In non-inline mode, `percent%` is also shown to the right of the label. |
| `description` | `ReactNode` | `undefined` | Text below the bar. Hidden in inline mode. |
| `containerStyles` | `CSSProperties` | `undefined` | **@deprecated** — use `style` prop instead. |

All standard `HTMLDivElement` attributes accepted via `WithHTMLAttributes<HTMLDivElement, ...>`.

### `Multivalue`

Overlapping (stacked) or side-by-side multi-value bar.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `values` | `ProgressValue[]` | — | **Required.** Each entry has `{ percent: number; color: string }`. Percent clamped to 0–100. |
| `stackedBars` | `boolean` | `true` | When `true`, bars are layered on top of each other (sorted descending by percent, largest first). When `false`, bars are placed side-by-side with 2px gaps. |

All standard `HTMLDivElement` attributes accepted.

### `ProgressTiles`

Fixed-width colour tiles, one per entry in `colors[]`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colors` | `string[]` | — | **Required.** Array of CSS colour strings; determines the number of tiles. |
| `percent` | `number` | — | **Required.** Fill percentage (0–100); distributed across tiles proportionally. |
| `tileWidth` | `string` | — | **Required.** CSS width of each tile (e.g. `'24px'`). |
| `label` | `ReactNode` | `undefined` | Optional label rendered above the tiles via `FormFieldLabel`. |

All standard `HTMLDivElement` attributes accepted.

### Exported types

| Type | Description |
|------|-------------|
| `ProgressProps` | Props for `ProgressBar` |
| `MultivalueProps` | Props for `Multivalue` |
| `ProgressValue` | `{ percent: number; color: string }` |
| `ProgressTilesProps` | Props for `ProgressTiles` |

## Usage patterns

```tsx
import ProgressBar, { Multivalue, ProgressTiles } from '@synerise/ds-progress-bar';

// Basic
<ProgressBar percent={75} label="Loading" description="Almost there" />

// Segmented (5 steps, 40% = 2 full + 1 partial segment)
<ProgressBar percent={40} steps={5} />

// Inline (percent shown right of bar)
<ProgressBar percent={60} inline label="Step 2 of 5" />

// Thin bar, custom colour
<ProgressBar percent={80} thin customColor="#0070f3" />

// Multi-value stacked (default)
<Multivalue
  values={[
    { percent: 80, color: '#blue' },
    { percent: 50, color: '#red' },
  ]}
/>

// Multi-value side by side
<Multivalue
  values={[
    { percent: 30, color: '#blue' },
    { percent: 20, color: '#red' },
  ]}
  stackedBars={false}
/>

// Colour tiles
<ProgressTiles
  colors={['#4CAF50', '#FF9800', '#F44336']}
  percent={55}
  tileWidth="24px"
  label="Risk level"
/>
```

## Styling

All styles in `*.styles.ts` files. Use `theme.palette` tokens for backgrounds; `customColor` / `color` props accept any CSS colour string.

- **ProgressBar**: bar track is `grey-200`; fill is `customColor` or `green-500`. Segment border-radius is 3px. In multi-step mode, first tile gets left radius only, last tile gets right radius only.
- **Multivalue stacked**: bars overlap via `margin-top: -6px`; each bar has `border-right: 2px solid white` (hardcoded white) to create visual separation.
- **ProgressTiles**: tile track is `grey-200`; fill uses the colour from `colors[]`. Same border-radius rule as ProgressBar.
- Both `ProgressBar.styles.ts` and `ProgressTiles.styles.ts` use `FormFieldLabel` from `@synerise/ds-form-field` for the label styled component.

## Key dependencies

- `uuid` (`v4`) — generates stable tile keys in `ProgressBar`; new IDs created on every `steps` change
- `@synerise/ds-form-field` — `FormFieldLabel` re-used for the label element in both `ProgressBar` and `ProgressTiles`
- `@synerise/ds-utils` — `WithHTMLAttributes` utility type

## Implementation notes

- **Progress calculation (shared algorithm)**: `tileWidthRatio = 100 / steps`, `currentProgress = percent / tileWidthRatio`. Full tiles get width `100%`, the partial tile gets `(fractional part * 100)%`, remaining tiles get `0%`. Both `ProgressBar` and `ProgressTiles` use identical logic.
- **`inline` mode suppresses `description`** — when `inline` is `true`, the label content is shown to the right of the bar (or `${percent}%` if no label), and `description` is never rendered even if provided.
- **Label vs percent in non-inline mode** — both `label` and `${percent}%` are always shown in the `LabelWrapper` when `label` is truthy and `!inline`. There is no way to show only the percent without a label in this mode.
- **`containerStyles` deprecated** — use the standard `style` prop instead. `containerStyles` is still accepted but JSDoc-marked `@deprecated`.
- **`Multivalue` stacked sorting mutates the `values` array** — `values.sort(...)` is called inside `useMemo` without a prior `.slice()`. If the array is passed as a literal this is harmless, but passing a state array will silently mutate it.
- **`getTilesConfig` in `ProgressTiles` is wrapped in `useCallback` but called directly** — `useCallback` provides no benefit here since the function is invoked immediately in render, not passed as a callback.
- **Spec uses non-existent `showLabel` prop** — `ProgressBar.spec.tsx` passes `showLabel={false}` which is not in `ProgressProps`; it is silently ignored via `...rest` spread.
- **No tests for `Multivalue` or `ProgressTiles`**.
- **Uses Jest** (not Vitest) — `package.json` has `"test": "jest"`.
