# EmptyStates (`@synerise/ds-empty-states`)

> Presentational component for empty-state UI: displays an optional icon, header text, label text, and action button in configurable layout orientations.

## Package structure

```
src/
  EmptyStates.tsx        — main component
  EmptyStates.types.ts   — EmptyStatesProps, EmptyStatesSize enum, IconSize/FontSize constants
  EmptyStates.styles.tsx — styled-components
  index.ts               — public exports
  __specs__/
    EmptyStates.spec.tsx — Jest tests
```

## Public exports

### `EmptyStates` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `EmptyStatesSize` | `EmptyStatesSize.SMALL` | Icon size — `'small'` = 48px, `'medium'` = 96px |
| `fontSize` | `EmptyStatesSize` | `undefined` | Header font size — `'small'` = 14px, `'medium'` = 18px. Falls back to 14px when omitted |
| `text` | `ReactNode` | `undefined` | Header / primary text |
| `label` | `ReactNode` | `undefined` | Secondary label text below the header |
| `button` | `ReactNode` | `undefined` | Action button rendered below label |
| `customIcon` | `ReactElement` | `undefined` | Icon element (passed to `@synerise/ds-icon` `Icon`) |
| `iconPosition` | `'top' \| 'left' \| 'right'` | `'top'` | Position of icon relative to content |
| `textAlign` | `'left' \| 'center' \| 'right' \| 'justify'` | `'center'` | Text alignment of content area |
| `mode` | `'absolute'` | `undefined` | When `'absolute'`, positions wrapper at `top:50%; left:50%` (see implementation notes) |
| `className` | `string` | `undefined` | Extra CSS class; merged with `'ds-empty-states'` |
| `labelPosition` | `'bottom' \| 'right'` | `undefined` | **@deprecated** — accepted but has no effect on rendering |

### `EmptyStatesSize` (enum)

```ts
enum EmptyStatesSize {
  SMALL = 'small',
  MEDIUM = 'medium',
}
```

### `IconSize` (constant)

```ts
{ small: 48, medium: 96 }
```

Maps `EmptyStatesSize` to icon pixel sizes. Re-export of the same values used internally.

### `FontSize` (constant)

```ts
{ small: 14, medium: 18 }
```

Maps `EmptyStatesSize` to header font sizes in px.

## Usage patterns

```tsx
import EmptyStates, { EmptyStatesSize } from '@synerise/ds-empty-states';
import { NoResultsM } from '@synerise/ds-icon';

// Minimal
<EmptyStates text="No results found" />

// With icon, label and button
<EmptyStates
  size={EmptyStatesSize.MEDIUM}
  customIcon={<NoResultsM />}
  text="No results"
  label="Try adjusting your search filters."
  button={<Button>Clear filters</Button>}
/>

// Side-by-side layout
<EmptyStates
  iconPosition="left"
  customIcon={<NoResultsM />}
  text="Nothing here yet"
  textAlign="left"
/>
```

## Styling

Styles in `EmptyStates.styles.tsx`. Uses `props.theme.palette['grey-800']` for header text colour (from `@synerise/ds-core`). No hardcoded hex values.

Layout is driven by `iconPosition`:
- `'top'` → `flex-direction: column; align-items: center`
- `'left'` → `flex-direction: row; gap: 16px; align-items: flex-start`
- `'right'` → `flex-direction: row-reverse; gap: 16px; align-items: flex-start`

`textAlign: 'justify'` maps `justify-content` to `'center'` (not `'justify'`) — this is a known inconsistency.

## Key dependencies

- `@synerise/ds-icon` — wraps `customIcon` in an `<Icon size={px}>` element

## Implementation notes

- `mode='absolute'` sets `position: absolute; top: 50%; left: 50%` but does **not** apply `transform: translate(-50%, -50%)` — the component will not be visually centred without additional CSS on the parent.
- `labelPosition` prop is fully ignored in the component render — it was deprecated and the layout logic was removed, but the prop is still accepted to avoid breaking changes.
- `mapSizeToPx` inside `EmptyStates.tsx` duplicates the exported `IconSize` constant — they are kept in sync manually.
- Tests use **Jest** (`jest.config.js`), not Vitest — not yet migrated.
- The header margin-top (`12px`) only applies when both `customIcon` is present **and** `size === EmptyStatesSize.SMALL`.
