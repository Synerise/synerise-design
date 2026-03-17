# InlineAlert (`@synerise/ds-inline-alert`)

> A compact inline status indicator — an icon (colour-coded by type) followed by an optional message, emphasis text, or link.

## Package structure

```
src/
  InlineAlert.tsx           — main component
  InlineAlert.types.ts      — InlineAlertProps, InlineAlertType
  InlineAlert.styles.tsx    — styled wrapper + message/emphasis/link subcomponents
  InlineAlert.const.tsx     — ICONS map (type → icon element)
  index.ts                  — public exports (default + all types)
  __specs__/
    InlineAlert.spec.tsx    — Jest tests (message render, withLink render)
```

## Public exports

`index.ts` does `export * from './InlineAlert.types'` — all types are public.

### `InlineAlert` (default export)

`InlineAlertProps = WithHTMLAttributes<HTMLDivElement, { … }>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `InlineAlertType` | `'warning'` | Visual style variant; drives icon and colour |
| `message` | `ReactNode` | — | Main message text; nothing renders if absent |
| `withLink` | `ReactNode` | — | Appended to the message with underline + pointer cursor |
| `withEmphasis` | `ReactNode` | — | Appended to the message in bold; **ignored when `withLink` is also set** |
| `hoverButton` | `boolean` | — | Adds `cursor: pointer` and darker hover colour |
| `disabled` | `boolean` | — | Sets `pointer-events: none; opacity: 0.4` |
| `customIcon` | `ReactNode` | — | Replaces the default type icon entirely |
| `iconAlert` | `boolean` | — | **`@deprecated`** — no effect in current implementation |
| `className` | `string` | — | Appended after `ds-inline-alert` |

No `forwardRef`.

### `InlineAlertType`

`'success' | 'alert' | 'warning' | 'info'`

### `InlineAlertProps`

Full props type re-export.

## Usage patterns

```tsx
import InlineAlert from '@synerise/ds-inline-alert';

// Basic
<InlineAlert type="success" message="Changes saved." />

// With a link appended
<InlineAlert type="warning" message="Session expiring." withLink={<a href="#">Renew</a>} />

// With bold emphasis (ignored if withLink is also set)
<InlineAlert type="alert" message="Failed." withEmphasis="Please retry." />

// Custom icon
<InlineAlert type="info" message="Note" customIcon={<MyIcon />} />

// Disabled
<InlineAlert type="info" message="Loading..." disabled />
```

## Styling

All styles in `InlineAlert.styles.tsx`. Key colour mapping (from `theme.palette`):

| Type | Normal | Hover (`hoverButton`) |
|------|--------|-----------------------|
| `success` | `green-600` | `green-700` |
| `warning` | `yellow-600` | `yellow-700` |
| `alert` | `red-600` | `red-700` |
| `info` | `grey-600` | `grey-700` |

The **icon** inherits the type colour; the **message text** is always `grey-600` regardless of type.

`withLink` content is underlined and inherits the icon colour. `withEmphasis` content is `font-weight: 500` and also inherits the icon colour.

The root element is a `<span>` (`display: flex`), not a `<div>`, so it can be used inline.

## Key dependencies

- `@synerise/ds-icon` — renders the type icon (`Check3M`, `WarningFillM`, `InfoFillM`)
- `@synerise/ds-utils` — `WithHTMLAttributes` utility type

## Implementation notes

- **`withLink` takes priority over `withEmphasis`** — they are rendered in a mutually exclusive `if/else` branch; passing both will silently suppress `withEmphasis`.
- **`alert` and `warning` use the same icon** (`WarningFillM`) — only the colour differs.
- **`iconAlert` is deprecated** and does nothing in the current code; the prop is accepted (no TS error) but never read in the render path.
- **Test runner is Jest** (not Vitest).
