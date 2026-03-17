# Result (`@synerise/ds-result`)

> A status/feedback display component that renders a typed icon, title, description, optional custom panel, and optional action buttons.

## Package structure

```
src/
  Result.tsx          — main component; contains mapTypeToStatus icon/colour mapping
  Result.types.ts     — ResultProps
  Result.styles.ts    — styled-components
  index.ts            — public exports
  __specs__/
    Result.spec.tsx   — Jest tests
```

## Public exports

### `Result` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'info' \| 'warning' \| 'error' \| 'success' \| 'progress' \| 'no-results'` | — | **Required.** Determines the icon and icon colour |
| `title` | `string \| ReactNode` | — | Heading text |
| `description` | `string \| ReactNode` | — | Body text |
| `buttons` | `ReactNode` | — | Action buttons rendered below description |
| `panel` | `ReactNode` | — | Custom content block (e.g. image, list) |
| `customIcon` | `ReactElement` | — | Replaces the built-in type icon |
| `className` | `string` | — | Added to the root `ds-result` container |
| `noSearchResults` | `boolean` | — | **@deprecated** — use `type="no-results"` instead |

### `ResultProps`

The full props type, re-exported as a named type.

## Icon mapping

| `type` | Icon | Colour |
|--------|------|--------|
| `info` | `InfoL` | `blue-600` |
| `warning` | `WarningL` | `yellow-600` |
| `error` | `WarningL` | `red-600` |
| `success` | `CheckL` | `green-600` |
| `progress` | `TimeL` | `grey-600` |
| `no-results` | `InformationNoSearchResultL` | `grey-600` |

## Usage patterns

```tsx
import Result from '@synerise/ds-result';

// Minimal
<Result type="success" title="Done!" />

// Full
<Result
  type="error"
  title="Something went wrong"
  description="Please try again later."
  customIcon={<MyIcon />}
  panel={<img src="..." />}
  buttons={
    <>
      <Button type="secondary">Cancel</Button>
      <Button type="primary">Retry</Button>
    </>
  }
/>
```

## Styling

Styles live in `Result.styles.ts`. Uses `@synerise/ds-core` theme tokens for colours (`theme.palette[iconColor]`). Layout is a centred flex column with `gap: 24px`, `max-width: 440px`, `padding: 24px 0`.

## Key dependencies

- `@synerise/ds-icon` — renders the typed icon and wraps `customIcon`
- `@synerise/ds-typography` — `Description` styled component and `h500` macro for the title
- `@synerise/ds-button` — `ButtonStyles.Button.AntdButton` targeted in `ButtonContainer` for button spacing

## Implementation notes

- **`closable` and `onClose` are not implemented**: the README API table and usage example document both, but neither prop exists in `ResultProps` or is used in `Result.tsx` — they are silently dropped.
- **Icon size bug**: `size={mapTypeToStatus['no-results'] ? 48 : 24}` — the value `mapTypeToStatus['no-results']` is always a truthy object, so **all** icons render at size 48, not just `no-results`. The intended expression is `type === 'no-results' ? 48 : 24`.
- **`noSearchResults` is `@deprecated`**: use `type="no-results"` instead. The prop is accepted but has no effect on rendering (it was presumably the predecessor of the `no-results` type).
- **Uses Jest** (`jest.config.js`) — not yet migrated to Vitest.
- Root element always has class `ds-result` plus any passed `className`.
