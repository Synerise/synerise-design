# Navbar (`@synerise/ds-navbar`)

> A top-level application navbar displaying a logo, description, optional alert notification, additional nodes (buttons/dropdowns), and action area.

## Package structure

```
src/
  Navbar.tsx          — main component + Navbar.Divider static property
  Navbar.types.ts     — NavbarProps
  Navbar.styles.ts    — all styled components
  index.ts            — default export only
  __specs__/
    Navbar.spec.tsx   — Jest tests (logo/children/description/actions/alertNotification render)
```

## Public exports

### `Navbar` (default export)

`NavbarProps` is **not** re-exported from `index.ts`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `ReactNode` | — (required) | Module name / page title shown left of centre |
| `logo` | `ReactNode` | — (required) | `string` → renders `<img src>`, otherwise renders the node directly |
| `className` | `string` | — | Appended to `ds-navbar` on the root element |
| `color` | `string` | `theme.palette['blue-600']` | Background colour of the bar |
| `actions` | `ReactNode` | — | Action area on the right (typically an avatar button) |
| `additionalNodes` | `ReactNode[]` | — | Extra sections inserted before the actions area; each is separated by a `NavbarDivider` |
| `alertNotification` | `ReactNode` | — | Alert + button slot; rendered between description and additional nodes, wrapped in a `NavbarDivider` on each side |
| `children` | `ReactNode` | — | Rendered inside `NavbarActions` after the `actions` wrapper |

### `Navbar.Divider`

Static styled component `S.NavbarDivider` — a 1 px × 24 px white bar at 30 % opacity with `margin: 0 12px`. Can be used standalone inside custom `actions`/`children` content.

## Usage patterns

```tsx
import Navbar from '@synerise/ds-navbar';

<Navbar
  description="Module name"
  logo="https://example.com/logo.png"
  color="#1d4ed8"
  alertNotification={<>...</>}
  additionalNodes={[<ButtonGroup />, <HelpButton />]}
  actions={<UserAvatar />}
/>
```

## Styling

Styles live in `Navbar.styles.ts`. The navbar is a `56px` tall flex row with `padding: 16px 24px`. Background defaults to `theme.palette['blue-600']` when no `color` prop is provided. Text colour is always `#fff` (hardcoded, not a token).

`NavbarAlertNotification` forces `InlineAlert` SVGs and text spans white via class-based CSS (`.ds-inline-alert svg` and `.ds-inline-alert > span`).

## Key dependencies

- `@synerise/ds-typography` — `macro.h300` for the description text style

## Implementation notes

- **`NavbarProps` is not exported from `index.ts`** — consumers must use `React.ComponentProps<typeof Navbar>` or a local type alias.
- **`logo` string check** — if `typeof logo === 'string'`, renders `<img src={logo} alt="" />`; otherwise renders the node as-is.
- **`additionalNodes` key warning** — each node is wrapped in `<>…</>` without a `key`, causing React key warnings when `additionalNodes` has more than one element.
- **Test runner is Jest** (not Vitest).
