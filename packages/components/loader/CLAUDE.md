# Loader (`@synerise/ds-loader`)

> A spinning circular progress indicator with optional label, header text, and percent display.

## Package structure

```
src/
  Loader.tsx        — single functional component, default export
  Loader.types.ts   — LoaderProps type, LoaderSize enum, FontSize enum
  Loader.styles.ts  — styled-components: LoaderWrapper, Wrapper, Loader, TextWrapper, HeaderWrapper, PercentWrapper
  index.ts          — re-exports default from Loader.tsx
  modules.d.ts      — module declaration shim
  __specs__/
    Loader.spec.tsx — minimal render tests (Jest)
```

## Public exports

### `Loader` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'S' \| 'M' \| 'L'` | `'M'` | Spinner diameter: S=12px, M=20px, L=40px |
| `color` | `'grey' \| 'blue' \| 'red' \| 'green' \| 'yellow' \| 'pink' \| 'mars' \| 'orange' \| 'fern' \| 'cyan' \| 'purple' \| 'violet' \| string` | `'grey'` | Spinner border color — resolved via `theme.palette[\`${color}-600\`]` |
| `label` | `ReactNode` | — | Text rendered below/right of the spinner |
| `labelPosition` | `'right' \| 'bottom'` | `'right'` | Controls flex-direction: `right` → row, `bottom` → column |
| `text` | `ReactNode` | — | Bold header rendered between spinner and label (only shown when truthy) |
| `fontSize` | `'small' \| 'medium'` | — | Font size of `text`: small=14px, medium=18px; also changes padding |
| `percent` | `ReactNode` | — | Value passed to `percentFormatter`; not rendered directly |
| `percentFormatter` | `(percent?: ReactNode) => ReactNode` | — | When provided, its return value is rendered beside `label` inside `PercentWrapper` |
| `mode` | `'absolute'` | — | Positions the loader absolutely at 50%/50% of its containing block |
| `className` | `string` | — | Appended to the root element alongside hardcoded `ds-loader` |

### Enums (not re-exported from index, but available via named import of types file)

- `LoaderSize` — `{ S: 12, M: 20, L: 40 }` (numeric enum mapping keys to pixel values)
- `FontSize` — `{ small: 14, medium: 18 }` (numeric enum)

## Usage patterns

```tsx
import Loader from '@synerise/ds-loader';

// Minimal
<Loader />

// With label and size
<Loader size="L" label="Loading..." labelPosition="bottom" color="blue" />

// With header text and label
<Loader
  size="L"
  text="You will be redirected to Synerise"
  label="Please wait a second to proceed."
  fontSize="small"
  labelPosition="bottom"
  color="grey"
/>

// With percent formatter
<Loader
  size="L"
  label="Loading..."
  percent={42}
  percentFormatter={(p) => <span>{p}%</span>}
/>

// Centered overlay (requires positioned parent)
<Loader size="M" mode="absolute" />
```

## Styling

- Spinner is a CSS `border-radius: 50%` div with a `rotate(0deg → 720deg)` keyframe animation (2s linear infinite).
- Color resolves through the DS theme: `theme.palette[\`${color}-600\`]`. An arbitrary CSS color string also works because styled-components evaluates it as-is if no matching palette key exists.
- `size="L"` adds 12px margin around the spinner; S/M use 8px (`Wrapper`).
- `TextWrapper` font size: S size → 11px, M/L → 13px.
- `mode="absolute"` sets `position: absolute; top: 50%; left: 50%` — **no `transform: translate(-50%, -50%)`**, so the loader is not truly centered unless a transform is added by the consumer.
- `LoaderWrapper` always has `display: flex; align-items: center; justify-content: center`.

## Key dependencies

- `styled-components` ^5 (peer)
- `@synerise/ds-core` (peer) — provides `renderWithProvider` in tests and theme tokens
- No Ant Design dependency

## Implementation notes

- `className` is concatenated with a hardcoded string `ds-loader ${className}`. If `className` is `undefined`, the class string becomes `"ds-loader undefined"` — a minor bug.
- `percentFormatter` is the only way to display percent; `percent` alone does nothing visible.
- `LoaderSize` and `FontSize` enums are defined in `Loader.types.ts` but not re-exported from `index.ts`. Consumers needing the enum values must import directly from the types file (not recommended for public API).
- Tests use Jest (not Vitest) via `jest.config.js`; only two smoke tests exist — coverage is minimal.
