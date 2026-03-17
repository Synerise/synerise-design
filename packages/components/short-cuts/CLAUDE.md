# ShortCuts (`@synerise/ds-short-cuts`)

> A keyboard shortcut badge component that renders a styled key cap containing either text or an icon, in two sizes and two color variants.

## Package structure

```
src/
  ShortCuts.tsx        — main component
  ShortCuts.types.ts   — ShortCutsProps (ExactlyOne<icon, children> + WithHTMLAttributes)
  ShortCuts.style.ts   — Wrapper styled component with size/color/autoWidth logic
  index.ts             — default export only
  __specs__/
    ShortCuts.spec.tsx — Jest tests (2 cases: text render, icon render)
```

## Public exports

### `ShortCuts` (default export)

`ShortCutsProps = WithHTMLAttributes<HTMLDivElement, { … }> & ExactlyOne<{ icon? }, { children? }>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'S' \| 'L'` | `'L'` | `L` = 24px height, `S` = 18px height |
| `color` | `'light' \| 'dark'` | — | `light` = white bg / grey border; `dark` = grey-600 bg / grey-500 border |
| `autoWidth` | `boolean` | — | When `false` (default), width equals height (square); when `true`, width is `auto` |
| `icon` | `ReactNode` | — | Icon to display (mutually exclusive with `children`) |
| `children` | `ReactNode` | — | Text label to display (mutually exclusive with `icon`) |

Accepts all standard `<div>` HTML attributes.

**`ExactlyOne` constraint** — TypeScript enforces that exactly one of `icon` or `children` is provided. Passing both or neither is a type error.

No type exports from `index.ts`.

## Usage patterns

```tsx
import ShortCuts from '@synerise/ds-short-cuts';
import { ArrowUpM } from '@synerise/ds-icon';

// Text shortcut
<ShortCuts size="L" color="dark">ESC</ShortCuts>

// Icon shortcut
<ShortCuts size="S" color="light" icon={<ArrowUpM />} />

// Auto-width for longer labels
<ShortCuts size="L" color="light" autoWidth>Ctrl</ShortCuts>
```

## Styling

`ShortCuts.style.ts`. The `Wrapper` is a flex `div` centered on both axes. Padding and width are computed via `getPadding()` and `getWidth()` helper functions based on `size` and `isIcon`. Icon color is `white` for `dark` variant, `grey-600` for `light` variant (hardcoded via `theme.palette`, applied as `Icon` `color` prop). Font size is hardcoded `11px`. Box shadow opacity: `0.5` for dark, `0.08` for light.

## Key dependencies

- `@synerise/ds-icon` — renders the `icon` node with `size={12}` and appropriate color
- `@synerise/ds-typography` — `Text size="xsmall"` for text content

## Implementation notes

- **`icon` branch ignores `children`** — when `icon` is provided, `children` is never rendered even if passed (the `ExactlyOne` type prevents this in TypeScript but not at runtime).
- **`color` has no default value in props** — `color` is optional with no default; when omitted, the styled component's conditional `props.color === 'dark'` evaluates to `false`, rendering the light variant appearance.
- **`ShortCutsProps` not exported** — `index.ts` only exports the default component; the type is not publicly accessible without a deep import.
- **Test runner is Jest** (not Vitest).
