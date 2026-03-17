# Status (`@synerise/ds-status`)

> A pill-shaped status badge component that wraps `@synerise/ds-tag` with a `STATUS_NEUTRAL` shape, supporting predefined semantic types and a `custom` type with arbitrary colour.

## Package structure

```
src/
  Status.tsx          — main component; forwardRef wrapper around Tag
  Status.types.ts     — StatusProps, StatusType
  Status.styles.ts    — StatusTag styled Tag with type-to-colour mapping
  index.ts            — public exports
  __specs__/
    Status.spec.tsx   — Jest tests
```

## Public exports

### `Status` (default export)

`forwardRef<HTMLDivElement, StatusProps>` — ref targets the root `<div>`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `StatusType` | `'primary'` | Semantic type; controls border/text colour |
| `label` | `string` | — | **Required.** Text inside the badge |
| `color` | `string` | — | Custom colour (only effective when `type='custom'`) |
| `dashed` | `boolean` | — | Renders a dashed border instead of solid |
| `onClick` | `() => void` | — | Click handler |

`StatusProps` extends `WithHTMLAttributes<HTMLDivElement, ...>` — all standard HTML div attributes are forwarded to the root element.

### `StatusType`

```ts
type StatusType =
  | 'primary'    // blue-600
  | 'success'    // green-700
  | 'warning'    // yellow-700
  | 'danger'     // red-600
  | 'info'       // blue-600 (same as primary)
  | 'disabled'   // grey-500
  | 'default'    // grey-500
  | 'custom';    // uses color prop
```

### `StatusProps`

Full props type, re-exported as a named type.

## Usage patterns

```tsx
import Status from '@synerise/ds-status';

<Status type="success" label="Active" />
<Status type="danger" label="Failed" onClick={handleClick} />
<Status type="custom" color="#FF5733" label="Custom" dashed />
```

## Styling

`StatusTag` in `Status.styles.ts` extends `@synerise/ds-tag`. The `typeColor` helper maps `type` to a `theme.palette` token. For `type='custom'`, `typeColor` returns `null` and no colour style is applied — the `color` prop is passed directly to `Tag`. Root element always receives `ds-status` class plus any passed `className`.

## Key dependencies

- `@synerise/ds-tag` — base `Tag` component rendered with `shape={TagShape.STATUS_NEUTRAL}` and `asPill`
- `@synerise/ds-utils` — `WithHTMLAttributes` type helper

## Implementation notes

- **`info` and `primary` both map to `blue-600`** — they are functionally identical in the current colour mapping.
- **`disabled` and `default` both map to `grey-500`** — functionally identical.
- **`custom` type**: pass `color` prop for the badge colour; without it the badge renders unstyled (no colour CSS applied).
- **Uses Jest** (`jest.config.js`) — not yet migrated to Vitest.
