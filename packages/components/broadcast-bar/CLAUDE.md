# BroadcastBar (`@synerise/ds-broadcast-bar`)

> A full-width notification banner with a coloured background, a type-based icon, an optional description, an optional action button, and an optional close button.

## Package structure

```
src/
  BroadcastBar.tsx        — main component
  BroadcastBar.types.ts   — BroadcastBarProps, BroadcastBarType
  BroadcastBar.styles.tsx — styled-components
  constants.tsx           — ICONS map and DEFAULT_ICON
  index.ts                — public exports
```

## Public exports

### `BroadcastBar` (default)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `BroadcastBarType` | — | **Required.** Controls background colour and default icon. |
| `description` | `ReactNode` | `undefined` | Main message text. Capped at `max-width: 800px`. |
| `button` | `ReactNode` | `undefined` | Action button rendered to the right of the description. Rendered inside a semi-transparent white (`rgba(255,255,255,0.2)`) pill. |
| `withClose` | `boolean` | `undefined` | Shows a close (`×`) icon on the far right. Also shifts content layout to be absolutely centred. |
| `onCloseClick` | `() => void` | `undefined` | Callback fired when the close icon is clicked. Only relevant when `withClose` is `true`. |
| `customIcon` | `ReactNode` | `undefined` | Replaces the default type-based icon. |

### Types

| Export | Description |
|--------|-------------|
| `BroadcastBarProps` | Full props interface |
| `BroadcastBarType` | `'success' \| 'warning' \| 'negative'` |

## Usage patterns

```tsx
import BroadcastBar from '@synerise/ds-broadcast-bar';

// Minimal
<BroadcastBar type="warning" description="Scheduled maintenance tonight." />

// With action button and close
<BroadcastBar
  type="negative"
  description="Your session has expired."
  button={<Button type="ghost">Log in again</Button>}
  withClose
  onCloseClick={handleDismiss}
/>

// Custom icon
<BroadcastBar type="success" description="Changes saved." customIcon={<MyIcon />} />
```

## Styling

Styles live in `BroadcastBar.styles.tsx`. Uses `@synerise/ds-core` theme palette tokens exclusively.

Background colours per type:
- `success` → `green-600`
- `warning` → `yellow-600`
- `negative` → `red-600`

Icon / text colour per type:
- `warning` → `grey-800`
- `success` / `negative` → `white`

When `withClose` is `true`, the main content block (`AllContent`) switches to `position: absolute; left: 50%; transform: translateX(-50%)` to keep it visually centred while the close button sits at the far right.

## Key dependencies

- `@synerise/ds-icon` — wraps all icons (`Check3M` for success, `WarningFillM` for warning, `ErrorFillM` for negative, `CloseM` for close)
- `animate.css` — included as a dependency (not directly used in the component source; likely used via global CSS or a consumer)

## Implementation notes

- **`type` is required but has no TypeScript default** — passing no `type` will cause a TS error.
- **Default icon fallback** — if `type` is not in the `ICONS` map (which shouldn't happen with strict typing), `DEFAULT_ICON` (`<WarningFillM />`) is used.
- **`withClose` affects layout, not just visibility** — enabling it restructures the bar from a centred flex layout to a relative/absolute layout. Disabling it after first render restores centering.
- **`button` receives no built-in styling** — the `ButtonWrapper` only provides a semi-transparent pill background. Pass a styled `ds-button` or plain element; size and colour are the caller's responsibility.
